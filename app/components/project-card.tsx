'use client'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Github, ExternalLink } from "lucide-react"
import Image from "next/image"


interface ProjectCardProps {
    title: string
    description: string
    image: any
    technologies: string[]
    githubLink?: string
    liveLink: string
}




export function ProjectCard({ title, description, image, technologies, githubLink, liveLink }: ProjectCardProps) {
    return (
        <Card className="overflow-hidden border-0 h-full">
            <div className="relative" style={{ height: "300px", width: "100%" }}>
                <Image src={image} alt={title} fill style={{ objectFit: "cover" }} />
            </div>

            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-wrap gap-2">
                    {technologies.map((tech, index) => (
                        <Badge key={index} variant="secondary">
                            {tech}
                        </Badge>
                    ))}
                </div>
            </CardContent>
            <CardFooter className="flex justify-between">
                {githubLink !== '' && <Button variant="outline" size="sm" asChild>
                    <a href={githubLink} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2 h-4 w-4" />
                        GitHub
                    </a>
                </Button>}
                <Button size="sm" asChild>
                    {liveLink !== '' && <a href={liveLink} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Live Demo
                    </a>}
                </Button>
            </CardFooter>
        </Card>
    )
}

