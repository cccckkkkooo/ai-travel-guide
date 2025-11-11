# Используем официальный минимальный python 3.9 образ
FROM python:3.9-slim

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем зависимости для установки
COPY requirements.txt .

# Устанавливаем зависимости
RUN pip install --no-cache-dir -r requirements.txt

# Копируем остальной код приложения
COPY . .

# Google Cloud Run использует порт 8080
EXPOSE 8080

# Запускаем Flask-приложение через Gunicorn
CMD exec gunicorn --bind :8080 --workers 1 --threads 8 --timeout 0 flask_server_v3:app
