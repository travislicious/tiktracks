import time
import os
import multiprocessing
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from pydantic import BaseModel
import requests
import renderer

app = FastAPI()

class Request(BaseModel):
    image_url: str
    music_url: str


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/check-status")
def check_status(path: str):
    delete_old_files()
    if not os.path.exists(path):
        return 'Not found'
    else:
        return path

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
def create_video(req: Request):
    image_url = req.image_url
    music_url = req.music_url
    renderer.init()
    manager = multiprocessing.Manager()
    return_val = manager.dict()
    p1 = multiprocessing.Process(target=renderer.create_video, args=(music_url, image_url, return_val))
    p1.start()
    p1.join()


    return {'path': return_val.values()}


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
def download_audio(url, name):
    response = requests.get(url, timeout=60)
    audio_path = f'temp/{name}.mp3'
    with open(audio_path, 'wb') as file:
        file.write(response.content)
    return audio_path

@app.get("/download-audio")
def serve_audio(url: str, name:str):
    path = download_audio(url, name)
    delete_old_files()

    return FileResponse(path, media_type='video/mp4', filename=name.removesuffix(".mp3"))


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
