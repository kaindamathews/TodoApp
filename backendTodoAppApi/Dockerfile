FROM openjdk:20

# Set working directory in the container
WORKDIR /app

# Copy the packaged JAR file into the container
COPY target/backend-0.0.1-SNAPSHOT.jar /app/todobackend-api.jar

# Expose port if needed
EXPOSE 8080

# Run Spring Boot application
CMD ["java", "-jar", "todobackend-api.jar"]
