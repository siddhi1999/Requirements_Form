Requirements Form
A simple full-stack web application with user authentication and requirements management.
This project includes:
•	A FastAPI backend
•	A React + Vite frontend
•	A PostgreSQL database with two separate schemas:
o	auth for user data
o	app for requirements data
The application flow is: 
1.	A user signs up
2.	The user logs in
3.	After login, the user can view and add requirements
Project structure
repo/
├── backend/
├── frontend/
├── schema.sql
└── README.md

Before starting
You do not need to reinstall everything if some tools are already on your computer.
Check first whether you already have these installed:
•	PostgreSQL
•	Python 3
•	Node.js and npm
•	Git (optional for running locally, but useful)
Useful commands to check:
Check Python in Command Prompt (cmd)
python --version

Check Node.js in cmd
node -v
npm -v

Check PostgreSQL
If PostgreSQL is installed, you may already have in your system:
•	pgAdmin 4
•	SQL Shell (psql)
Required software
If something is missing, install only that item.
1. Install PostgreSQL
Download from the official PostgreSQL website:
https://www.postgresql.org/download/ 
During installation:
•	Keep the default port as 5432 unless you already use another one.
•	Remember the password you create for the postgres user.
•	Install pgAdmin 4 
2. Install Python
Download Python 3 from:
https://www.python.org/downloads/
Important during installation:
•	Enable Add Python to PATH if the installer shows that option.
3. Install Node.js
Download Node.js from:
https://nodejs.org/
Node.js includes npm, which is needed for the frontend.
Step 1: Create the database
Open pgAdmin 4 in your system.
Then:
1.	Expand Servers 
2.	Connect to your local PostgreSQL server
3.	Right-click Databases
4.	Choose Create → Database 
5.	Set the database name to:
requirements_form_db

6.	Click Save
Step 2: Run the SQL schema
After creating the database:
1.	Click the database requirements_form_db
2.	Right-click it
3.	Open Query Tool 
4.	Open the file schema.sql from this project
5.	Copy all SQL from schema.sql
6.	Paste it into the Query Tool
7.	Run the script
If everything works, you should see these schemas in pgAdmin:
•	auth
•	app
•	public
And these tables:
•	auth.users
•	app.requirements

Note: If the schema does not reflect in the database, then try refreshing the servers. If the issue still persists in do:
File → Preferences, then go to Miscellaneous → User Interface, and change Layout from Workspace to Classic.
Step 3: Set up the backend
Open a terminal in the project folder.
Go into the backend folder:
cd backend

Create a virtual environment
On terminal
python -m venv .venv
.\.venv\Scripts\Activate.ps1

If PowerShell blocks activation, run:
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process

Then activate again:
.\.venv\Scripts\Activate.ps1

Python's built-in venv module is the standard way to create isolated environments for project dependencies. 
Install backend dependencies
pip install -r requirements.txt

If requirements.txt is missing or outdated, install manually:
pip install fastapi uvicorn psycopg[binary] bcrypt python-dotenv email-validator

Create the backend environment file
Inside the backend folder, create a file named .env if it does not already exist.
Put this inside it:
DB_NAME=requirements_form_db
DB_USER=postgres
DB_PASSWORD=YOUR_POSTGRES_PASSWORD
DB_HOST=localhost
DB_PORT=5432

Replace YOUR_POSTGRES_PASSWORD with the password you chose while installing PostgreSQL.
Start the backend server
uvicorn app.main:app --reload

If the backend starts correctly, open:
•	http://127.0.0.1:8000
•	http://127.0.0.1:8000/docs
FastAPI automatically provides interactive API documentation at /docs. 
Step 4: Set up the frontend
Open a new terminal.
Go into the frontend folder:
cd frontend

Install frontend dependencies
npm install

If needed, install required packages manually:
npm install react-router-dom axios

Vite is used as the frontend development tool, and React Router handles page navigation. 
Start the frontend server
npm run dev

Vite usually starts the app on a local development URL such as:
•	http://localhost:5173 
Or run the link that is provided in the terminal.
Step 5: Use the application
Once both servers are running:
1.	Open the frontend URL in the browser
2.	Create a new account using the Sign Up page
3.	Log in using the Login page
4.	After login, you will be redirected to the Requirements page
5.	View existing requirements in the table
6.	Add a new requirement using the form
Common problems and fixes
Problem: python is not recognized
Python may not be added to PATH.
Fix:
•	Reinstall Python and enable Add Python to PATH, or
•	Use the full Python installation path
Problem: npm is not recognized
Node.js may not be installed correctly.
Fix:
•	Reinstall Node.js from the official website
•	Restart the terminal after installation
Problem: PostgreSQL connection fails
Possible causes:
•	PostgreSQL service is not running
•	Wrong password in .env
•	Wrong database name
•	Wrong port
Check that:
•	PostgreSQL is running
•	requirements_form_db exists
•	.env values are correct
Problem: CORS error in browser
If the frontend cannot call the backend from the browser, make sure CORS is enabled in the FastAPI backend for:
•	http://localhost:5173
•	http://127.0.0.1:5173
FastAPI supports CORS middleware for local frontend-backend communication across different origins. 
Problem: POST /auth/signup returns 422
This usually means the submitted data does not pass backend validation.
Example:
•	password shorter than 6 characters
•	invalid email format
•	missing required fields
FastAPI returns validation errors automatically when request data does not match the expected schema. [web:263][web:272]
For users who already have tools installed
If you already have PostgreSQL, Python, or Node.js installed, you usually only need to:
•	create the database
•	run schema.sql
•	install project dependencies
•	create .env
•	run backend and frontend
There is no need to reinstall software that is already working.
Final checklist
Before using the app, make sure:
•	PostgreSQL is installed and running
•	The database requirements_form_db exists
•	schema.sql has been executed
•	The backend .env file is configured correctly
•	The backend server is running
•	The frontend server is running
Tech stack
•	Backend: FastAPI 
•	Frontend: React + Vite 
•	Database: PostgreSQL 
•	Routing: react-router-dom 
•	Password hashing: bcrypt 
Notes
This project was built as a full-stack exercise with:
•	user signup
•	user login
•	protected frontend routing
•	requirements listing
•	requirements creation
•	PostgreSQL schema separation between authentication and application data
