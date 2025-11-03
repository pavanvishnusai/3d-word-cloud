3D Word Cloud – FastAPI + React Three Fiber

This project is an interactive full-stack application that extracts keywords from any online article using a Python FastAPI backend and visualizes them as a 3D word cloud using React Three Fiber (Three.js for React).
It demonstrates a complete end-to-end flow where a user enters a URL, the backend processes the text using TF-IDF, and the frontend renders an interactive 3D visualization.

Tech Stack:
Layer	                        Technology
Frontend	                React, Vite, TypeScript, React Three Fiber, Drei
Backend	                    FastAPI, Python 3.11
NLP	                        TF-IDF (via scikit-learn)
Web Scraping	            Requests, BeautifulSoup4
Visualization	            Three.js (via React Three Fiber)
Communication	            REST API (JSON)

Project Structure:
3d-word-cloud/
│
├── backend/
│   ├── app.py                -FastAPI main app
│   ├── text_extraction.py    -Fetch and clean article text
│   ├── nlp.py                -TF-IDF keyword extraction
│   ├── requirements.txt      -Backend dependencies
│
├── frontend/
│   ├── src/
│   │   ├── App.tsx           -Main React App
│   │   ├── api.ts            -API connection to FastAPI
│   │   ├── components/
│   │   │   ├── HUD.tsx
│   │   │   └── WordCloud3D.tsx
│   │   └── styles.css
│   ├── vite.config.ts
│   └── package.json
│
└── README.md                 -Main project documentation

Backend Overview:
API Endpoints
Method	Endpoint	        Description
GET	    /health	        Health check endpoint
POST	/analyze	    Accepts { "url": "<article_url>" } and returns keyword weights

Example Response:
{
  "words": [
    {"word": "world", "weight": 0.95},
    {"word": "news", "weight": 0.88}
  ]
}

Backend Setup:
cd backend
python3 -m venv .venv
source .venv/bin/activate    # macOS / Linux
            or
.venv\Scripts\activate       # Windows

pip install -r requirements.txt
uvicorn app:app --reload --port 8000

Frontend Overview:
The frontend is built with React and React Three Fiber.
Users can enter any article URL, send it to the backend, and view an animated 3D word cloud that responds to hover and zoom interactions.

Frontend Setup:
cd frontend
npm install
npm run dev

The frontend runs on http://localhost:5173
The backend runs on http://localhost:8000

Full Application Flow:
- User enters a URL in the input box.
- The frontend sends a POST request to /analyze.
- The FastAPI backend fetches the article, cleans the text, and applies TF-IDF analysis.
- The backend returns the top keywords with normalized weights.
- The React Three Fiber frontend renders the words in an interactive 3D scene.

Features:
- Simple URL input with pre-populated sample links
- Asynchronous API communication between frontend and backend
- Loading and error handling for user feedback
- TF-IDF-based keyword extraction and scoring
- Interactive 3D visualization using Three.js and React Three Fiber
- Clear, modular architecture for both backend and frontend

Libraries Used:
Backend
fastapi, uvicorn, requests, beautifulsoup4, lxml, scikit-learn, numpy, scipy
Frontend
react, vite, @react-three/fiber, @react-three/drei, three, zustand, ky

How to Run the Full Stack Application:
- Open two terminals.
Terminal 1 – Backend
cd backend
source .venv/bin/activate
uvicorn app:app --reload --port 8000

Terminal 2 – Frontend
cd frontend
npm run dev

Visit http://localhost:5173 in your browser.

Author:
Pavan Vishnu Sai Bestha