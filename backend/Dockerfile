# Utilise l'image Python officielle
FROM python:3.11-slim

# Crée un dossier pour l'app
WORKDIR /app

# Copie les fichiers
COPY . /app

# Installe les dépendances
RUN pip install --no-cache-dir -r requirements.txt

# Démarre l'app FastAPI avec uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
