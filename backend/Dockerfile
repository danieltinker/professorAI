FROM python:3.11-slim

WORKDIR /app

# install OS deps if needed
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
 && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# copy in a default .env if you like, or override via docker-compose
# ENV ALLOWED_ORIGINS=http://localhost:3000
# ENV STORAGE_DIR=/app/pdfs

EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--workers", "4"]
