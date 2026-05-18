# Requirements Form

A simple full-stack web application with user authentication and requirements management.

This project includes:

- **FastAPI** backend
- **React + Vite** frontend
- **PostgreSQL** database with two separate schemas:
  - `auth` for user data
  - `app` for requirements data

The application flow is:

1. User signs up
2. User logs in
3. After login, the user can view and add requirements

---

## Project Structure

```text
repo/
├── backend/
├── frontend/
├── schema.sql
└── README.md
```

---

## Before Starting

You do **not** need to reinstall everything if some tools are already installed on your computer.

Check first whether you already have these installed:

- **PostgreSQL**
- **Python 3**
- **Node.js and npm**

### Check Python on Command Prompt (cmd)

```bash
python --version
```

### Check Node.js and npm on cmd

```bash
node -v
npm -v
```

### Check PostgreSQL

If PostgreSQL is installed, you may already have:

- **pgAdmin 4**

---

## Required Software

If something is missing, install only that item.

### 1. Install PostgreSQL

Download from the official website:

[PostgreSQL Download](https://www.postgresql.org/download/)

During installation:

- Keep the default port as `5432` unless another service is already using it
- Remember the password you create for the `postgres` user
- Install **pgAdmin 4**

### 2. Install Python

Download Python 3 from:

[Python Download](https://www.python.org/downloads/)

Important during installation:

- Enable **Add Python to PATH**

### 3. Install Node.js

Download Node.js from:

[Node.js Download](https://nodejs.org/)

Node.js includes **npm**, which is needed for the frontend.

---

## Step 1: Create the Database

Open **pgAdmin 4**.

Then:

1. Expand **Servers**
2. Connect to your local PostgreSQL server
3. Right-click **Databases**
4. Choose **Create → Database**
5. Set the database name to:

```text
requirements_form_db
```

6. Click **Save**

---

## Step 2: Run the SQL Schema

After creating the database:

1. Click the database `requirements_form_db`
2. Right-click it
3. Open **Query Tool**
4. Open the file `schema.sql` from this project
5. Copy all SQL from `schema.sql`
6. Paste it into the Query Tool
7. Click `Execute Script`

If everything works, you should see these schemas in pgAdmin:

- `auth`
- `app`
- `public`

And these tables:

- `auth.users`
- `app.requirements`

**Note:** If the schema does not appear in pgAdmin, try refreshing the server tree.

If it still does not reflect, go to:

**File → Preferences → Miscellaneous → User Interface**

Then change **Layout** from **Workspace** to **Classic**.

---

## Step 3: Set Up the Backend

Open a terminal in the project folder and go into the backend folder:

```bash
cd backend
```

### Create a virtual environment

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
```

If PowerShell blocks activation, run:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process
```

Then activate again:

```powershell
.\.venv\Scripts\Activate.ps1
```

### Install backend dependencies

```bash
pip install -r requirements.txt
```

If `requirements.txt` is missing or outdated, install manually:

```bash
pip install fastapi uvicorn psycopg[binary] bcrypt python-dotenv email-validator
```

### Create the backend environment file

Inside the `backend` folder, create a file named `.env`.

Add:

```env
DB_NAME=requirements_form_db
DB_USER=postgres
DB_PASSWORD=YOUR_POSTGRES_PASSWORD
DB_HOST=localhost
DB_PORT=5432
```

Replace `YOUR_POSTGRES_PASSWORD` with your actual PostgreSQL password.

### Start the backend server

```bash
uvicorn app.main:app --reload
```

If the backend starts correctly, open:

- [http://127.0.0.1:8000](http://127.0.0.1:8000)
- [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

FastAPI automatically provides interactive API documentation at `/docs`.

---

## Step 4: Set Up the Frontend

Open a new terminal and go into the frontend folder:

```bash
cd frontend
```

### Install frontend dependencies

```bash
npm install
npm install react-router-dom axios
```

### Start the frontend server

```bash
npm run dev
```

Vite usually starts the app on:

- [http://localhost:5173](http://localhost:5173)

Or use the link shown in the terminal.

---

## Step 5: Use the Application

Once both servers are running:

1. Open the frontend URL in the browser
2. Create a new account using the **Sign Up** page
3. Log in using the **Login** page
4. After login, you will be redirected to the **Requirements** page
5. View existing requirements in the table
6. Add a new requirement using the form

---

## Features

- User signup
- User login
- Protected frontend routing
- Requirements listing
- Requirements creation
- PostgreSQL schema separation between authentication and application data

---

## Tech Stack

- **Backend:** FastAPI
- **Frontend:** React + Vite
- **Database:** PostgreSQL
- **Routing:** react-router-dom
- **Password hashing:** bcrypt

---

## Common Problems and Fixes

### `python` is not recognized

Python may not be added to PATH.

**Fix:**

- Reinstall Python and enable **Add Python to PATH**
- Or use the full Python installation path

### `npm` is not recognized

Node.js may not be installed correctly.

**Fix:**

- Reinstall Node.js from the official website
- Restart the terminal after installation

### PostgreSQL connection fails

Possible causes:

- PostgreSQL service is not running
- Wrong password in `.env`
- Wrong database name
- Wrong port

Check that:

- PostgreSQL is running
- `requirements_form_db` exists
- `.env` values are correct

### CORS error in browser

If the frontend cannot call the backend from the browser, make sure CORS is enabled in the FastAPI backend for:

- `http://localhost:5173`
- `http://127.0.0.1:5173`

### `POST /auth/signup` returns 422

This usually means the submitted data does not pass backend validation.

Examples:

- Password shorter than 6 characters
- Invalid email format
- Missing required fields

### VS Code shows unresolved import errors

If VS Code shows errors such as `Import "dotenv" could not be resolved` or `Import "psycopg" could not be resolved`, VS Code is probably using the wrong Python interpreter.

**Fix:**
1. Open VS Code.
2. Press `Ctrl + Shift + P`.
3. Select **Python: Select Interpreter**.
4. Choose the interpreter from your backend virtual environment, usually:

```text
backend\.venv\Scripts\python.exe
```

This is usually an interpreter selection issue, not a code issue.

---

## Final Checklist

- [x] PostgreSQL installed and running
- [x] Database `requirements_form_db` created
- [x] `schema.sql` executed
- [x] Backend `.env` configured
- [x] Backend server running
- [x] Frontend server running
