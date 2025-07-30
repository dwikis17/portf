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
    4: {
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
    5: {
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
    6: {
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
                            {(project as any).link && (
                                <Button size="sm" variant="outline" asChild>
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

                                {/* Hero Image */}
                                <div className="relative aspect-video rounded-lg overflow-hidden">
                                    <Image
                                        src={project.images[0] || "/placeholder.svg"}
                                        alt={project.title}
                                        fill
                                        className="object-cover"
                                    />
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

                        {/* Design Process */}


                        {/* Image Gallery */}
                        <section id="gallery" className="scroll-mt-24">
                            <h2 className="text-3xl font-bold mb-6">Image Gallery</h2>

                            {/* Carousel */}
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
                        </section>
                    </div>
                </div>
            </div>
        </div>
    )
}
