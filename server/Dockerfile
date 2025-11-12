# Используем официальный минимальный python 3.9 образ
FROM python:3.9-slim

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем requirements.txt
COPY requirements.txt .

# Устанавливаем зависимости
RUN pip install --no-cache-dir -r requirements.txt

# Копируем ВЕСЬ код
COPY . .

# ДОБАВЬ ЭТИ СТРОКИ - копируем явно папку public
RUN mkdir -p /app/public
COPY public/ /app/public/

# Проверяем что файлы скопировались
RUN ls -la /app/public/ && echo "✅ Public folder copied successfully"

# Google Cloud Run использует порт 8080
EXPOSE 8080

# Запускаем Flask-приложение через Gunicorn
CMD exec gunicorn --bind :8080 --workers 1 --threads 8 --timeout 0 server.flask_server_v3:app
