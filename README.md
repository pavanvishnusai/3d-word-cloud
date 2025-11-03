# 3D Word Cloud – FastAPI + React Three Fiber

This project is an interactive full-stack application that extracts keywords from any online article using a Python FastAPI backend and visualizes them as a 3D word cloud using React Three Fiber (Three.js for React).  
It demonstrates a complete end-to-end flow where a user enters a URL, the backend processes the text using TF-IDF, and the frontend renders an interactive 3D visualization.

---

## Tech Stack

| Layer | Technology |
|--------|-------------|
| Frontend | React, Vite, TypeScript, React Three Fiber, Drei |
| Backend | FastAPI, Python 3.11 |
| NLP | TF-IDF (via scikit-learn) |
| Web Scraping | Requests, BeautifulSoup4 |
| Visualization | Three.js (via React Three Fiber) |
| Communication | REST API (JSON) |

---

## Project Structure

```plaintext
3d-word-cloud/
│
├── backend/
│   ├── app.py                - FastAPI main app
│   ├── text_extraction.py    - Fetch and clean article text
│   ├── nlp.py                - TF-IDF keyword extraction
│   ├── requirements.txt      - Backend dependencies
│
├── frontend/
│   ├── src/
│   │   ├── App.tsx           - Main React App
│   │   ├── api.ts            - API connection to FastAPI
│   │   ├── components/
│   │   │   ├── HUD.tsx
│   │   │   └── WordCloud3D.tsx
│   │   └── styles.css
│   ├── vite.config.ts
│   └── package.json
│
└── README.md                 - Main project documentation
````

---

## Backend Overview

The backend is built using **FastAPI** and handles the following:

* Fetches article text from a given URL
* Cleans and processes the text
* Extracts top keywords using **TF-IDF**
* Returns the results as a JSON response for frontend visualization

### **API Endpoints**

| Method | Endpoint   | Description                                                      |
| ------ | ---------- | ---------------------------------------------------------------- |
| GET    | `/health`  | Health check endpoint                                            |
| POST   | `/analyze` | Accepts `{ "url": "<article_url>" }` and returns keyword weights |

---

### **Example Response**

```json
{
  "words": [
    {"word": "world", "weight": 0.95},
    {"word": "news", "weight": 0.88}
  ]
}
```

---

## Backend Setup

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate    # macOS / Linux
.venv\Scripts\activate       # Windows

pip install -r requirements.txt
uvicorn app:app --reload --port 8000
```

**Backend runs on:** [http://localhost:8000](http://localhost:8000)

---

## Frontend Overview

The frontend is developed using **React**, **Vite**, and **React Three Fiber (Three.js for React)**.
It provides an intuitive UI where users can:

* Enter any article URL
* Trigger backend analysis
* See an **animated 3D word cloud** based on extracted keywords
* Interact with the scene via hover, zoom, and rotation

---

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

**Frontend runs on:** [http://localhost:5173](http://localhost:5173)
**Backend runs on:** [http://localhost:8000](http://localhost:8000)

---

## Full Application Flow

1. User enters a URL in the input box.
2. The frontend sends a `POST` request to `/analyze`.
3. The FastAPI backend fetches and cleans the article text.
4. TF-IDF analysis extracts top keywords.
5. Backend returns keyword-weight pairs.
6. The frontend visualizes them as an interactive **3D Word Cloud**.

---

## Features

* Simple URL input with pre-populated sample links
* Asynchronous API communication between frontend and backend
* Loading and error handling with user feedback
* TF-IDF-based keyword extraction and scoring
* Interactive 3D visualization using Three.js and React Three Fiber
* Clean, modular codebase for easy expansion

---

## Libraries Used

### **Backend**

* fastapi
* uvicorn
* requests
* beautifulsoup4
* lxml
* scikit-learn
* numpy
* scipy

### **Frontend**

* react
* vite
* @react-three/fiber
* @react-three/drei
* three
* zustand
* ky

---

## How to Run the Full Stack Application

Open **two terminals**:

### **Terminal 1 – Backend**

```bash
cd backend
source .venv/bin/activate
uvicorn app:app --reload --port 8000
```

### **Terminal 2 – Frontend**

```bash
cd frontend
npm run dev
```

Then visit:
[http://localhost:5173](http://localhost:5173) in your browser.

---

## Author

**Pavan Vishnu Sai Bestha**
