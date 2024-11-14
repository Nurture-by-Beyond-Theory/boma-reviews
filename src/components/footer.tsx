import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

function Footer() {
  return (
    <div>
        <footer style={{backgroundColor: "#f0f0f0 !important"}} className=" tertiary py-32 md:px-24 mt-auto">
            <div className="container mx-auto text-center lg:text-left">
                {/* Grid layout with responsive column settings */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
                
                    {/* Section 1 */}
                    <div className="lg:col-span-2 flex lg:items-start items-center text-left flex-col gap-2 translate-y-[-20px]">
                        <div className="relative min-h-16 min-w-48">
                            <Image
                                src="/images/logo.png"
                                layout="fill"
                                alt="Logo"
                                objectFit='contain'
                            />
                        </div>
                        <p className="text-sm">
                          © 2024
                        </p>
                        <p className="text-sm">
                            privacy - terms
                        </p>
                    </div>

                    {/* Section 2 */}
                    <div className="lg:col-span-1">
                        <h2 className="text-sm font-semibold mb-4">Features</h2>
                        <div className="flex flex-col space-y-2 text-xs">
                                <Link href="./about">
                                    <div className="hover:translate-y-[-3px] duration-300 transform leading-normal transition-transform">
                                        Read reviews
                                    </div>
                                </Link> 
                                <Link href="./about">
                                    <div className="hover:translate-y-[-3px] duration-300 transform leading-normal transition-transform">
                                        Submit reviews
                                    </div>
                                </Link> 
                                <Link href="./about">
                                    <div className="hover:translate-y-[-3px] duration-300 transform leading-normal transition-transform">
                                        Apartment ratings
                                    </div>
                                </Link> 
                        </div>
                    </div>

                    {/* Section 3 */}
                    <div className="lg:col-span-1">
                        <h2 className="text-sm font-semibold mb-4">Resources</h2>
                        <div className="flex flex-col space-y-2 text-xs">
                                <Link href="./companies">
                                    <div className="hover:translate-y-[-3px] duration-300 transform leading-normal transition-transform">
                                        For companies
                                    </div>
                                </Link> 
                                <Link href="./advertising">
                                    <div className="hover:translate-y-[-3px] duration-300 transform leading-normal transition-transform">
                                        Advertising
                                    </div>
                                </Link> 
                                <Link href="./careers">
                                    <div className="hover:translate-y-[-3px] duration-300 transform leading-normal transition-transform">
                                        Careers
                                    </div>
                                </Link> 
                        </div>
                    </div>

                    {/* Section 4 */}
                    <div className="lg:col-span-1">
                        <h2 className="text-sm font-semibold mb-4">Boma Reviews</h2>
                        <div className="flex flex-col space-y-2 text-xs">
                                <Link href="./about">
                                    <div className="hover:translate-y-[-3px] duration-300 transform leading-normal transition-transform">
                                        About us
                                    </div>
                                </Link> 
                                <Link href="./about">
                                    <div className="hover:translate-y-[-3px] duration-300 transform leading-normal transition-transform">
                                        For Affiliates
                                    </div>
                                </Link> 
                                <Link href="./about">
                                    <div className="hover:translate-y-[-3px] duration-300 transform leading-normal transition-transform">
                                        Team
                                    </div>
                                </Link> 
                        </div>
                    </div>

                </div>
            </div>
        </footer>

    </div>
  )
}

export default Footer