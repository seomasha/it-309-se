# Build stage
FROM eclipse-temurin:21-jdk-jammy AS builder
# Set the working directory
WORKDIR /app
# Copy Maven Wrapper directory and files
COPY .mvn/ .mvn/
COPY mvnw ./
COPY pom.xml ./
# Ensure the Maven wrapper has correct permissions and line endings
RUN apt-get update && apt-get install -y dos2unix && \
  dos2unix mvnw && chmod +x mvnw
# Verify that the Maven wrapper files were copied correctly
RUN ls -l .mvn/wrapper/
# Download Maven dependencies in offline mode for faster builds
RUN ./mvnw dependency:go-offline -B
# Copy the source code and build the application
COPY src ./src
RUN ./mvnw clean package -DskipTests
# Runtime stage
FROM eclipse-temurin:21-jre-jammy
# Set the working directory for runtime
WORKDIR /app
# Copy the built JAR file from the builder stage
COPY --from=builder /app/target/*.jar app.jar
# Expose port 8080 for the application
EXPOSE 8080
# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
