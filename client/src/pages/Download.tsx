import { ArrowLeft, Share2 } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect, useRef } from "react"
import Loading from "./LoadingDownload"
import ErrorSection from "./ErrorSection"

export default function DownloadPage() {

    
    return (
        <main className="w-screen h-screen flex flex-col p-4 items-center justify-center">
            <header className="w-full flex items-center justify-between">
                <Link to="/">
                    <ArrowLeft className="md:size-10"/>
                </Link>
                <h1 className="w-64 truncate md:text-2xl md:w-full text-center">Extracted From Author Name's Video.</h1>
                <Share2 className="md:size-8"/>
            </header>
            <section className="w-full h-full flex flex-col items-center justify-center gap-4 md:gap-7">
                <section>
                    <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="song cover" className="w-64 h-64 rounded-lg md:w-80 md:h-80"/>
                    <div className="w-64 flex items-center justify-between mt-4 md:w-80">
                        <h2 className="md:text-xl">00:10</h2>
                        <h2 className="md:text-xl">5000 Uses</h2>
                    </div>
                </section>
                <section className="w-full flex flex-col gap-2 items-center justify-center md:gap-3">
                    <h1 className="text-3xl font-bold md:text-4xl">Song Name</h1>
                    <h2 className="text-xl md:text-2xl">Song Author</h2>
                </section>
            </section>
            <h1 className="text-2xl font-semibold mb-4">Download Options.</h1>
            <footer className="w-full flex items-center gap-2 mb-2 md:justify-center md:mb-4">
                <select className="select bg-primary w-full rounded md:hidden" defaultValue="mp3">
                    <option value="mp3">Audio Only</option>
                    <option value="thumb-video">Video (Audio + Thumb)</option>
                    <option value="cover-video">Video (Audio + Cover)</option>
                </select>
                <div className="hidden md:flex items-center gap-4">
                    <button className="btn btn-primary rounded">Download Video (Audio + Thumb)</button>
                    <button className="btn btn-primary rounded">Download Audio</button>
                    <button className="btn btn-primary rounded">Download Video (Audio + Cover)</button>
                </div>
                <a href="" target="_blank" role="button" className="btn btn-primary rounded md:hidden">
                    Download.
                </a>
            </footer>
        </main>
    )
}