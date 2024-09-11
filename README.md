# Next.js Dashboard with Django API Backend

## Overview

This project is a dashboard application built with **Next.js** on the frontend and **Django** on the backend. It features four different charts (Candlestick, Line, Bar, and Pie charts) that display data fetched from the Django API. The data is hardcoded in the backend for simplicity.

**Technologies used:**

- **Frontend**: Next.js, TailwindCSS, Chart.js, Highcharts
- **Backend**: Django, Django REST Framework (DRF)
- **Charts**:
  - **Line, Bar, Pie**: Chart.js
  - **Candlestick**: Highcharts

---

## Features

- Responsive 2x2 grid layout that adjusts to screen size.
- Candlestick chart implemented with Highcharts.
- Line, Bar, and Pie charts implemented with Chart.js.
- Responsive UI using TailwindCSS.
- Dynamic data fetching from Django API.

---

## Table of Contents

1. [Getting Started](#getting-started)
2. [Frontend Setup](#frontend-setup)
3. [Backend Setup](#backend-setup)
4. [Running the Application](#running-the-application)
5. [Future Improvements](#future-improvements)

---

## Brief Explanation of the Approach and Thought Process

The development of this project followed a structured approach, integrating a Next.js frontend with a Django backend to create an interactive dashboard. The primary goal was to display four types of charts: Line, Bar, Pie, and Candlestick, each fetching data from API endpoints on the Django backend. Initially, **Chart.js** was used to implement the Line, Bar, and Pie charts due to its simplicity and compatibility with React. However, after encountering issues with implementing a Candlestick chart using Chart.js and Recharts, I decided to use **Highcharts** for the Candlestick chart because of its robust support for financial data visualization.

TailwindCSS was chosen for styling because it allowed rapid UI development with minimal custom CSS, ensuring a responsive layout for the dashboard. Key challenges such as fitting all four charts symmetrically on a single screen without scrolling and maintaining responsiveness across different screen sizes were addressed using Tailwind's utility-first classes. The project also focused on code modularity and maintainability, using React hooks to fetch data and update the charts dynamically. In the end, the combination of **Chart.js** and **Highcharts** provided a versatile solution for creating a visually appealing and highly interactive dashboard.

## Getting Started

### Prerequisites

Ensure you have the following installed on your machine:

- **Node.js**: Version 14.x or above
- **npm** or **yarn**
- **Python**: Version 3.6 or above
- **Django**: Latest version (3.x or above recommended)
- **pip**: Latest version

### Cloning the Repository

1. Clone the project from GitHub:

   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   ```

2. Navigate to the root directory:

   ```bash
   cd your-repo-name
   ```

---

## Frontend Setup

### Prerequisites

Ensure you have the following installed on your system:

- **Node.js** (version 14.x or above)
- **npm** (Node package manager)

### Steps to Set Up the Frontend

1. **Navigate to the frontend directory:**

   ```bash
   cd frontend
   ```

2. **Install the frontend dependencies:**

   Run the following command to install all required Node.js packages:

   ```bash
   npm install
   ```

   The following key packages are required for the frontend:

   - **Next.js**: Provides the React framework for building the frontend
   - **Chart.js**: Used for rendering Line, Bar, and Pie charts
   - **Highcharts**: Used for rendering the Candlestick chart
   - **TailwindCSS**: Used for styling the application
   - **Axios**: Used for making API calls to the Django backend

3. **Install specific frontend libraries manually (if not in `package.json`):**

   If your `package.json` does not include some of these, you can install them manually:

   ```bash
   # Install Next.js if needed
   npm install next react react-dom

   # Install Chart.js and React bindings for Chart.js
   npm install chart.js react-chartjs-2

   # Install Highcharts and React bindings for Highcharts
   npm install highcharts highcharts-react-official

   # Install TailwindCSS and PostCSS
   npm install tailwindcss postcss autoprefixer

   # Install Axios for API requests
   npm install axios
   ```

4. **Configure TailwindCSS (if not pre-configured):**

   If TailwindCSS is not already configured in your project, follow these steps:

   - **Create the Tailwind config**:

     ```bash
     npx tailwindcss init
     ```

   - **Configure Tailwind in `tailwind.config.js`**:

     ```js
     module.exports = {
       content: [
         "./pages/**/*.{js,ts,jsx,tsx}",
         "./components/**/*.{js,ts,jsx,tsx}",
         "./app/**/*.{js,ts,jsx,tsx}",
       ],
       theme: {
         extend: {},
       },
       plugins: [],
     };
     ```

   - **Add Tailwind to your CSS (typically in `globals.css`)**:
     ```css
     @tailwind base;
     @tailwind components;
     @tailwind utilities;
     ```

5. **Run the frontend development server:**

   ```bash
   npm run dev
   ```

   The frontend will be running at `http://localhost:3000`.

---

## Backend Setup

### Prerequisites

Ensure you have the following installed on your system:

- **Python** (version 3.6 or above)
- **pip** (Python package manager)

### Steps to Set Up the Backend

1. **Clone the repository:**

   ```bash
   git clone <repo-url>
   cd <repo-directory>
   ```

2. **Navigate to the backend directory:**

   ```bash
   cd backend
   ```

3. **Create a virtual environment (optional but recommended):**

   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

4. **Install Django and other required backend dependencies:**

   You will need to install Django and some related packages, as well as the Django REST Framework (DRF). Run the following command:

   ```bash
   pip install django djangorestframework
   ```

5. **Run database migrations (if needed):**

   If there are new migrations or if this is the first time you're running the app, run:

   ```bash
   python manage.py migrate
   ```

6. **Start the Django development server:**

   ```bash
   python manage.py runserver
   ```

   The backend will be running at `http://localhost:8000`.

--

## Running the Application

To run the application, follow these steps:

1. **Start the Backend**:
   Ensure the Django server is running:

   ```bash
   cd backend
   python manage.py runserver
   ```

2. **Start the Frontend**:
   Ensure the Next.js development server is running:

   ```bash
   cd frontend
   npm run dev
   ```

### Access the Application

Once both the backend and frontend servers are running, visit `http://localhost:3000` in your browser to view the dashboard with the charts.

---

## Future improvements

1. Add more interactive features: Incorporate chart interactions like zooming and panning.
2. Use a database: Instead of hardcoded data, connect the backend to a database (e.g., PostgreSQL) for dynamic data fetching.
3. Authentication: Add user authentication to personalize the dashboard data.
4. Error handling: Enhance error handling and display error messages on the frontend when API calls fail.
