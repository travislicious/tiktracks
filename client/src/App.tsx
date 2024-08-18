import { Menu, Download } from "lucide-react"
import { Link } from "react-router-dom"
import { useState } from "react"

interface ErrorLevels {
  invalid: boolean,
  missing: boolean,
}

export default function App() {
  const [url, setUrl] = useState("")
  const [error, setError] = useState<ErrorLevels>()

  const downloadSong = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!url) {
      setError({invalid: false, missing: true})
      console.log(error)
    } else {
      if (url.includes("https://www.tiktok.com/") || url.includes("https://vm.tiktok.com/")) {
        console.log(url)
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
        <main className="flex flex-col w-screen h-screen items-center justify-center gap-4 p-4">
          <header className="w-full flex items-center justify-between">
            <Link className="text-3xl font-bold hover:text-primary-content/30 transition-colors duration-200" to="/">TikTracks.</Link>
            <label htmlFor="drawer" className="btn drawer-button btn-ghost">
              <Menu size={24} />
            </label>
          </header>
          <section className="w-full h-full flex flex-col gap-4 md:items-center justify-center">
          <h1 className="text-5xl font-bold">TikTracks.</h1>
          <p>Download Tiktok Tracks from videos or slideshows from a single link in one click, all for free.</p>
          <form onSubmit={downloadSong} className="w-full flex flex-col gap-4">
            <input type="url" placeholder="https://www.tiktok.com/@example/video/" className="input input-bordered" value={url} onChange={(e) => setUrl(e.target.value)}/>
            { error?.missing && <span className="text-lg text-error">This field is required.</span>}
            { error?.invalid && <span className="text-lg text-error">This url is invalid.</span>}
            <button className="btn btn-primary w-fit" type="submit">
              <Download size={24}/>
              Download
              </button>
          </form>
          </section>
          <footer>
            <h1 className="text-center font-semibold">2024 Ayomide. All rights reserved.</h1>
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