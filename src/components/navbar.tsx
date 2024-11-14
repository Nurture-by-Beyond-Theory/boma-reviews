

import React, {useState} from 'react'
import Link from 'next/link'
import LinkButton from './linkbutton'
import { AiOutlineClose, AiOutlineMenu, AiOutlineSearch} from 'react-icons/ai'
import Image from 'next/image'
import MenuBar from '../../public/images/MenuBar.svg'

const LinkArray = [
                    {link: "READ REVIEWS", title: "./about", id:1}, 
                    {link: "SIGN IN", title: "./contact", id:2},    
                    
]




const Navbar = () => {
    const [nav, setNav] = useState(false)


    const handleNav = () => {
        setNav(!nav);
    }
  return (
    
    <div style={{backgroundColor: "#fff"}} className="w-full z-50 fixed top-0 items-center md:px-16 px-8 pt-10">
        <nav className="flex w-full md:justify-center justify-between items-center md:space-x-2 mb-6  px-8 md:px-8">
            
            {/* Logo */}
            <div className="justify-start text-md md:basis-1/12 lg:basis-1/6 relative min-h-10 min-w-36">
                <Image
                    src="/images/logo.png"
                    layout="fill"
                    alt="Logo"
                    objectFit='contain'
                />
            </div>



            {/* Desktop View */}
            {/*Links */}

            <div className="hidden md:flex md:basis-11/12 md:justify-end space-x-5 lg:basis-5/6">

                <ul className='hidden md:flex items-center md:justify-end md:gap-10 md:basis-6/12 lg:basis-2/6 text-sm '>
                    {
                        LinkArray.map((item) =>  
                            <Link key={item.id} href={item.title}>
                                <div className="text-black border-b-2 border-black hover:translate-y-[-3px] text-lg duration-300 transform leading-normal transition-transform">
                                    {item.link}
                                </div>
                            </Link> 
                        )
                    }


                    
                </ul>

                <div className="hidden md:flex justify-end  items-center md:basis-6/12 lg:basis-2/6 space-x-3">
                    

                    <LinkButton
                            href="./signup"
                            label = "SUBMIT A REVIEW"
                            theme = "primary"
                    /> 

                
                <hr className='bg-red-400' />
                </div>

                
            </div>
            
                    

            {/* Mobile View */}

            <div className="flex font-neutral-gray md:hidden space-x-2 justify-center items-center">
                <AiOutlineSearch size={30} />

                <div onClick={handleNav} className=''>
                    {nav ? <AiOutlineClose size={30} /> : <div className="flex flex-col space-y-2 justify-around items-center"> <MenuBar className="" /> <MenuBar className="" /> <MenuBar className="" /></div> }
                </div>

                

            </div>

            {/* Mobile Navigation Menu */}
            <ul
                className={ 
                nav
                    ? 'fixed md:hidden left-0 top-0 w-[30%] h-full border-r pt-10 border-r-gray-900 bg-white ease-in-out duration-500 z-10'
                    : 'ease-in-out w-[60%] duration-1000 fixed top-0 bottom-0 left-[-100%]'
                }
            >
            
            

            

            {/* Mobile Navigation Items */}
                {LinkArray.map(item => (
                    <li
                        key={item.id}
                        className='p-4 border-b rounded-xl hover:bg-[#00df9a] duration-300 hover:text-black cursor-pointer border-gray-600'
                    >
                    {item.link}
                </li>
                ))}
            </ul>
        </nav>
        <hr className="border-red-200 w-full hidden md:block"/>
    </div>
  )
}

export default Navbar
