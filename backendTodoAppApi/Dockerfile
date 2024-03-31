
FROM openjdk:20

# Set the working directory in the container
WORKDIR /app

# Copy the packaged jar file into the container
COPY target/backend-0.0.1-SNAPSHOT.jar  /app/todobackend-api.jar

# run Spring Boot application
CMD ["java", "-jar", "todobackend-api.jar"]
