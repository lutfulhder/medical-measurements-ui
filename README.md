 Simple Web UI ( Frontend)

A lightweight React + Vite frontend is included under the directory:

medical-measurements-ui


This UI provides a minimal interface for:

✔ Searching measurements by patient ID
✔ Filtering by time range
✔ Viewing results in a clean, responsive table
✔ Demonstrating how a client application would consume the API

Running the UI Locally
cd medical-measurements-ui
npm install
npm run dev


The application will start at:

http://localhost:5173


It expects your backend service to be running at:

http://localhost:8080


(You can update the base URL inside the UI if deploying the backend to AWS.)

Tech Stack

React 18

Vite

TypeScript

Fetch API for backend calls
