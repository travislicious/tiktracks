import time
import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
import requests
import renderer

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def delete_file(filename, delay):
    """
    Deletes the specified file after the given delay.
    """
    time.sleep(delay)
    file_path = os.path.join('temp/', filename)
    if os.path.exists(file_path):
        os.remove(file_path)
        print(f'{filename} deleted.')


@app.post("/create-video")
def create_video(music_link: str, image_link: str):
    image_url = image_link
    music_url = music_link
    renderer.init()
    video_path = renderer.create_video(music_url, image_url)


    return {'path': video_path}


@app.get("/")
def scrape(url: str):
    if url:
        if "https://www.tiktok.com/" in url and "video" in url:
            data = requests.get(f"https://scraped.vercel.app/from-video?url={url}", timeout=60)
            res = data.json() if data.status_code == 200 else {"error": "500"}
            result = res
        elif "https://www.tiktok.com/" in url and "photo" in url:
            data = requests.get(f"https://scraped.vercel.app/from-slideshow?url={url}", timeout=60)
            res = data.json() if data.status_code == 200 else {"error": "500"}
            result = res
        else:
            result = {"error": "130"}
    else:
        result = {"error": "100"}

    return result

@app.get("/download-video")
def download_video(path: str, name:str):
    delete_old_files()
    if not os.path.exists(path):
        return ''

    return FileResponse(path, media_type='video/mp4', filename=name)


def delete_old_files():
    """
    Deletes files that were created more than 3 minutes ago.
    """
    current_time = time.time()
    for filename in os.listdir("temp/"):
        file_path = os.path.join("temp/", filename)
        if os.path.isfile(file_path):
            # Get the file's creation/modification time
            file_age = current_time - os.path.getmtime(file_path)
            if file_age > 180:  # 60 seconds = 1 minute
                os.remove(file_path)
                print(f'{filename} deleted (older than 3 minutes).')
