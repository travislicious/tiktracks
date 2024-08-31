import { ArrowLeft, Share2, Music } from "lucide-react"
import { useState, useEffect } from "react"
import Loading from "./LoadingDownload"
import ErrorSection from "./ErrorSection"
import { useFetchSongData } from "../utils/api"

export default function DownloadPage() {
    const [url, setUrl] = useState("")
    const { data, error, isLoading } = useFetchSongData(url)
    const [videoPath, setVideoPath] = useState("")
    const [isProcessing, setIsProcessing] = useState(false)

    const [duration, setDuration] = useState(0)

    const getAudioDuration = (url: string) => {
        const audio = new Audio(url);
        audio.addEventListener('loadedmetadata', () => {
            setDuration(Math.floor(audio.duration))
        });
    };

    async function processVideo() {
        setIsProcessing(true)
        const url = 'http://127.0.0.1:5000/create-video';

        const fetchData = {
            image_url: data?.cover_url,
            music_url: data?.music_url
        }

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(fetchData),
        });

        interface Response {
            path: string;
        }

        const text = await response.text();

        setVideoPath((JSON.parse(text) as Response).path)
        setIsProcessing(false)
    }

    function getUrl() {
        const urlData = window.sessionStorage.getItem("url")
        if (urlData) {
            setUrl(urlData)
        }
    }

    useEffect(() => {
        getUrl()
        if (data) {
            getAudioDuration(data!.music_url)
        }
    }, [data])

    if (error) {
        return <ErrorSection/>
    }

    if (!isLoading) {
        return (
            <main className="w-screen h-screen flex flex-col p-4 items-center justify-center">
                <header className="w-full flex items-center justify-between">
                    <a href="/" role="button">                  
                        <ArrowLeft className="md:size-8"/>
                    </a>
                    <Share2 onClick={() => {navigator.clipboard.writeText("http://localhost:5173")
                        alert("Link Copied.")
                    }}/>
                </header>
                <section className="w-full h-full flex flex-col items-center justify-center gap-5">
                    <section className="w-full flex items-center gap-4 md:w-96">
                        <div className="flex flex-col items-center justify-between gap-2">
                            <div className="w-16 h-16 rounded bg-primary items-center justify-center flex md:w-18 md:h-18">
                                <Music/>
                            </div>
                            <h2 className="font-semibold md:text-lg">00:{duration ? duration : "00"}</h2>
                        </div>
                        <div className="w-full flex flex-col justify-center gap-1 md:gap-2">
                            <h1 className="text-2xl font-bold truncate w-64 md:text-4xl">{data?.song_name}</h1>
                            <h1 className="text-xl md:text-2xl">{data?.music_author}</h1>
                            <h2 className="text-sm truncate w-70 md:text-base">Extracted from <span className="text-accent font-bold">{data?.video_author}'s</span> Video.</h2>
                        </div>
                    </section>
                    <section className="flex w-full items-center justify-center flex-col gap-3 md:w-96">
                        { !videoPath ? (<button className="btn btn-primary w-full font-bold text-lg md:text-xl" disabled={isProcessing} onClick={processVideo}>{ isProcessing ? "Processing Video" : "Process Video"}</button>) : (
                            <a href={`http://127.0.0.1:5000/download-video?path=${videoPath}&name=${data?.video_filename}`} target="_blank" role="button" className="btn w-full font-bold text-lg btn-primary md:text-xl">Download Video</a>
                        )}
                        { !isProcessing && (<a role="button" href={`http://127.0.0.1:5000/download-song?url=${data?.music_url}&name=${data?.audio_filename}`} target="_blank" className="btn w-full font-bold text-lg md:text-xl">Download Audio.</a>)}
                        { videoPath && <h6 className="text-sm text-white/30 w-full text-center md:text-base">Processed Videos are deleted after 2 minutes.</h6>}
                    </section>
                </section>
                <footer className="w-full">
                    <h1 className="text-sm italic text-center w-full text-white/30 md:text-base">Extractions are based on the TikTok Song Extraction System and may be imprecise.</h1>
                </footer>
            </main>
        )
    } else {
        return (
            <Loading/>
        )
    }

    
}