from playwright.sync_api import sync_playwright, Playwright, Page
from flask import Flask, jsonify, request, send_file
from flask_cors import CORS
import re
import bs4
import requests
from requests.structures import CaseInsensitiveDict
import renderer

app = Flask(__name__)
CORS(app)

current_song = {
    'profile_pic': "",
    'music_url': "",
    'thumb_url': "",
    'download_path': "",
    'fname': "",
    'author_name': '',
    'song_name': ''
}

def extract_from_embed(url):
    embed_url = f'https://www.tiktok.com/oembed?url={url}'
    data = requests.get(embed_url, timeout=60)
    data = data.json()
    profile_pic, music_url, song_name = extract_sound(url)
    song_data = {
        'thumb_url': data['thumbnail_url'],
        'music_url': music_url,
        'author_name': data['author_name'],
        'profile_pic': profile_pic,
        'song_name': song_name

    }
    global current_song
    current_song = {
        'profile_pic': song_data['profile_pic'],
        'music_url': song_data['music_url'],
        'thumb_url': song_data['thumb_url'],
        'author_name': song_data['author_name'],
        'song_name': song_data['song_name']
    }

    return song_data

def extract_sound(link):
    url = "https://ttsave.app/download"

    data = {"query": link,"language_id":"1"}

    resp = requests.post(url, json=data, timeout=60)
    html = bs4.BeautifulSoup(resp.content, 'html.parser')
    url_list = [elem["href"] for elem in html.find_all('a')]
    span_list = [elem.string for elem in html.find_all('span')]

    return url_list[0], url_list[4], span_list[4].split('-')[1]


@app.route("/set-type", methods=["POST"])
def set_type():
    data = request.json
    
    if data["type"] == "music":
        current_song["download_path"] = current_song["music_url"]
        current_song["fname"] = f'{current_song["author_name"]} - {current_song["song_name"]} (Audio)'
    elif data["type"] == "cover-video":
        renderer.create_video_from_cover(current_song['music_url'], current_song['cover_url'])
        current_song["download_path"] = f'http://127.0.0.1:5000/{renderer.CURRENT_FILE["filepath"]}'
        current_song["fname"] = f'{current_song["author_name"]} - {current_song["song_name"]} (Cover Video)'
    elif data["type"] == "thumb-video":
        renderer.create_video_from_thumb(current_song['music_url'], current_song['thumb_url'])
        current_song["download_path"] = f'http://127.0.0.1:5000/{renderer.CURRENT_FILE["filepath"]}'
        current_song["fname"] = f'{current_song["author_name"]} - {current_song["song_name"]} (Thumb Video)'

    return 'Type set.'
        


@app.route("/", methods=["GET"])
def scrape():
    url = request.args.get("url")
    if url:
        if "https://www.tiktok.com/" in url and "video" in url:
            res = extract_from_embed(url)
            result = res
        else:
            result = {"error": "130"}
    else:
        result = {"error": "100"}

    return jsonify(result)

@app.route("/download", methods=["GET"])
def download():
    return send_file(current_song["download_path"], as_attachment=True, download_name=current_song["fname"])

if __name__ == "__main__":
    app.run(debug=True)
