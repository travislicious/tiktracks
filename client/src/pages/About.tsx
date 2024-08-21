import { ArrowLeft } from "lucide-react"
import { Link } from "react-router-dom"

export default function AboutPage() {
    return (
        <main className="w-full h-full flex flex-col gap-4 p-4">
            <div className="flex w-full gap-2 items-center md:mb-3">
                <Link to="/">
                    <ArrowLeft className="md:size-10"/>
                </Link>
                <h1 className="font-bold md:text-3xl">About TikTracks.</h1>
            </div>
            <h1 className="text-2xl font-bold md:text-4xl">TikTracks.</h1>
            <hr className="border border-neutral"/>
            <p className="md:text-xl">TikTracks is a website who helps downloading Tiktok Tracks from videos using a single link in one click, all for free. You can download the audio only, a video made with the source video cover and a video made with the song cover.</p>
            <h2 className="font-bold md:text-2xl">Key Features.</h2>
            <ul className="pl-2 flex flex-col gap-2 md:text-xl">
                <li>- Fast And Easy Use.</li>
                <li>- Intuitive UI.</li>
                <li>- Multiple Download Options.</li>
                <li>- 100 % Legal</li>
                <li>- Free.</li>
            </ul>
            <h2 className="font-bold md:text-2xl">About The Developer.</h2>
            <p className="md:text-xl">Hello I'm Travis, A Young Experienced Developer in Web Applications and Websites, Mobile And Python Scripts since 2020. I'm Experienced in Python Automations and Making simple small websites and apps. I'm Experienced also in Minimalistic design.</p>
            <h2 className="font-bold md:text-2xl">Contact.</h2>
            <p className="md:text-2xl">If you want to ask me questions or suggestions, contact me at <a href="mailto:youngtravislicious@gmail.com" className="text-accent">This email address here.</a> And I'm not affiliated with TikTok and other TikTok services and owners.</p>
        </main>
    )
}