"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ChevronLeft, ChevronRight, ExternalLink, Calendar, User, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

const projectDetails = {
    1: {
        title: "E-commerce Platform Sohnne",
        client: "Sohnne",
        year: 2024,
        duration: "6 months",
        tags: ["UI/UX", "React", "TypeScript", "Supabase", "Elysia.js", "Tailwind"],
        results: null,
        description:
            "A full-stack e-commerce solution with user authentication, product management, and payment PayPal integration.",
        challenge:
            "The existing platform had a high bounce rate and low conversion rates. Users were struggling with navigation and the checkout process was overly complex. The platform was not responsive and did not have a good user experience.",
        solution:
            "We implemented a user-centered design approach, simplified the navigation structure, and streamlined the checkout process to reduce cart abandonment. We also implemented a responsive design and a good user experience.",
        images: [
            "/sohnne.jpg",
            "/sohnne.jpg",
        ],
        myRole: "I served as the full-stack engineer.",
        keyContributions: [
            "Implemented a responsive design and a good user experience.",
            "Zapier automation notification workflow, reducing manual work and increasing efficiency.",
            "Simplified the navigation structure and the checkout process to reduce cart abandonment.",
        ],
        sections: [
            { id: "overview", title: "Project Overview" },
            { id: "challenge", title: "The Challenge" },
            { id: "solution", title: "Our Solution" },
            { id: "gallery", title: "Image Gallery" },
        ],
    },
    2: {
        title: "iOS Valorant App",
        client: "Valorant",
        year: 2024,
        duration: "1 month",
        tags: ["Swift", "SwiftUI", "UIKit"],
        description:
            "A Swift UIKit mobile app built programmatically using collection views, scroll views, and tables, with data fetched via API calls. This is for my learning purpose.",
        challenge:
            "Creating a native iOS app that provides real-time Valorant game data and statistics while maintaining smooth performance and intuitive navigation. The app needed to handle complex data structures from the Valorant API and present them in an engaging way for mobile users.",
        solution:
            "Developed a native iOS application using Swift and UIKit with programmatic UI implementation. Implemented collection views for dynamic content display, scroll views for smooth navigation, and table views for organized data presentation. Integrated RESTful API calls to fetch real-time game data and implemented efficient data caching for optimal performance.",
        results:
            "Successfully delivered a performant iOS app that provides Valorant players with easy access to game statistics and information. The app features smooth animations, responsive design, and efficient data loading, enhancing the gaming experience for Valorant enthusiasts.",
        images: [


        ],
        sections: [
            { id: "overview", title: "Project Overview" },
            { id: "challenge", title: "The Challenge" },
            { id: "solution", title: "Our Solution" },
        ],
    },
    3: {
        title: "Findect",
        client: "Apple Academy 4th Project",
        year: 2025,
        duration: "1 month",
        tags: [
            "Node.js", "Express", "TypeScript", "Prisma",
            "FastAPI", "Python", "PostgreSQL", "Pinecone",
            "OpenAI GPT-4o-mini", "Swift", "SwiftUI", "JWT"
        ],
        description:
            "Findect is a matchmaking app for professional networking events. Unlike random pairing tools, it uses semantic search and LLM reasoning to recommend the top three most compatible attendees for each participant — complete with natural-language explanations of why those matches make sense.",
        challenge:
            "We spoke to many digital nomads and community companies in Bali to understand their needs and pain points. We stumbled upon Tyrone Williams who was a CEO and had the ability to match people who had problems and he would pair them up with people who could solve those problems. That was his whole business model. We also interviewed other companies who did the same thing, so we thought, \"why don't we leverage this with technology and tap into this market?\" Let's do it!",
        solution:
            "We built Findect, an iOS app that intelligently matches attendees based on their goals, professions, and interests. Our architecture combines a Node.js REST API for event and attendee management with a Python FastAPI service for AI-powered reasoning and vector search.",
        systemArchitecture: "/findect-be.png",
        myRole: "I served as the ios engineer, responsible for the entire iOS app. including app architecture, design, and implementation.",
        keyContributions: [
            "Designed and implemented the iOS app architecture, design, and implementation.",
            "Built and deployed the iOS app to handle AI endpoints and communicate securely with the Node.js backend",
        ],
        aiPipeline: [
            {
                step: "Attendee data ingestion",
                description: "The Node.js backend sends structured attendee data to the FastAPI service via secure API calls."
            },
            {
                step: "Semantic embedding",
                description: "FastAPI preprocesses and embeds attendee text fields, storing them in Pinecone."
            },
            {
                step: "Candidate retrieval",
                description: "For each user, Pinecone retrieves the top-10 similar attendees in the same event namespace."
            },
            {
                step: "Reranking and reasoning",
                description: "The FastAPI service uses GPT-4o-mini to rerank and generate context-aware reasoning for the top-3 matches."
            },
            {
                step: "Response delivery",
                description: "Node.js receives the final list with reasoning and forwards it to the iOS frontend."
            }
        ],
        technicalHighlights: [
            "Node.js + Express API: User authentication, CRUD operations, event management",
            "Prisma ORM: Type-safe PostgreSQL access and migrations",
            "FastAPI (Python): AI processing and RAG orchestration",
            "Pinecone Vector DB: Semantic similarity search for embeddings",
            "OpenAI GPT-4o-mini: Natural-language reasoning for recommendations",
            "JWT Authentication: Secure communication between clients and backend services",
            "Hosting: Node.js API hosted on VPS, PostgreSQL hosted on Supabase, FastAPI hosted on VPS, Pinecone for vector search"
        ],
        challengesLearnings: "One challenge was ensuring that LLM-based reasoning matched real human intuition rather than superficial textual similarity. To solve this:\n\n• Engineered prompt templates that contextualized professional and personal alignment\n• Tuned retrieval hyperparameters for better diversity among top candidates\n• Added double filtering to prevent self-matches and redundant recommendations\n\nThis project gave me deep experience in multi-service orchestration, semantic retrieval, and LLM-powered backend design.",
        futureImprovements: [
            "Add automated testing for both Node.js and FastAPI services",
            "Implement GitHub Actions for CI/CD and coverage tracking",
            "Introduce reranking models (e.g., cross-encoder or fine-tuned BERT) for higher precision",
            "Deploy load balancing between AI endpoints for production scaling"
        ],
        techStack: {
            backend: "Node.js, Express, TypeScript, Prisma, FastAPI, Python",
            databases: "PostgreSQL (Supabase), Pinecone (Vector DB)",
            ai: "OpenAI GPT-4o-mini",
            frontend: "iOS (Swift)",
            authentication: "JWT",
            hosting: "VPS (APIs), Supabase (SQL), Pinecone (Semantic Search)"
        },
        team: [
            "FASTAPI backend and AI/Vector logic",
            "Node.js backend (API + SQL)",
            "iOS frontend (me)"
        ],
        designers: [
            "UI",
            "UX",
            "Visual identity"
        ],
        results:
            "We showcased our work during an exhibition and got to use our app live at the event itself. People were able to be referred to other people at the event and formed new connections.",
        images: [
            "/findect1.png",
            "/findect2.png",
            "/findect5.png",
            "/findect6.png",
            "/findect7.JPG",
            "/findect8.JPG",
        ],
        sections: [
            { id: "overview", title: "Project Overview" },
            { id: "challenge", title: "The Challenge" },
            { id: "solution", title: "Our Solution" },
            { id: "architecture", title: "System Architecture" },
            { id: "role", title: "My Role" },
            { id: "pipeline", title: "AI Matching Pipeline" },
            { id: "dataflow", title: "Data Flow" },
            { id: "technical", title: "Technical Highlights" },
            { id: "learnings", title: "Challenges & Learnings" },
            { id: "future", title: "Future Improvements" },
            { id: "tech-stack", title: "Tech Stack" },
            { id: "team", title: "Team" },
        ],
        link: "https://github.com/RafieAmandio/CH-4",
    },
    4: {
        title: "SNKI Quotation System",
        client: "SNKI",
        year: 2025,
        duration: "3 months",
        tags: ["Nextjs", "Tailwind", "TypeScript", "Shadcn/UI"],
        description:
            "A quotation system for SNKI, built with Nextjs, Tailwind, and TypeScript. It allows users to manage their quotations, invoices, payments, and track their orders.",
        challenge:
            "SNKI needed a comprehensive business management system to streamline their quotation and invoicing processes. The existing manual system was time-consuming, error-prone, and lacked proper tracking capabilities. The system needed to handle complex business logic while maintaining a user-friendly interface.",
        solution:
            "Built a modern web application using Next.js 14 with TypeScript for type safety and better development experience. Implemented a responsive design using Tailwind CSS and Shadcn/UI components for a professional look. Created a comprehensive dashboard for managing quotations, generating invoices, tracking payments, and monitoring order status. Integrated secure authentication and role-based access control.",
        results:
            "The system significantly improved SNKI's operational efficiency by automating quotation generation and invoice management. Reduced processing time by 70% and eliminated manual errors. The platform is now live and actively used by the SNKI team for daily operations.",
        images: [
            "/snki.jpeg",
        ],
        sections: [
            { id: "overview", title: "Project Overview" },
            { id: "challenge", title: "The Challenge" },
            { id: "solution", title: "Our Solution" },
        ],
        link: "https://snki-quotation-fe-dev.vercel.app/login",
    },
    5: {
        title: "Quickthought",
        client: "Apple Academy 1st Project",
        year: 2025,
        duration: "1 month",
        tags: ["Swift", "SwiftUI"],
        description:
            "A speed journaling app, built with Swift, SwiftUI. It allows users to journal their thoughts in a limited time span and a voice to text feature.",
        challenge:
            "Creating an engaging journaling experience that encourages users to write regularly by gamifying the process. The app needed to balance simplicity with functionality, providing a quick and intuitive way to capture thoughts while maintaining user engagement through time-based challenges.",
        solution:
            "Developed a SwiftUI-based iOS app that implements time-limited journaling sessions to create urgency and engagement. Integrated voice-to-text functionality for hands-free journaling. Implemented a clean, minimalist interface that focuses on the writing experience. Added progress tracking and achievement system to motivate consistent usage.",
        images: [
            "/quickthought.png",
        ],
        sections: [
            { id: "overview", title: "Project Overview" },
            { id: "challenge", title: "The Challenge" },
            { id: "solution", title: "Our Solution" },
        ],
    },
    6: {
        title: "MomoRun",
        client: "Apple Academy 2nd Project",
        year: 2025,
        duration: "1 month",
        tags: ["Swift", "SwiftUI", "CoreMotion"],
        description:
            "A never ending running game, built with Swift, SwiftUI. It allows users to control the character to avoid obstacles using apple watch.",
        challenge:
            "Creating an engaging endless runner game that leverages Apple Watch integration for unique gameplay mechanics. The challenge was to design intuitive controls that work seamlessly between iPhone and Apple Watch while maintaining smooth gameplay and engaging progression systems. and also we wanted to make the game to be isometric view so its like 3d",
        solution:
            `iOS Game with Apple Watch
Built a cross-platform iOS game using SwiftUI and CoreMotion that connects to Apple Watch. Created gesture controls on the watch to move characters and avoid obstacles. The game is an endless runner with randomly generated obstacles that get harder over time.
Added health tracking through HealthKit to encourage users to stay active. Built a system to place game blocks correctly for the isometric 3D view. Set up HealthKit sessions to keep the Apple Watch connected throughout gameplay.
The game works smoothly across iPhone and Apple Watch, with real-time motion controls and health data tracking. Used procedural generation for obstacles and created custom positioning calculations for the 3D game world.`,
        results:
            "Successfully delivered an innovative gaming experience that bridges iPhone and Apple Watch. The game encourages physical activity while providing entertainment, making it a unique fitness-gaming hybrid. The seamless cross-device integration received positive user feedback.",
        images: [
            "/momo.png",
            "/move.png",
            "/momo2.png",
            "/move2.png",
            "/move3.png",
            "/move4.png",
        ],
        sections: [
            { id: "overview", title: "Project Overview" },
            { id: "challenge", title: "The Challenge" },
            { id: "solution", title: "Our Solution" },
            { id: "gallery", title: "Image Gallery" },
        ],
    },
    7: {
        title: "Boco",
        client: "Apple Academy 3rd Project",
        year: 2025,
        duration: "1 month",
        tags: ["Swift", "SwiftUI", "HealthKit", 'LLama3'],
        description:
            "A body composition tracker built with Swift and SwiftUI, enabling users to monitor their progress over time. Features include image-to-text extraction for easy data entry and seamless integration with Apple Health.",
        challenge:
            "Creating a comprehensive health tracking app that simplifies the process of monitoring body composition data. The challenge was to make data entry effortless while providing meaningful insights and maintaining privacy standards required for health applications.",
        solution:
            "Built a SwiftUI-based iOS app with HealthKit integration for secure health data management. Implemented image-to-text extraction using Vision framework for easy data entry from photos. Created intuitive data visualization and progress tracking features. Ensured compliance with Apple's health data privacy guidelines while providing comprehensive analytics.",
        results:
            "Delivered a user-friendly health tracking application that makes body composition monitoring accessible and engaging. The image-to-text feature significantly reduces data entry friction, while HealthKit integration ensures data security and seamless health ecosystem integration.",
        images: [
            "/bocoo.png",
        ],
        sections: [
            { id: "overview", title: "Project Overview" },
            { id: "challenge", title: "The Challenge" },
            { id: "solution", title: "Our Solution" },
            { id: "gallery", title: "Image Gallery" },
        ],
    },
}

export default function PortfolioDetail() {
    const params = useParams()
    const projectId = params.id as string
    const project = projectDetails[Number(projectId) as keyof typeof projectDetails]

    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const [activeSection, setActiveSection] = useState("overview")

    useEffect(() => {
        const handleScroll = () => {
            if (!project) return

            const sections = project.sections.map((section) => ({
                id: section.id,
                element: document.getElementById(section.id),
            }))

            const scrollPosition = window.scrollY + 200

            for (const section of sections) {
                if (section.element) {
                    const { offsetTop, offsetHeight } = section.element
                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        setActiveSection(section.id)
                        break
                    }
                }
            }
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [project])

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId)
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" })
        }
    }

    const nextImage = () => {
        if (project) {
            setCurrentImageIndex((prev) => (prev + 1) % project.images.length)
        }
    }

    const prevImage = () => {
        if (project) {
            setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length)
        }
    }

    if (!project) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Project Not Found</h1>
                    <Link href="/">
                        <Button>
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Portfolio
                        </Button>
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <Link href="/">
                            <Button variant="ghost" size="sm">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back to Portfolio
                            </Button>
                        </Link>
                        <div className="flex items-center gap-4">
                            <Badge variant="secondary">{project.year}</Badge>
                            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                            {(project as any).link && (
                                <Button size="sm" variant="outline" asChild>
                                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                                    <a href={(project as any).link} target="_blank" rel="noopener noreferrer">
                                        <ExternalLink className="w-4 h-4 mr-2" />
                                        Live Demo
                                    </a>
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-4 py-8">
                <div className="grid lg:grid-cols-4 gap-8">
                    {/* Sticky Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 space-y-6">
                            <Card>
                                <CardContent className="p-6">
                                    <h3 className="font-semibold mb-4">Project Info</h3>
                                    <div className="space-y-3 text-sm">
                                        <div className="flex items-center gap-2">
                                            <User className="w-4 h-4 text-muted-foreground" />
                                            <span className="text-muted-foreground">Client:</span>
                                            <span className="font-medium">{project.client}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4 text-muted-foreground" />
                                            <span className="text-muted-foreground">Duration:</span>
                                            <span className="font-medium">{project.duration}</span>
                                        </div>
                                    </div>
                                    <Separator className="my-4" />
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 mb-3">
                                            <Tag className="w-4 h-4 text-muted-foreground" />
                                            <span className="text-sm font-medium">Technologies</span>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {project.tags.map((tag) => (
                                                <Badge key={tag} variant="secondary" className="text-xs">
                                                    {tag}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent className="p-6">
                                    <h3 className="font-semibold mb-4">Table of Contents</h3>
                                    <nav className="space-y-2">
                                        {project.sections.map((section) => (
                                            <button
                                                key={section.id}
                                                onClick={() => scrollToSection(section.id)}
                                                className={`block w-full text-left text-sm py-2 px-3 rounded-md transition-colors ${activeSection === section.id
                                                    ? "bg-primary text-primary-foreground"
                                                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                                                    }`}
                                            >
                                                {section.title}
                                            </button>
                                        ))}
                                    </nav>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3 space-y-12">
                        {/* Project Overview */}
                        <section id="overview" className="scroll-mt-24">
                            <div className="space-y-6">
                                <div>
                                    <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
                                    <p className="text-xl text-muted-foreground leading-relaxed">{project.description}</p>
                                </div>

                                {/* Image Carousel */}
                                <div className="relative">
                                    <div className="relative aspect-video rounded-lg overflow-hidden mb-4">
                                        <Image
                                            src={project.images[currentImageIndex] || "/placeholder.svg"}
                                            alt={`${project.title} - Image ${currentImageIndex + 1}`}
                                            fill
                                            className="object-cover"
                                        />
                                        <div className="absolute inset-0 flex items-center justify-between p-4">
                                            <Button
                                                variant="secondary"
                                                size="icon"
                                                onClick={prevImage}
                                                className="bg-background/80 backdrop-blur-sm"
                                            >
                                                <ChevronLeft className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                variant="secondary"
                                                size="icon"
                                                onClick={nextImage}
                                                className="bg-background/80 backdrop-blur-sm"
                                            >
                                                <ChevronRight className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>

                                    {/* Thumbnail Navigation */}
                                    <div className="flex gap-2 overflow-x-auto pb-2">
                                        {project.images.map((image, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setCurrentImageIndex(index)}
                                                className={`relative flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 transition-colors ${currentImageIndex === index ? "border-primary" : "border-transparent"
                                                    }`}
                                            >
                                                <Image
                                                    src={image || "/placeholder.svg"}
                                                    alt={`Thumbnail ${index + 1}`}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Challenge */}
                        <section id="challenge" className="scroll-mt-24">
                            <h2 className="text-3xl font-bold mb-6">The Challenge</h2>
                            <div className="prose prose-lg max-w-none">
                                <p className="text-muted-foreground leading-relaxed">{project.challenge}</p>
                            </div>
                        </section>

                        {/* Solution */}
                        <section id="solution" className="scroll-mt-24">
                            <h2 className="text-3xl font-bold mb-6">Our Solution</h2>
                            <div className="prose prose-lg max-w-none">
                                <p className="text-muted-foreground leading-relaxed">{project.solution}</p>
                            </div>
                        </section>

                        {/* System Architecture */}
                        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                        {(project as any).systemArchitecture && (
                            <section id="architecture" className="scroll-mt-24">
                                <h2 className="text-3xl font-bold mb-6">System Architecture</h2>
                                <div className="relative w-full rounded-lg overflow-hidden bg-muted/50 p-4">
                                    {/* eslint-disable @typescript-eslint/no-explicit-any */}
                                    <Image
                                        src={(project as any).systemArchitecture}
                                        alt="System Architecture Diagram"
                                        width={1200}
                                        height={800}
                                        className="w-full h-auto object-contain"
                                    />
                                    {/* eslint-enable @typescript-eslint/no-explicit-any */}
                                </div>
                            </section>
                        )}

                        {/* My Role */}
                        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                        {(project as any).myRole && (
                            <section id="role" className="scroll-mt-24">
                                <h2 className="text-3xl font-bold mb-6">My Role</h2>
                                <div className="prose prose-lg max-w-none">
                                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                                    <p className="text-muted-foreground leading-relaxed mb-6">{(project as any).myRole}</p>
                                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                                    {(project as any).keyContributions && (
                                        <div className="space-y-3">
                                            <h3 className="text-xl font-semibold mb-4">Key Contributions</h3>
                                            <ul className="space-y-2">
                                                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                                                {(project as any).keyContributions.map((contribution: string, index: number) => (
                                                    <li key={index} className="flex items-start gap-3">
                                                        <span className="text-primary mt-1">•</span>
                                                        <span className="text-muted-foreground leading-relaxed">{contribution}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </section>
                        )}

                        {/* AI Matching Pipeline */}
                        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                        {(project as any).aiPipeline && (
                            <section id="pipeline" className="scroll-mt-24">
                                <h2 className="text-3xl font-bold mb-6">AI Matching Pipeline</h2>
                                <div className="space-y-4">
                                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                                    {(project as any).aiPipeline.map((step: any, index: number) => (
                                        <Card key={index}>
                                            <CardContent className="p-6">
                                                <div className="flex gap-4">
                                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                                                        {index + 1}
                                                    </div>
                                                    <div>
                                                        <h3 className="font-semibold mb-2">{step.step}</h3>
                                                        <p className="text-sm text-muted-foreground">{step.description}</p>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Data Flow */}
                        {projectId === "3" && (
                            <section id="dataflow" className="scroll-mt-24">
                                <h2 className="text-3xl font-bold mb-6">iOS Architecture (Clean Architecture)</h2>
                                <div className="space-y-6">

                                    <div>
                                        <h3 className="text-xl font-semibold mb-4">Step-by-Step Flow Example:</h3>
                                        <div className="space-y-3">
                                            {[
                                                { step: 1, action: "User searches for a movie", component: "HomeView" },
                                                { step: 2, action: "View calls ViewModel", component: "HomeViewModel.searchMovies()" },
                                                { step: 3, action: "ViewModel calls Use Case", component: "MoviesUseCases.searchMoviesByTitle()" },
                                                { step: 4, action: "Use Case calls Repository", component: "MoviesRepository.searchMovies()" },
                                                { step: 5, action: "Repository calls API Service", component: "APIService.searchMovies()" },
                                                { step: 6, action: "API returns DTOs", component: "[MovieDTO]" },
                                                { step: 7, action: "Use Case transforms to Entities", component: "[MovieEntity]" },
                                                { step: 8, action: "ViewModel updates UI state", component: "@Published var movies" },
                                                { step: 9, action: "View automatically updates", component: "SwiftUI reactive updates" }
                                            ].map((item) => (
                                                <Card key={item.step}>
                                                    <CardContent className="p-4">
                                                        <div className="flex gap-4">
                                                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                                                                {item.step}
                                                            </div>
                                                            <div className="flex-1">
                                                                <div className="flex items-center gap-2 flex-wrap">
                                                                    <span className="text-sm font-medium">{item.action}</span>
                                                                    <span className="text-muted-foreground">→</span>
                                                                    <code className="bg-muted px-2 py-1 rounded text-xs font-mono">
                                                                        {item.component}
                                                                    </code>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </section>
                        )}

                        {/* Technical Highlights */}
                        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                        {(project as any).technicalHighlights && (
                            <section id="technical" className="scroll-mt-24">
                                <h2 className="text-3xl font-bold mb-6">Technical Highlights</h2>
                                <ul className="space-y-3">
                                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                                    {(project as any).technicalHighlights.map((highlight: string, index: number) => (
                                        <li key={index} className="flex items-start gap-3">
                                            <span className="text-primary mt-1">•</span>
                                            <span className="text-muted-foreground leading-relaxed">{highlight}</span>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        )}

                        {/* Challenges & Learnings */}
                        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                        {(project as any).challengesLearnings && (
                            <section id="learnings" className="scroll-mt-24">
                                <h2 className="text-3xl font-bold mb-6">Challenges & Learnings</h2>
                                <div className="prose prose-lg max-w-none">
                                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                                    <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{(project as any).challengesLearnings}</p>
                                </div>
                            </section>
                        )}

                        {/* Future Improvements */}
                        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                        {(project as any).futureImprovements && (
                            <section id="future" className="scroll-mt-24">
                                <h2 className="text-3xl font-bold mb-6">Future Improvements</h2>
                                <ul className="space-y-3">
                                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                                    {(project as any).futureImprovements.map((improvement: string, index: number) => (
                                        <li key={index} className="flex items-start gap-3">
                                            <span className="text-primary mt-1">•</span>
                                            <span className="text-muted-foreground leading-relaxed">{improvement}</span>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        )}

                        {/* Tech Stack */}
                        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                        {(project as any).techStack && (
                            <section id="tech-stack" className="scroll-mt-24">
                                <h2 className="text-3xl font-bold mb-6">Tech Stack</h2>
                                <div className="grid gap-4 md:grid-cols-2">
                                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                                    {Object.entries((project as any).techStack).map(([key, value]) => (
                                        <Card key={key}>
                                            <CardContent className="p-6">
                                                <h3 className="font-semibold mb-2 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</h3>
                                                <p className="text-sm text-muted-foreground">{value as string}</p>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Team */}
                        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                        {(project as any).team && (
                            <section id="team" className="scroll-mt-24">
                                <h2 className="text-3xl font-bold mb-6">Team</h2>
                                <div className="space-y-3">
                                    <p className="text-muted-foreground mb-4">3 Developers:</p>
                                    <ul className="space-y-2 ml-4">
                                        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                                        {(project as any).team.map((member: string, index: number) => (
                                            <li key={index} className="flex items-start gap-3">
                                                <span className="text-primary mt-1">•</span>
                                                <span className="text-muted-foreground leading-relaxed">{member}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                                    {(project as any).designers && (
                                        <>
                                            <p className="text-muted-foreground mb-4 mt-6">All 3 designers are responsible for:</p>
                                            <ul className="space-y-2 ml-4">
                                                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                                                {(project as any).designers.map((designer: string, index: number) => (
                                                    <li key={index} className="flex items-start gap-3">
                                                        <span className="text-primary mt-1">•</span>
                                                        <span className="text-muted-foreground leading-relaxed">{designer}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </>
                                    )}
                                </div>
                            </section>
                        )}

                    </div>
                </div>
            </div>
        </div>
    )
}