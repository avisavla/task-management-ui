Task Management System – Frontend

Angular frontend for the Task Management System.

This application provides the user interface for authentication and task management, communicating with the backend REST API built using .NET 8.

The UI allows users to log in, manage tasks, apply filters, and navigate through paginated task lists.

----------------------------------------------------------------------------------------------------------------------------------------------

Table of Contents

1. Project Overview
2. Tech Stack
3. Features
4. Screenshots
5. Project Structure
6. Setup Instructions
7. Authentication Flow
8. Error Handling
9. Backend Repository
10. Author

----------------------------------------------------------------------------------------------------------------------------------------------

1. Project Overview

The frontend application is built using Angular and communicates with the backend API using HTTP requests.

Users can:

* Log in using JWT authentication
* Create tasks
* Edit tasks
* Delete tasks
* View paginated tasks
* Filter tasks by status
* Search tasks using text filters

----------------------------------------------------------------------------------------------------------------------------------------------

2. Tech Stack

Frontend Framework

* Angular
* TypeScript

Angular Features Used

* Angular Forms (Reactive Forms)
* Angular Routing
* Angular HTTP Client
* Angular Guards
* Angular Interceptors

UI Components

* Angular Material (Loading Spinner)

Tools

* Git
* GitHub
* Node.js
* npm

----------------------------------------------------------------------------------------------------------------------------------------------

3. Features

Authentication

* User Login
* JWT Token storage
* Logout functionality
* Route protection using Angular Auth Guard
* HTTP Interceptor to attach Authorization header

Task Management

* Create Task
* Edit Task
* Delete Task
* View Task List

Task Controls

* Pagination
* Page size selection
* Status filtering
* Text search

Validation and Error Handling

* Reactive form validation
* Server validation error display
* API error handling
* User friendly error messages

----------------------------------------------------------------------------------------------------------------------------------------------

4. Screenshots

Screenshots are stored in the screenshots folder.

Login Page => screenshots/login.png

Task List => screenshots/taskList.png

Create Task => screenshots/createTask.png

Edit Task => screenshots/editTask.png

----------------------------------------------------------------------------------------------------------------------------------------------

5. Project Structure

src/app

core

* guards
* interceptors

features

auth

* login
* register

tasks

* task-list
* create-task
* edit-task

services

models

----------------------------------------------------------------------------------------------------------------------------------------------

6. Setup Instructions

Clone the frontend repository

git clone https://github.com/avisavla/task-management-ui.git

Navigate to project

cd task-management-ui

Install dependencies

npm install

Run Angular application

ng serve

Application runs on

http://localhost:4200

----------------------------------------------------------------------------------------------------------------------------------------------

7. Authentication Flow

1. User logs in
2. Backend validates credentials
3. API returns JWT token
4. Token stored in browser
5. Angular interceptor attaches token to requests
6. Backend validates token for protected endpoints
7. Logout clears stored token

----------------------------------------------------------------------------------------------------------------------------------------------

8. Error Handling

The frontend handles common API responses.

| Status Code | Meaning                            |
| ----------- | ---------------------------------- |
| 400         | Validation error                   |
| 401         | Unauthorized                       |
| 404         | Resource not found                 |
| 409         | Conflict (business rule violation) |
| 500         | Server error                       |

----------------------------------------------------------------------------------------------------------------------------------------------

9. Backend Repository

Backend API repository:

https://github.com/avisavla/TaskManagementSystem

----------------------------------------------------------------------------------------------------------------------------------------------

10. Author

Avi Savla

Frontend built using Angular as part of a full-stack learning project.
