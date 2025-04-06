# IBU Startup - Sead Mašetić & Fikret Zajmović

IBU Startup is a platform designed to help entrepreneurs connect with like-minded individuals, investors, and potential partners. The platform allows users to create and manage their startups, while investors can explore opportunities to support new ventures.

## Tech Stack

- **Frontend**: React.js
- **Backend**: Spring Boot (Java)
- **Database**: PostgreSQL

## Prerequisites

Before running the application, make sure you have the following installed:

- [Node.js](https://nodejs.org/en/download/) (for frontend)
- [Java](https://www.java.com/en/download/) (for backend)
- [Maven](https://maven.apache.org/download.cgi) (for building and managing the Spring Boot backend)
- [PostgreSQL](https://www.postgresql.org/download/) (for the database)

## Setup

### Backend (Spring Boot)

1. Clone the repository:

   ```bash
   git clone https://github.com/your-repository/ibu-startup.git
   ```

2. Navigate to the backend directory:

   ```bash
   cd ibu-startup/backend
   ```

3. Install the required dependencies:

   ```bash
   mvn install
   ```

4. Set up the PostgreSQL database:

   - Create a new database for the application (e.g., `ibu_startup_db`).
   - Update the database connection settings in the `application.properties` file located in `src/main/resources`:

     ```properties
     spring.datasource.url=jdbc:postgresql://localhost:5432/ibu_startup_db
     spring.datasource.username=your-username
     spring.datasource.password=your-password
     ```

5. Run the Spring Boot application:

   ```bash
   mvn spring-boot:run
   ```

   The backend should now be running at `http://localhost:8080`.

### Frontend (React)

1. Navigate to the frontend directory:

   ```bash
   cd ibu-startup/frontend
   ```

2. Install the necessary dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm start
   ```

   The frontend should now be running at `http://localhost:5173`.
