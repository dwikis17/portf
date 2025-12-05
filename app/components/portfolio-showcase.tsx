"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Calendar, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const portfolioData = [
    {
        year: 2024,
        projects: [
            {
                id: 1,
                title: "E-commerce Platform Sohnne",
                description:
                    "A full-stack e-commerce solution with user authentication, product management, and payment paypal integration.",
                image: "/sohnne.jpg",
                tags: ["UI/UX", "React", "TypeScript", "Supabase", "Elysia.js", 'Tailwind',],
                client: "Sohnne",
            },
            {
                id: 2,
                title: "iOS Valorant App",
                description:
                    "A Swift UIKit mobile app built programmatically using collection views, scroll views, and tables, with data fetched via API calls.",
                image: "/ios.jpg",
                tags: ["Swift", "SwiftUI", "UIKit"],
                client: "Valorant",
            },
        ],
    },
    {
        year: 2025,
        projects: [
            {
                id: 8,
                title: "Eyespeak | Assistive Tech",
                description:
                    "An iPadOS AAC device that empowers people with motor neuron diseases to communicate again. Uses advanced ARKit facial recognition to control a full communication board through natural expressions—winks, eyebrow raises, puckers, and more.",
                image: "/eyespeak1.svg",
                tags: ["Swift", "SwiftUI", "ARKit", "SwiftData", "iPadOS", "AAC"],
                client: "Apple Academy 5th Project",
                link: "https://apps.apple.com/id/app/eyespeak-assistive-tech/id6755292635",
            },
            {
                id: 3,
                title: "Findect",
                client: "Apple Academy 4th Project",
                year: 2025,
                duration: "3 months",
                tags: ["Node.js", "Express", "TypeScript", "Prisma", "FastAPI", "Python", "PostgreSQL", "Pinecone", "OpenAI GPT-4o-mini", "Swift", "SwiftUI", "JWT"],
                description:
                    "Findect is a matchmaking app for professional networking events. Unlike random pairing tools, it uses semantic search and LLM reasoning to recommend the top three most compatible attendees for each participant — complete with natural-language explanations of why those matches make sense.",
                challenge:
                    "We spoke to many digital nomads and community companies in Bali to understand their needs and pain points. We stumbled upon Tyrone Williams who was a CEO and had the ability to match people who had problems and he would pair them up with people who could solve those problems. That was essentially his whole business model. We also know other companies who essentially did the same thing.",
                solution:
                    "We built Findect, an iOS app that intelligently matches attendees based on their goals, professions, and interests. Our architecture combines a Node.js REST API (Express + PostgreSQL) for event and attendee management with a Python FastAPI service for AI-powered reasoning and vector search. I served as the AI & backend systems engineer, responsible for the entire FastAPI and semantic search layer, including the RAG pipeline, Pinecone integration, and LLM reasoning optimization.",
                results:
                    "We showcased our work during an exhibition and got to use our app live at the event itself. People were able to be referred to other people at the event and formed new connections. This project gave me deep experience in multi-service orchestration, semantic retrieval, and LLM-powered backend design.",
                image: "/findect1.png",
                sections: [
                    { id: "overview", title: "Project Overview" },
                    { id: "challenge", title: "The Challenge" },
                    { id: "solution", title: "Our Solution" },
                ],
                link: "https://github.com/RafieAmandio/CH-4",
            },
            {
                id: 4,
                title: "SNKI Quotation System",
                description:
                    "A quotation system for SNKI, built with Nextjs, Tailwind, and TypeScript. It allows users to manage their quotations,invoices, payments, and track their orders.",
                image: "/snki.jpeg",
                tags: ["Nextjs", "Tailwind", "TypeScript", "Shadcn/UI"],
                client: "SNKI",
                link: "https://snki-quotation-fe-dev.vercel.app/login",
            },

            {
                id: 5,
                title: "Quickthought",
                description:
                    "A speed journaling app, built with Swift, SwiftUI. It allows users to journal their thoughts in a limited time span and a voice to text feature",
                image: "/quickthought.png",
                tags: ["Swift", "SwiftUI"],
                client: "Apple Academy 1st Project",
            },
            {
                id: 6,
                title: "MomoRun",
                description:
                    "A never ending running game, built with Swift, SwiftUI. It allows users to control the character to avoid obstacles using apple watch",
                image: "/momo.png",
                tags: ["Swift", "SwiftUI", 'CoreMotion'],
                client: "Apple Academy 2nd Project",
            },
            {
                id: 7,
                title: "Boco",
                description:
                    "A body composition tracker built with Swift and SwiftUI, enabling users to monitor their progress over time. Features include image-to-text extraction for easy data entry and seamless integration with Apple Health.",
                image: "/bocoo.png",
                tags: ["Swift", "SwiftUI", 'HealthKit'],
                client: "Apple Academy 3rd Project",
            }
        ],
    },
]

export default function PortfolioShowcase() {
    const [activeYear, setActiveYear] = useState(2025)
    const years = portfolioData.map((item) => item.year).sort((a, b) => a - b)

    useEffect(() => {
        const handleScroll = () => {
            const sections = portfolioData.map((item) => ({
                year: item.year,
                element: document.getElementById(`year-${item.year}`),
            }))

            const scrollPosition = window.scrollY + window.innerHeight / 2

            for (const section of sections) {
                if (section.element) {
                    const { offsetTop, offsetHeight } = section.element
                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        setActiveYear(section.year)
                        break
                    }
                }
            }
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const scrollToYear = (year: number) => {
        const element = document.getElementById(`year-${year}`)
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "center" })
        }
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold">Portfolio</h1>
                        <nav className="flex items-center gap-6">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                <span className="text-sm text-muted-foreground">Highlighting:</span>
                                <Badge variant="secondary" className="font-medium">
                                    {activeYear}
                                </Badge>
                            </div>
                        </nav>
                    </div>
                </div>
            </header>

            {/* Year Navigation */}
            <div className="sticky top-16 z-40 bg-background/90 backdrop-blur-sm border-b">
                <div className="container mx-auto px-4 py-3">
                    <div className="flex items-center gap-4 overflow-x-auto">
                        {years.map((year) => (
                            <Button
                                key={year}
                                variant={activeYear === year ? "default" : "ghost"}
                                size="sm"
                                onClick={() => scrollToYear(year)}
                                className="whitespace-nowrap"
                            >
                                {year}
                            </Button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Portfolio Content */}
            <main className="container mx-auto px-4 py-8">
                {portfolioData.sort((a, b) => b.year - a.year).map((yearData) => (
                    <section key={yearData.year} id={`year-${yearData.year}`} className="mb-16 scroll-mt-32">
                        <div className="flex items-center gap-4 mb-8">
                            <h2 className="text-4xl font-bold">{yearData.year}</h2>
                            <div className="h-px bg-border flex-1" />
                            <Badge variant="outline">
                                {yearData.projects.length} Project{yearData.projects.length !== 1 ? "s" : ""}
                            </Badge>
                        </div>

                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {yearData.projects.map((project) => (
                                <Card key={project.id} className="group hover:shadow-lg transition-all duration-300">
                                    <CardContent className="p-0">
                                        <div className="relative overflow-hidden rounded-t-lg">
                                            <Image
                                                src={project.image || "/placeholder.svg"}
                                                alt={project.title}
                                                width={400}
                                                height={300}
                                                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                                        </div>
                                        <div className="p-6">
                                            <div className="flex items-start justify-between mb-3">
                                                <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                                                    {project.title}
                                                </h3>
                                                {project.link && (
                                                    <Link href={project.link} target="_blank" className="text-sm text-muted-foreground">
                                                        <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                                                    </Link>
                                                )}
                                            </div>

                                            <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{project.description}</p>
                                            <div className="flex flex-wrap gap-2 mb-4">
                                                {project.tags.map((tag) => (
                                                    <Badge key={tag} variant="secondary" className="text-xs">
                                                        {tag}
                                                    </Badge>
                                                ))}
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-muted-foreground">{project.client}</span>
                                                <Link href={`/portfolio/${project.id}`}>
                                                    <Button size="sm" variant="ghost" className="group/btn">
                                                        View Details
                                                        <ChevronRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                                                    </Button>
                                                </Link>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </section>
                ))}
            </main>

        </div>
    )
}
