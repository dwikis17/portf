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
        tags: ["UI/UX", "React", "TypeScript", "Supabase", "Elysia.js", 'Tailwind',],
        description:
            "A full-stack e-commerce solution with user authentication, product management, and payment paypal integration.",
        challenge:
            "The existing platform had a high bounce rate and low conversion rates. Users were struggling with navigation and the checkout process was overly complex. The platform was not responsive and did not have a good user experience. The platform was not responsive and did not have a good user experience.",
        solution:
            "We implemented a user-centered design approach, simplified the navigation structure, and streamlined the checkout process to reduce cart abandonment. We also implemented a responsive design and a good user experience.",
        results:
            "Achieved a 40% increase in conversion rates and 25% reduction in bounce rate within the first quarter after launch. The platform was a success and was used by many users. ",
        images: [
            "/sohnne.jpg",
            "/sohnne.jpg",
        ],
        sections: [
            { id: "overview", title: "Project Overview" },
            { id: "challenge", title: "The Challenge" },
            { id: "solution", title: "Our Solution" },
            { id: "process", title: "Design Process" },
            { id: "results", title: "Results & Impact" },
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
                            <Button size="sm" variant="outline">
                                <ExternalLink className="w-4 h-4 mr-2" />
                                Live Demo
                            </Button>
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
                        <section id="process" className="scroll-mt-24">
                            <h2 className="text-3xl font-bold mb-6">Design Process</h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                <Card>
                                    <CardContent className="p-6">
                                        <h3 className="font-semibold mb-3">Research & Discovery</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Conducted user interviews and analyzed existing user behavior to identify pain points and
                                            opportunities.
                                        </p>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardContent className="p-6">
                                        <h3 className="font-semibold mb-3">Wireframing & Prototyping</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Created low-fidelity wireframes and interactive prototypes to test user flows and validate
                                            concepts.
                                        </p>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardContent className="p-6">
                                        <h3 className="font-semibold mb-3">Visual Design</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Developed a cohesive visual language that aligns with brand guidelines and enhances user
                                            experience.
                                        </p>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardContent className="p-6">
                                        <h3 className="font-semibold mb-3">Testing & Iteration</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Conducted usability testing sessions and iterated on the design based on user feedback and
                                            analytics.
                                        </p>
                                    </CardContent>
                                </Card>
                            </div>
                        </section>

                        {/* Results */}
                        <section id="results" className="scroll-mt-24">
                            <h2 className="text-3xl font-bold mb-6">Results & Impact</h2>
                            <div className="prose prose-lg max-w-none">
                                <p className="text-muted-foreground leading-relaxed mb-6">{project.results}</p>
                                <div className="grid md:grid-cols-3 gap-6">
                                    <Card>
                                        <CardContent className="p-6 text-center">
                                            <div className="text-3xl font-bold text-primary mb-2">40%</div>
                                            <div className="text-sm text-muted-foreground">Increase in Conversion Rate</div>
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardContent className="p-6 text-center">
                                            <div className="text-3xl font-bold text-primary mb-2">25%</div>
                                            <div className="text-sm text-muted-foreground">Reduction in Bounce Rate</div>
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardContent className="p-6 text-center">
                                            <div className="text-3xl font-bold text-primary mb-2">60%</div>
                                            <div className="text-sm text-muted-foreground">Faster Checkout Process</div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>
                        </section>

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
