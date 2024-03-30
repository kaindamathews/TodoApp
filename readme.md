# TodoApp Setup Guide

This guide will help you set up the TodoApp project on your local machine step by step.

### Prerequisites
Before getting started, make sure you have the following software installed:

- [Java JDK](https://www.oracle.com/java/technologies/downloads/)
- [IntelliJ IDEA Code Editor](https://www.jetbrains.com/idea/download/?section=windows)
- [Node.js](https://nodejs.org/en/download)
- [Docker Desktop](https://docs.docker.com/desktop/install/windows-install/)
- [PostgreSQL](https://www.postgresql.org/download/)
- [VS Code](https://code.visualstudio.com/download)
- [Git](https://git-scm.com/download/win)

### Installation

1. **Clone the source code**: Open a terminal and run the following command:
    ```bash
    git clone https://github.com/kaindamathews/TodoApp.git
    ```

2. **Frontend Setup**:
   - Navigate to the `frontend` folder in the cloned repository.
   - Open the folder with VS Code.
   - Open the terminal and run:
     ```bash
     npm install
     npm run dev
     ```
   
3. **Backend Setup**:
   - Open the `backendTodoAppApi` folder in IntelliJ IDEA.
   - Wait for the dependencies to be installed.
   - Change the database password and username in the `application.properties` file:
     ```properties
     spring.datasource.url=jdbc:postgresql://localhost:5432/todo_app_db
     spring.datasource.username=postgres
     spring.datasource.password=your_postgres_password
     ```
   - Update the `docker-compose.yml` file:
     ```yaml
     services:
       postgres:
         image: 'postgres:latest'
         environment:
           - 'POSTGRES_DB=todo_app_db'
           - 'POSTGRES_PASSWORD=your_postgres_password'
           - 'POSTGRES_USER=postgres'
         ports:
           - '5432'
     ```

4. **Run the Application**: Start the backend application from IntelliJ IDEA.

5. **Accessing the Application**:
   - Open your browser and go to [http://localhost:5173/](http://localhost:5173/) to sign up and log in to the TodoApp.

That's it! You've successfully set up and configured the TodoApp project on your local machine. Happy task managing!