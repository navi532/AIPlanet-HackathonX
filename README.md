# AIPlanet-HackathonX

Welcome to HackathonX, a web-based platform for hosting and participating in hackathons. The platform allows authorized users to create and post hackathons with ease. Host users can add and edit details of the hackathon, as well as view and manage the submitted entries. On the other hand, participant users can enroll in hosted hackathons, submit their code or files, and view their entries.


## Dependencies
To run this project, you'll need the following dependencies:

- Python 3.7 or higher
- Django
- Django REST Framework
- MySQL server
- Node.js and NPM

## Installation

### Backend
1. Clone this repository to your local machine.
```bash
git clone https://github.com/navi532/AIPlanet-HackathonX
```
2. Navigate to the backend directory:
```bash
cd backend/
```
3. Install the dependencies by running the following command in the backend directory:
```bash
pip3 install -r requirements.txt
```
This will install all the necessary dependencies for the Django project.
4. Set up a MySQL database and make sure to create database named 'hackathonx' and its running on port 3306
5. Create a .env file in the backend directory with the following environment variables:
```
DJANGO_SECRET_KEY="YOURSECRETKEY"
DJANGO_DEBUG_MODE="True"
DJANGO_MYSQLDB_USER='root'
DJANGO_MYSQLDB_PASSWORD='MYSQLROOTPASSWORD'
```
This will handle the configuration automatically for you.
6. Migrate the database. Run the following commands inside the backend/ directory:
```bash
python3 manage.py makemigrations
python3 manage.py migrate

```
This will create the necessary tables in the database.
7. Start the Django server by running the following command inside the backend/ directory:
```bash
python3 manage.py runserver
```
This will start the Django server at http://127.0.0.1:8000.

### Frontend
1. Navigate to the frontend directory:
```bash
cd frontend/
```
2. Install the Node.js dependencies:
```bash
npm install
```
3. Start the development server:
```bash
npm start
```
The app will be accessible at http://localhost:3000.


## Usage
- To create a new hackathon, log in as a host user and click on the "Create Hackathon" button.
- To enroll in a hackathon, log in as a participant user and navigate to the "Enroll" page.
- To view and manage the submitted entries for a hackathon, log in as a host user and navigate to the "Hackathon Entries" page.
- And More..

# Contributing
Contributions are welcome! Please open an issue or submit a pull request.
