import { Menu, Download } from "lucide-react"
import { Link } from "react-router-dom"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

interface ErrorLevels {
  invalid: boolean,
  missing: boolean,
}

export default function App() {
  const [url, setUrl] = useState("")
  const [error, setError] = useState<ErrorLevels>()
  const navigate = useNavigate()

  const downloadSong = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!url) {
      setError({invalid: false, missing: true})
      console.log(error)
    } else {
      if (url.includes("https://www.tiktok.com/") || url.includes("/video/") && url.includes("/photo/") && url.includes("https://www.tiktok.com/")) {
        console.log(url)
        if (url.includes("/video/")) {
          const videoIdMatch = url.match(/\/video\/(\d+)/);

          if (videoIdMatch) {
            const videoId = videoIdMatch[1];
            navigate(`/download/${videoId}`)
          }
        }
        if (url.includes("/photo/")) {
          const photoIdMatch = url.match(/\/photo\/(\d+)/);

          if (photoIdMatch) {
            const photoId = photoIdMatch[1];
            navigate(`/download/${photoId}`)
          }
        }

        setError({invalid: false, missing: false})
      } else {
        setError({invalid: true, missing: false})
      }
    }
  }                          
  
  return (
    <div className="drawer drawer-end">
      <input id="drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <main className="flex flex-col w-screen h-screen items-center justify-center gap-4 p-4 md:p-6">
          <header className="w-full flex items-center justify-between">
            <Link className="text-3xl font-bold hover:text-primary-content/30 transition-colors duration-200 md:text-4xl" to="/">TikTracks.</Link>
            <div className="md:flex gap-10 items-center hidden mr-4">
            <Link className="text-2xl font-bold hover:text-primary-content/30 transition-colors duration-200" to="/terms">Terms.</Link>
            <Link className="text-2xl font-bold hover:text-primary-content/30 transition-colors duration-200" to="/about">About.</Link>
            </div>
            <label htmlFor="drawer" className="btn drawer-button btn-ghost md:hidden">
              <Menu size={24} />
            </label>
          </header>
          <section className="w-full h-full flex flex-col gap-4 md:items-center justify-center md:gap-6">
          <h1 className="text-5xl font-bold md:text-7xl">TikTracks.</h1>
          <p className="md:w-[30rem] md:text-xl md:text-center">Download Tiktok Tracks from videos using a single link in one click, all for free.</p>
          <form onSubmit={downloadSong} className="w-full flex flex-col gap-4 md:w-[34rem]">
            <div className="w-full flex items-center gap-3">
            <input type="url" placeholder="https://www.tiktok.com/@example/video/021542" className="input input-bordered w-full" value={url} onChange={(e) => setUrl(e.target.value)}/>
            <button className="btn btn-primary w-fit md:flex md:gap-2 hidden" type="submit">
              <Download size={24}/>
              Download
              </button>
            </div>
            { error?.missing && <span className="text-lg text-error">This field is required.</span>}
            { error?.invalid && <span className="text-lg text-error">This url is invalid.</span>}
            <button className="btn btn-primary w-fit md:hidden" type="submit">
              <Download size={24}/>
              Download
              </button>
          </form>
          </section>
          <footer>
            <h1 className="text-center font-semibold md:text-lg">2024 Ayomide. All rights reserved.</h1>
          </footer>
        </main>
      </div>
      <div className="drawer-side">
        <label htmlFor="drawer" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-6 flex flex-col gap-4 *:text-2xl">
          <Link to="/terms" className="hover:text-primary-content/30 transition-colors duration-200">Terms.</Link>
          <Link to="/about" className="hover:text-primary-content/30 transition-colors duration-200">About.</Link>
        </ul>
      </div>
    </div>
  )
}