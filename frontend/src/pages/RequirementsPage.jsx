import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

function RequirementsPage() {
  const navigate = useNavigate();

  const [requirements, setRequirements] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "open",
  });

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [formError, setFormError] = useState("");

  function handleLogout() {
    localStorage.removeItem("user");
    navigate("/login");
  }

  async function fetchRequirements() {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/requirements");
      setRequirements(response.data.requirements || []);
    } catch (err) {
      setError("Failed to load requirements.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchRequirements();
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function validateForm() {
    if (!formData.title.trim()) {
      return "Title is required";
    }

    if (!formData.description.trim()) {
      return "Description is required";
    }

    if (!["open", "processed", "obsolete"].includes(formData.status)) {
      return "Invalid status value";
    }

    return "";
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setFormError("");

    const validationError = validateForm();
    if (validationError) {
      setFormError(validationError);
      return;
    }

    try {
      setSubmitting(true);

      await api.post("/requirements", formData);

      setFormData({
        title: "",
        description: "",
        status: "open",
      });

      fetchRequirements();
    } catch (err) {
      if (err.response?.data?.detail) {
        if (Array.isArray(err.response.data.detail)) {
          setFormError(err.response.data.detail[0].msg);
        } else {
          setFormError(err.response.data.detail);
        }
      } else {
        setFormError("Failed to create requirement.");
      }
    } finally {
      setSubmitting(false);
    }
  }

  function getStatusClass(status) {
    if (status === "open") return "badge open";
    if (status === "processed") return "badge processed";
    if (status === "obsolete") return "badge obsolete";
    return "badge";
  }

  return (
    <div className="requirements-page">
      <h1>Requirements</h1>

      <div style={{ textAlign: "right", marginBottom: "20px" }}>
        <button onClick={handleLogout}>Logout</button>
      </div>

      <div className="requirements-layout">
        <div className="requirements-section">
          <h2>All Requirements</h2>

          {loading ? (
            <p>Loading requirements...</p>
          ) : error ? (
            <p className="message error">{error}</p>
          ) : requirements.length === 0 ? (
            <p>No requirements found.</p>
          ) : (
            <table className="requirements-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th>Created At</th>
                </tr>
              </thead>
              <tbody>
                {requirements.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.title}</td>
                    <td>{item.description}</td>
                    <td>
                      <span className={getStatusClass(item.status)}>
                        {item.status}
                      </span>
                    </td>
                    <td>{new Date(item.created_at).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="requirements-section">
          <h2>Add Requirement</h2>

          <form onSubmit={handleSubmit} className="form">
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleChange}
              required
            />

            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              rows="5"
              required
            />

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="open">Open</option>
              <option value="processed">Processed</option>
              <option value="obsolete">Obsolete</option>
            </select>

            <button type="submit" disabled={submitting}>
              {submitting ? "Adding..." : "Add Requirement"}
            </button>
          </form>

          {formError && <p className="message error">{formError}</p>}
        </div>
      </div>
    </div>
  );
}

export default RequirementsPage;