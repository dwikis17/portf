'use client'
import { Button } from "@/components/ui/button"
import { Github, Linkedin, BookOpen, FileUser, ChevronDown } from "lucide-react"
import { motion } from "motion/react"
import LeetcodeIcon from './leet-code'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

const socialLinks = [
    {
        icon: Github,
        href: "https://github.com/dwikis17",
        tooltip: "GitHub Profile"
    },
    {
        icon: Linkedin,
        href: "https://www.linkedin.com/in/dwiki-dwiki-97610b223/",
        tooltip: "LinkedIn Profile"
    },
    {
        icon: LeetcodeIcon,
        href: "https://leetcode.com/u/dwikis17/",
        tooltip: "LeetCode Profile"
    }
];

const today = new Date().getFullYear();

export default function HeroSection() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: 0.3,
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    const socialVariants = {
        hidden: { scale: 0 },
        visible: {
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 200,
                damping: 10
            }
        }
    };

    const scrollToPortfolio = () => {
        const portfolioElement = document.getElementById('year-2025');
        if (portfolioElement) {
            portfolioElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <div className="relative">
            <div className="grid grid-rows items-center justify-items-center min-h-screen font-[family-name:var(--font-inter)]">
                <section
                    id="hero-section"
                    className="container mx-auto px-6 py-12 flex flex-col items-center lg:flex-row lg:justify-between"
                >
                    <motion.div
                        className="lg:w-1/2 space-y-8"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <motion.h2
                            variants={itemVariants}
                            className="text-3xl font-black dark:text-white text-blue xs:text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-6xl text-left"
                        >
                            Hello, I&apos;m <span className="text-orange-400">Dwiki</span>
                            <br />
                            a long-life learner <span className="text-orange-400">Software Engineer</span>
                        </motion.h2>

                        <motion.p
                            variants={itemVariants}
                            className="xs:text-lg lg:text-xl xl:max-w-xl dark:text-gray-300 text-gray-500"
                        >
                            A software engineer who loves creating awesome web experiences with Next.js.
                        </motion.p>

                        <motion.div
                            variants={itemVariants}
                            className="flex gap-4 sm:flex-row flex-col"
                        >
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-full"
                            >
                                <Button
                                    variant="default"
                                    size="lg"
                                    className="w-full bg-blue-600 hover:bg-blue-700"
                                    onClick={() => window.open('https://drive.google.com/file/d/1zvgQ1ot-Rd67KBEfv2OXcrQx3wA5yjpA/view?usp=sharing')}
                                >
                                    Resume <FileUser />
                                </Button>
                            </motion.div>
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-full"
                            >
                                <Button variant="outline" size="lg" className="w-full" onClick={() => window.open('https://dev.to/dwikis17')}>
                                    Read Article <BookOpen />
                                </Button>
                            </motion.div>
                        </motion.div>

                        <motion.div
                            variants={itemVariants}
                            className="flex space-x-6 justify-center sm:justify-start"
                        >
                            <TooltipProvider>
                                {socialLinks.map((social, index) => (
                                    <Tooltip key={index}>
                                        <TooltipTrigger asChild>
                                            <motion.a
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                href={social.href}
                                                className="text-gray-400 hover:text-orange-400 transition-colors"
                                                variants={socialVariants}
                                                whileHover={{ scale: 1.2 }}
                                                whileTap={{ scale: 0.9 }}
                                            >
                                                <social.icon size={24} />
                                            </motion.a>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>{social.tooltip}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                ))}
                            </TooltipProvider>
                        </motion.div>
                    </motion.div>
                    {/* <div className="lg:w-1/2 mt-12 lg:mt-0">
                        <div className="relative">
                            <div className="absolute inset-20 bg-orange-400 rounded-full blur-2xl opacity-20"></div>
                            <Image
                                src={pp}
                                alt="Dwiki's profile"
                                className="relative z-10 rounded-full border-4 border-orange-400"
                                width={400}
                                height={400}
                            />
                        </div>
                    </div> */}
                </section>
            </div>

            {/* Portfolio Preview Section */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background to-transparent pb-8 pt-16"
            >
                <div className="container mx-auto px-6">
                    <motion.div
                        className="text-center mb-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5, duration: 0.6 }}
                    >
                        <h3 className="text-xl font-semibold mb-2 text-muted-foreground">
                            Explore My Work
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4">
                            Discover projects from {today} to 2024
                        </p>
                        <motion.button
                            onClick={scrollToPortfolio}
                            className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-500 transition-colors cursor-pointer"
                            whileHover={{ y: -2 }}
                            whileTap={{ y: 0 }}
                        >
                            <span className="text-sm font-medium">View Portfolio</span>
                            <motion.div
                                animate={{ y: [0, 4, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <ChevronDown size={16} />
                            </motion.div>
                        </motion.button>
                    </motion.div>

                </div>
            </motion.div>
        </div>
    )
}

