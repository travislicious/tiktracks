import { ArrowLeft, Share2 } from "lucide-react"
import { Link } from "react-router-dom"

export default function Loading() {
    return(
        <main className="w-screen h-screen flex flex-col p-4 items-center justify-center">
        <header className="w-full flex items-center justify-between">
            <Link to="/" className="invisible">
                <ArrowLeft className="md:size-10"/>
            </Link>
            <div className="w-64 h-8 skeleton"></div>
            <Share2 className="md:size-8 invisible"/>
        </header>
        <section className="w-full h-full flex flex-col items-center justify-center gap-4 md:gap-7">
            <section>
                <div className="w-64 h-64 skeleton md:w-80 md:h-80 rounded"></div>
                <div className="w-64 flex items-center justify-between mt-4 md:w-80">
                    <div className="w-16 skeleton h-6"></div>
                    <div className="w-16 skeleton h-6"></div>
                </div>
            </section>
            <section className="w-full flex flex-col gap-2 items-center justify-center md:gap-3">
                <div className="w-48 h-12 skeleton"></div>
                <div className="w-40 h-8 skeleton mt-2"></div>
            </section>
        </section>
        <div className="w-64 h-10 skeleton mb-6"></div>
        <footer className="w-full flex items-center gap-2 mb-2 md:justify-center md:mb-4">
            <div className="w-64 h-12 skeleton md:hidden"></div>
            <div className="hidden md:flex items-center gap-4">
                <div className="skeleton w-64 h-12"></div>
                <div className="skeleton w-32 h-12"></div>
                <div className="skeleton w-64 h-12"></div>
            </div>
            <div className="w-32 h-12 skeleton md:hidden"></div>
        </footer>
    </main>
    )
}