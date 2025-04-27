# backend/main.py
import shutil
from pathlib import Path

from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

app = FastAPI()

# allow your React dev server to talk to this
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["POST", "OPTIONS"],
    allow_headers=["*"],
)

# Store PDFs in professorAI/backend/pdfs
STORAGE_DIR = Path(__file__).parent / "pdfs"
STORAGE_DIR.mkdir(exist_ok=True, parents=True)


@app.post("/professorAI/BuildCourse/")
async def build_course(pdf_file: UploadFile = File(...)):
    if pdf_file.content_type != "application/pdf":
        raise HTTPException(400, "Only application/pdf allowed")

    safe_name = Path(pdf_file.filename).name
    dest = STORAGE_DIR / safe_name

    try:
        with dest.open("wb") as buf:
            shutil.copyfileobj(pdf_file.file, buf)
    except Exception as e:
        raise HTTPException(500, f"Could not save file: {e}")

    return JSONResponse({"filename": safe_name, "message": "Upload successful"})
