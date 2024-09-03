FROM python:3.11-slim

# Keeps Python from buffering stdout and stderr to avoid situations where
# the application crashes without emitting any logs due to buffering.
ENV PYTHONUNBUFFERED=1

WORKDIR /app

RUN mkdir -p /app/temp && chmod -R 777 /app/temp

RUN apt-get update && apt-get install -y \
    ffmpeg \
    libsm6 \
    libxext6

COPY requirements.txt .

RUN pip install -r requirements.txt


# Copy the source code into the container.
COPY . .

# Expose the port that the application listens on.
EXPOSE 5000

# Run the application.
CMD ["fastapi", "run", "app.py", "--port", "5000"]
