Below is a README.md you can drop into your professorAI/ root folder:

Copy
# ProfessorAI PDF Uploader

This repository contains two parts:

1. **Backend** – A FastAPI service that accepts PDF uploads and stores them locally.  
2. **Frontend** – A React app that lets you test the upload endpoint.

---

## 📁 Project Structure

professorAI/ ├── backend/ │ ├── main.py # FastAPI app │ └── pdfs/ # Saved PDFs (created at runtime) └── pdf-uploader/ ├── package.json # React app config (with proxy to backend) └── src/ └── App.js # PDF upload component

---

## 🚀 Prerequisites

- **Python 3.8+**  
- **Node.js 16+** and **npm**  
- A terminal/shell

---

## 🛠️ Setup & Run

### 1. Backend

```bash
cd professorAI/backend
# (Optional) create a venv:
python -m venv .venv
source .venv/bin/activate      # macOS/Linux
# or .venv\Scripts\activate     # Windows

pip install fastapi uvicorn python-multipart
uvicorn main:app --reload --host 0.0.0.0 --port 8000
The FastAPI server will start at http://localhost:8000.

Uploaded PDFs are saved under backend/pdfs/.

2. Frontend
cd professorAI/pdf-uploader
npm install
npm start
The React dev server runs on http://localhost:3000.

Thanks to the "proxy": "http://localhost:8000" setting in package.json, all requests to /professorAI/BuildCourse/ will be forwarded to your FastAPI backend.

📦 Usage
Open your browser to http://localhost:3000.

Click Choose File, select a PDF, then Upload.

On success, you’ll see a confirmation message and find the file in backend/pdfs/.

🔧 Customization & Notes
CORS in backend/main.py is currently set to allow only http://localhost:3000.
