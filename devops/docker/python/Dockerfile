# devops/docker/python/Dockerfile

FROM python:3.9-slim

# Çalışma dizinini ayarla
WORKDIR /app

# Gerekli paketleri yükle
COPY requirements.txt requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Uygulama kodunu kopyala
COPY . .

# Uvicorn sunucusunu çalıştır
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
