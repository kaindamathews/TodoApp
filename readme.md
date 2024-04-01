# TodoListApp Setup Guide

This guide will help you set up the TodoListApp project on your local machine, step by step.

### Prerequisites
Before you begin, ensure that you have the following software installed:

- [Java JDK](https://www.oracle.com/java/technologies/downloads/)
- [IntelliJ IDEA Code Editor](https://www.jetbrains.com/idea/download/?section=windows)
- [Node.js](https://nodejs.org/en/download)
- [Docker Desktop](https://docs.docker.com/desktop/install/windows-install/)
- [PostgreSQL](https://www.postgresql.org/download/)
- [VS Code](https://code.visualstudio.com/download)
- [Git](https://git-scm.com/download/win)

### Installation

1. **Clone the Source Code**: Open a terminal and run the following command:
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

4. **Set up PostgreSQL Database**:

   - **Install PostgreSQL**: Download and install PostgreSQL from [here](https://www.postgresql.org/download/).
   
   - **Start PostgreSQL Server**: After installation, start the PostgreSQL server.

   - **Access PostgreSQL Shell**: Open a terminal or command prompt and access the PostgreSQL shell by running:
     ```bash
     psql -U postgres
     ```

   - **Create Database**: In the PostgreSQL shell, create a new database with your desired name:
     ```sql
     CREATE DATABASE todo_app_db;
     ```
   
   - **Grant Privileges**: Grant privileges to the default `postgres` user:
     ```sql
     GRANT ALL PRIVILEGES ON DATABASE todo_app_db TO postgres;
     ```

   - **Update Application Configuration**: Update the `application.properties` file of your Spring Boot application (`backendTodoAppApi`) with the new database name:
     ```properties
     spring.datasource.url=jdbc:postgresql://localhost:5432/todo_app_db
     spring.datasource.username=postgres
     spring.datasource.password=your_postgres_password
     ```

5. **Docker Setup**:
   - Update the `docker-compose.yml` file as follows:
     ```yaml
     services:
       postgres:
         image: 'postgres:latest'
         environment:
           - 'POSTGRES_DB=todo_app_db'
           - 'POSTGRES_PASSWORD=your_postgres_password'
           - 'POSTGRES_USER=postgres'
         ports:
           - '5432:5432'

       spring-app:
         build:
           context: .
           dockerfile: Dockerfile
         ports:
           - '8080:8080'
         depends_on:
           - postgres
     ```

   - **Dockerfile**: 
     Replace `backend-0.0.1-SNAPSHOT.jar` with the name of the Spring Boot application JAR file located in the `target` folder after build the application of backendTodoAppApi. Your Dockerfile should look like this:
     ```Dockerfile
     FROM openjdk:20

     # Set working directory in the container
     WORKDIR /app

     # Copy the packaged JAR file into the container
     COPY target/backend-0.0.1-SNAPSHOT.jar /app/todobackend-api.jar

     # Expose port
     EXPOSE 8080

     # Run Spring Boot application
     CMD ["java", "-jar", "todobackend-api.jar"]
     ```

6. **Build and Run the Application**:
   - Build the Docker image:
     ```bash
     docker build -t todobackend-api .
     ```

   - Run the Docker container:
     ```bash
     docker run -p 8080:8080 todobackend-api
     ```

   - Alternatively, you can start the backend application directly from IntelliJ IDEA.

7. **Accessing the Application**:
   Open your browser and go to [http://localhost:5173/](http://localhost:5173/) to sign up and log in to the TodoListApp.

That's it! You've successfully set up and configured the TodoListApp project on your local machine. Happy task managing!