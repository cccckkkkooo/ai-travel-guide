# Используем официальный минимальный python 3.9 образ
FROM python:3.9-slim

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем requirements.txt с абсолютным путем
COPY requirements.txt /app/requirements.txt

# Устанавливаем зависимости
RUN pip install --no-cache-dir -r /app/requirements.txt

# Копируем весь код приложения
COPY . /app/

# Если папка public не существует - создаём её и добавляем простой index.html
RUN mkdir -p /app/public && \
    if [ ! -f /app/public/index.html ]; then \
    echo '<html><body><h1>🌍 AI Travel Guide API</h1><p>API работает! Используй endpoints:</p><ul><li>/api/health</li><li>/api/search-attractions</li><li>/api/search-restaurants</li></ul></body></html>' > /app/public/index.html; \
    fi

# Убедимся что Python может найти модули правильно
ENV PYTHONPATH=/app:/app/server:$PYTHONPATH

# Google Cloud Run использует порт 8080
EXPOSE 8080

# Запускаем Flask-приложение через Gunicorn из корня с указанием пути к модулю
CMD exec gunicorn --bind :8080 --workers 1 --threads 8 --timeout 0 --pythonpath /app/server server.flask_server_v3:app
