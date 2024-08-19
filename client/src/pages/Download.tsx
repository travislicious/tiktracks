import { ArrowLeft, Share2 } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect, useRef } from "react"

export default function DownloadPage() {
    return (
        <main className="w-screen h-screen flex flex-col p-4 items-center justify-center">
            <header className="w-full flex items-center justify-between">
                <Link to="/">
                    <ArrowLeft/>
                </Link>
                <h1 className="w-64 truncate">Extracted From Author Name's Video.</h1>
                <Share2/>
            </header>
            <section className="w-full h-full flex flex-col items-center justify-center gap-4">
                <section>
                    <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="song cover" className="w-64 h-64 rounded-lg"/>
                    <div className="w-64 flex items-center justify-between mt-4">
                        <h2>00:10</h2>
                        <h2>5000 Uses</h2>
                    </div>
                </section>
                <section className="w-full flex flex-col gap-2 items-center justify-center">
                    <h1 className="text-3xl font-bold">Song Name</h1>
                    <h2 className="text-xl">Song Author</h2>
                </section>
            </section>
            <h1 className="text-2xl font-semibold mb-4">Download Options.</h1>
            <footer className="w-full flex items-center gap-2 mb-2">
                <select className="select bg-primary w-full rounded" defaultValue="mp3">
                    <option value="mp3">Audio Only</option>
                    <option value="thumb-video">Video (Audio + Thumb)</option>
                    <option value="cover-video">Video (Audio + Cover)</option>
                </select>
                <div className="hidden md:flex items-center gap-2">
                    <button>Download</button>
                    <button>Download</button>
                    <button>Download</button>
                </div>
                <a href="" target="_blank" role="button" className="btn btn-primary rounded">
                    Download.
                </a>
            </footer>
        </main>
    )
}