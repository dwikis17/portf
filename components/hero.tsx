import Image from "next/image";
import Link from "next/link";

export default function Hero() {
    return (
        <section className="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
                <h1 className="text-5xl font-extrabold leading-[1.06] tracking-tight text-zinc-950 sm:text-6xl lg:text-7xl">
                    I&apos;m <span className="inline-block bg-[#f5697c] px-3 py-1 text-white">Dwiki</span>,
                    <br />
                    a Software Engineer
                    <br />
                    from <span className="inline-block bg-[#3f82f3] px-3 py-1 text-white">Indonesia</span>
                </h1>

                <p className="mt-8 max-w-2xl text-lg leading-relaxed text-zinc-700">
                    Currently expanding into AI engineering. Currently diving into MLOps, LangChain, and LangGraph while building full-stack applications that leverage modern AI capabilities.
                </p>

                <div className="mt-10 flex flex-wrap gap-4">
                    <Link
                        href="mailto:dev.dwiki@gmail.com"
                        className="inline-flex items-center gap-2 rounded-2xl border-[3px] border-zinc-950 bg-zinc-950 px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-zinc-800"
                    >
                        <span aria-hidden="true">✉</span>
                        Get in touch
                    </Link>
                    <Link
                        href="/projects"
                        className="inline-flex items-center gap-2 rounded-2xl border-[3px] border-zinc-950 bg-transparent px-8 py-4 text-lg font-semibold text-zinc-950 transition-colors hover:bg-white"
                    >
                        <span aria-hidden="true">◻</span>
                        View portfolio
                    </Link>
                    <Link
                        href="https://github.com/dwikis17"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-2xl border-[3px] border-zinc-950 bg-transparent px-8 py-4 text-lg font-semibold text-zinc-950 transition-colors hover:bg-white"
                        aria-label="GitHub Profile"
                    >
                        <svg
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-5 w-5"
                        >
                            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                            <path d="M9 18c-4.51 2-5-2-7-2" />
                        </svg>
                        GitHub
                    </Link>
                </div>
            </div>

            <div className="mx-auto w-full max-w-[460px]">
                <Image
                    src="/hero.png"
                    alt="Fallback portrait illustration"
                    width={760}
                    height={760}
                    className="h-auto w-full"
                    priority
                />
            </div>
        </section>
    )
}