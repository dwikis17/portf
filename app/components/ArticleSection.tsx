import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'

export const ArticleSection = () => {
    return (
        <section className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-bold dark:text-white mb-4">Latest Articles</h2>
                <div className="w-20 h-1 bg-indigo-500 mx-auto"></div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                <Card className='dark:dark'>
                    <div className="relative h-64 rounded-t-lg">
                        <Image className="w-full h-full  fill rounded-t-lg" fill style={{ objectFit: "cover", objectPosition: 'center 70%' }} src="https://storage.googleapis.com/uxpilot-auth.appspot.com/4e6b9b5d43-875afa146b07e2ec8a7a.png" alt="minimal modern workspace with laptop and coffee cup, dark moody lighting, professional photography" />
                        <div className="absolute top-4 left-4">
                            <Badge variant='secondary' >Design</Badge>
                            {/* <span className="bg-indigo-500 text-white text-sm px-3 py-1 rounded-full">Design</span> */}
                        </div>
                    </div>

                    <CardHeader>
                        <CardDescription>Jan, 24 2025</CardDescription>
                        <CardTitle className='text-xl font-semibold dark:text-white mb-3'>The Future of UI Design: Trends to Watch in 2025</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="dark:text-gray-400 text-black mb-4">Exploring the core principles of minimalist design and how to apply them effectively in modern web development.</p>

                    </CardContent>
                    <CardFooter>
                        <p>5 min read</p>
                    </CardFooter>
                </Card>
                <Card className='dark:dark'>
                    <CardHeader>
                        <CardDescription>Jan, 24 2025</CardDescription>
                        <CardTitle className='text-xl font-semibold dark:text-white text-black mb-3'>The Future of UI Design: Trends to Watch in 2025</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="dark:text-gray-400 text-black mb-4">Exploring the core principles of minimalist design and how to apply them effectively in modern web development.</p>

                    </CardContent>
                    <CardFooter>
                        <p>5 min read</p>
                    </CardFooter>
                </Card>
                <Card className='dark:dark'>
                    <CardHeader>
                        <CardDescription>Jan, 24 2025</CardDescription>
                        <CardTitle className='text-xl font-semibold dark:text-white text-black mb-3'>The Future of UI Design: Trends to Watch in 2025</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="dark:text-gray-400 text-black mb-4">Exploring the core principles of minimalist design and how to apply them effectively in modern web development.</p>

                    </CardContent>
                    <CardFooter>
                        <p>5 min read</p>
                    </CardFooter>
                </Card>
            </div>
        </section>
    )
}