FROM python:3.9-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

RUN mkdir -p /app/public && \
    if [ ! -f /app/public/index.html ]; then \
    echo '<html><body><h1>🌍 AI Travel Guide API</h1></body></html>' > /app/public/index.html; \
    fi

EXPOSE 8080

# ПРОСТО И ПОНЯТНО - находит flask_server_v3.py в корне /app
CMD exec gunicorn --bind :8080 --workers 1 --threads 8 --timeout 0 flask_server_v3:app
