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



## API Endpoints

* [Auth](#auth)
    1. [Login](#1-login)
    1. [Signup](#2-signup)
    1. [Verify Token](#3-verify-token)
* [Host](#host)
    1. [Check Host Token](#1-check-host-token)
    1. [Create Hackathon](#2-create-hackathon)
    1. [View Hackathon](#3-view-hackathon)
    1. [View  All Hackathon](#4-view--all-hackathon)
    1. [View All My Hackathon](#5-view-all-my-hackathon)
    1. [Edit Hackathon](#6-edit-hackathon)
    1. [Edit Hackathon (All fields)](#7-edit-hackathon-all-fields)
    1. [Delete Hackathon](#8-delete-hackathon)
    1. [View All submission made](#9-view-all-submission-made)
* [Participant](#participant)
    1. [View  All Hackathon](#1-view--all-hackathon)
    1. [View Hackathon](#2-view-hackathon)
    1. [Check Token](#3-check-token)
    1. [Enroll Hackathon](#4-enroll-hackathon)
    1. [Edit Submission](#5-edit-submission)
    1. [View Enrolled Hackathons](#6-view-enrolled-hackathons)

--------



## Auth



### 1. Login



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: http://127.0.0.1:8000/api/auth/login/
```



***Body:***

```js        
{
    "email":"naveenp2@mail.com",
    "password":"idontknow"
}
```



### 2. Signup



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: http://127.0.0.1:8000/api/auth/register/
```



***Body:***

```js        
{
    "name":"Naveen",
    "email":"naveenh2@mail.com",
    "password":"idontknow",
    "user_type":"HOST"
}
```



### 3. Verify Token



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: http://127.0.0.1:8000/api/auth/token/verify/
```



***Body:***

```js        
{
    "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjgwNTQwMDcwLCJpYXQiOjE2ODA1MzY0NzAsImp0aSI6ImEwN2E0MGM5OGNkNDQ2OTc4NTYwN2QwNTRlMjJlOTExIiwidXNlcl9pZCI6IjRjMWNiZmMwLWNmMjEtNDM3MC05NGY4LTg1ZjhiNmNkZDAzMiJ9.LpN92XDaKo4TPlZfxTGUiXLWATfTbdRZUaWHPzwsi5U"
}
```



## Host



### 1. Check Host Token



***Endpoint:***

```bash
Method: GET
Type: 
URL: http://127.0.0.1:8000/api/hackathon/host/
```



### 2. Create Hackathon



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: http://127.0.0.1:8000/api/hackathon/create/
```



***Body:***

```js        
{
    "title": "extra",
    "description": "Lorem ipsum dolor sit amet consectetur. Lacus sit aliquam vivamus sodales a integer justo elit.Mattis urna non parturient est non faucibus pretium morbi. Mattis condimentum arcu sapien nuncsemper in Iaoreet amet cursus. At purus consectetur orci morbi at. Gravida consectetur nunc in quisvitae egestas. Fermentum pellentesque ullamcorper nisl massa penatibus condimentum nonimperdiet. Porttitor a hendrerit pellentesque enim mus congue. Vitae interdum fusce duis ac posuerin aliquam risus aenean. Mi aliquet viverra ipsum lacus condimentum tincidunt. In bibendumimperdiet nullam eget tincidunt. Ut lorem id enim interdum lobortis aliquam risus elementum aliquet.Placerat fusce proin diam sollicitudin netus tincidunt sit ultricies. Varius convallis ultrices fermentumin commodo ut posuere. Lacus luctus lacus consequat dolor.",
    "start_date": "2023-02-14",
    "end_date": "2023-02-20",
    "reward_prize": 100,
    "submission_type": "IMAGE"
}
```



### 3. View Hackathon



***Endpoint:***

```bash
Method: GET
Type: 
URL: http://127.0.0.1:8000/api/hackathon/view
```



***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| title | InterviewMe |  |



### 4. View  All Hackathon



***Endpoint:***

```bash
Method: GET
Type: 
URL: http://127.0.0.1:8000/api/hackathon/view/
```



### 5. View All My Hackathon



***Endpoint:***

```bash
Method: GET
Type: 
URL: http://127.0.0.1:8000/api/hackathon/view/
```



***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| me | true |  |



### 6. Edit Hackathon



***Endpoint:***

```bash
Method: PATCH
Type: RAW
URL: http://127.0.0.1:8000/api/hackathon/edit/InterviewMe/
```



***Body:***

```js        
{
    "title":"Potter Ipsum"
}
```



### 7. Edit Hackathon (All fields)



***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: http://127.0.0.1:8000/api/hackathon/edit/InterviewMe/
```



***Body:***

```js        
{
    
    "submission_type": "FILE"
}
```



### 8. Delete Hackathon



***Endpoint:***

```bash
Method: DELETE
Type: RAW
URL: http://127.0.0.1:8000/api/hackathon/delete/extra/
```



***Body:***

```js        
{
    "title":"Potter Ipsum"
}
```



### 9. View All submission made



***Endpoint:***

```bash
Method: GET
Type: 
URL: http://127.0.0.1:8000/api/hackathon/submissions/InterviewMe
```



## Participant



### 1. View  All Hackathon



***Endpoint:***

```bash
Method: GET
Type: 
URL: http://127.0.0.1:8000/api/hackathon/view
```



### 2. View Hackathon



***Endpoint:***

```bash
Method: GET
Type: 
URL: http://127.0.0.1:8000/api/hackathon/view
```



***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| title | InterviewMe |  |



### 3. Check Token



***Endpoint:***

```bash
Method: GET
Type: 
URL: http://127.0.0.1:8000/api/hackathon/participant/
```



### 4. Enroll Hackathon



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: http://127.0.0.1:8000/api/hackathon/enroll/
```



***Body:***

```js        
{
    "hackathon":"InterviewMe"
}
```



### 5. Edit Submission



***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: http://127.0.0.1:8000/api/hackathon/submit/InterviewMe/
```



***Body:***

```js        
{

}
```



### 6. View Enrolled Hackathons



***Endpoint:***

```bash
Method: GET
Type: 
URL: http://127.0.0.1:8000/api/hackathon/view
```



***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| me | true |  |



---
[Back to top](#hackathonx)

# Contributing
Contributions are welcome! Please open an issue or submit a pull request.
