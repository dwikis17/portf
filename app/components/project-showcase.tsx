'use client'
import { ProjectCard } from "./project-card"
import { motion } from "motion/react"

const projects = [
    {
        title: "E-commerce Platform Sohnne",
        description:
            "A full-stack e-commerce solution with user authentication, product management, and payment paypal integration.",
        image: '/sohnne.jpg',
        technologies: ["React", "Next.js", "Supabase", "Elysia.js", 'Tailwind',],
        githubLink: "",
        liveLink: "https://sohnne.eu",
    },
    {
        title: "iOS Valorant App",
        description:
            "A Swift UIKit mobile app built programmatically using collection views, scroll views, and tables, with data fetched via API calls.",
        image: '/ios.jpg',
        technologies: ["Swift", "SwiftUI"],
        githubLink: "https://github.com/dwikis17/valorant-app-swift",
        liveLink: "",
    },

]

export function ProjectShowcase() {
    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const cardVariants = {
        hidden: {
            opacity: 0,
            y: 50
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    return (
        <section id="projects" className="py-16 rounded-xl ">
            <div className="container mx-auto px-4">
                <motion.h2
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="text-3xl font-black text-[#6BD968] xs:text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-6xl text-center m-3"
                >
                    My Projects
                </motion.h2>
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch"
                >
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            variants={cardVariants}

                        >
                            <ProjectCard {...project} />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}

