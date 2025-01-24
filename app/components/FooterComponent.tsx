export const Footer = () => {
    return (
        <footer id="footer" className="bg-[rgb(19, 19, 19)] py-12 w-screen">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="text-center md:text-left mb-8 md:mb-0">
                        <h3 className="text-xl font-bold text-orange-500 mb-2">Dwiki</h3>
                        <p className="text-gray-400">Based in Jakarta</p>
                    </div>
                    <div className="flex space-x-6 text-gray-400">
                        <a href="#" className="hover:text-orange-500 transition-colors">
                            <i className="fa-brands fa-github text-xl"></i>
                        </a>
                        <a href="#" className="hover:text-orange-500 transition-colors">
                            <i className="fa-brands fa-linkedin text-xl"></i>
                        </a>
                        <a href="#" className="hover:text-orange-500 transition-colors">
                            <i className="fa-brands fa-twitter text-xl"></i>
                        </a>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-500">
                    <p>&copy; 2025 Dwiki. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}