import { useQuery } from "@tanstack/react-query";
import ky from "ky";

export interface Song {
    audio_filename: string;
    author_name:    string;
    cover_url:      string;
    music_url:      string;
    song_name:      string;
    video_filename: string;
    music_author:   string;
}

export const useFetchSongData = (url: string) => {
    return useQuery({
        queryFn: () => ky.get(`http://127.0.0.1:5000/?url=${url}`).json<Song>(),
        queryKey: ["urlKey", url]
    })
}