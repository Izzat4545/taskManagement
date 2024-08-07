# Task Management Application

## Overview

This project consists of two main parts: the Backend and the Frontend. 

### Backend

The backend is responsible for managing tasks and providing the necessary API endpoints. It uses MongoDB for data storage. 

#### Setup

1. **Install Dependencies**: 
    ```bash
    npm install
    ```

2. **Configure Environment Variables**: 
    - Create a `.env` file in the root directory of the backend project.
    - Add your MongoDB connection URL to the `.env` file:
      ```env
      MONGO_URI=mongodb://localhost:27017/taskmanager
      ```

3. **Run the Backend**: 
    ```bash
    npm start
    ```

    This will start the backend server on port 5000 (or any port specified in your `.env` file).

### Frontend

The frontend provides the user interface for interacting with tasks, including task management and drag-and-drop functionality.

#### Setup

1. **Install Dependencies**: 
    ```bash
    npm install
    ```

2. **Run the Frontend**: 
    ```bash
    npm run dev
    ```

    This will start the frontend development server.

## Implemented Features

- **CRUD Operations**: Create, Read, Update, and Delete tasks.
- **Filtering**: Filter tasks by name and status.
- **Drag and Drop**: Reorder tasks using drag and drop.

## Running the Application

1. **Ensure MongoDB is Running**: Make sure your MongoDB server is running and accessible.

2. **Start the Backend**: Run the backend server as described above.

3. **Start the Frontend**: Run the frontend development server as described above.

Now, you can access the application in your browser and start managing your tasks!

## Troubleshooting

- If you encounter issues with MongoDB connection, verify your connection URL and MongoDB server status.
- For frontend issues, ensure that both the backend and frontend servers are running properly and accessible.

Feel free to contribute or reach out with any questions!

