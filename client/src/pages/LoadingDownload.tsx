
export default function Loading() {
    return(
<main className="w-screen h-screen flex flex-col p-4 items-center justify-center">
                <header className="w-full flex items-center justify-between">
                    <div className="w-10 h-10 skeleton"></div>
                    <div className="w-10 h-10 skeleton"></div>
                </header>
                <section className="w-full h-full flex flex-col items-center justify-center gap-5">
                    <section className="w-full flex items-center gap-4">
                        <div className="flex flex-col items-center justify-between gap-2">
                            <div className="w-16 h-16 skeleton">
                            </div>
                            <div className="w-16 h-6 skeleton"></div>
                        </div>
                        <div className="w-full flex flex-col justify-center gap-2">
                            <div className="w-full h-14 skeleton"></div>
                            <div className="w-40 h-8 skeleton"></div>
                            <div className="w-full h-6 skeleton"></div>
                        </div>
                    </section>
                    <section className="flex w-full items-center justify-center flex-col gap-3">
                        <div className="w-full h-14 skeleton"></div>
                        <div className="w-full h-14 skeleton"></div>
                    </section>
                </section>
                <footer className="w-full">
                <div className="w-full h-10 skeleton"></div>

                </footer>
            </main>
    )
}