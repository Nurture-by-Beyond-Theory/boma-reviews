"use client"


import dynamic from 'next/dynamic';

const SearchBar = dynamic(() => import('@/components/searchbar'), { ssr: false });
import Image from 'next/image'
import Rating from "../components/rating"; 
import reviewsData from "@/data/reviews.json";
import LinkButton from '@/components/linkbutton'
import { IoIosArrowDown } from "react-icons/io";



import Link from 'next/link';
import LocationMenu from '@/components/homeslider';




const HomePage = () => {

  // const [reviews, setReviews] = useState([])

  

  return (
    <div className="flex flex-col overflow-hidden">
      

      <div className="flex  flex-col md:flex-row justify-center lg:px-32 md:px-16 items-center text-center min-h-[80vh] p-8">
        <div className="flex flex-col w-full md:basis-6/12 py-16 text-center md:text-left">

          <h1 className="text-3xl md:text-6xl font-bold">Know Your Landlord.</h1>
          <h1 className="text-3xl md:text-6xl font-bold">Rent with <span style={{color:"#FA495B"}}>Confidence</span></h1>
          <br />
          <p className=' text-lg md:text-2xl font-normal'>
            Save yourself the hassle of finding a great
            <br/>
            apartment by reading honest reviews from
            <br/>
            tenants. 
          </p>

          <br />

          <div className='w-full md:justify-start justify-center'>

            <LinkButton 
              href="./reviews"
              theme="primary"
              label="Read Reviews"
            />
          </div>

        </div>

        <div className="justify-start min-w-80 w-full min-h-80 md:basis-6/12 relative lg:-translate-x-0.5">
          <Image
            src="/images/Hero Image1.png"
            alt="Hero"  
            objectFit='contain'
            layout="fill"
            
          /> 
        </div>

      </div>
      <SearchBar />

      

      {/* Location Slider */}
      <LocationMenu />

      
      

      {/* Trusted Source Section */}
      <div className='flex flex-col font-medium w-full md:p-16 p-8 justify-center items-center gap-20 tertiary'>

        <h1 className='max-w-xl font-bold text-xl md:text-5xl text-center'>Your <span className='font-primary'>Trusted</span> source for Safer, Smarter Rentals</h1>

        <div className='flex flex-row items-center justify-around mx-auto'>
          <div className="lg:h-[22rem] lg:w-[22rem] md:h-[20rem] md:w-[20rem] h-20 w-20 rounded-full md:relative absolute lg:translate-x-20 lg:translate-y-0 md:translate-x-16 md:translate-y-0 -translate-y-20 -translate-x-32 ">
            <Image src="/images/Ellipse 4.png" alt="rectangle" objectFit='fit' layout='fill' />
          </div>
          
          <div className='lg:basis-4/5 flex flex-col items-end w-full rounded-xl'>
            <div className=' w-4/12 md:h-8 relative mr-9 h-5'>
                  <Image src="/images/Rectangle 28 (1).png" alt="rectangle" objectFit='fit' layout='fill' />
            </div>
            <div className='rounded-lg w-full sm:h-56 bg-white shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.1)] lg:text-3xl md:text-xl text-sm text-right md:p-24 p-8 flex items-center justify-end'> 
              <div className='max-w-2xl md:max-2xl py-8 md:py-0'>
                Boma Reviews provides verified reviews from tenants in Nigeria and Kenya.
              </div>
            </div>
          </div>

          
         
        </div>

        <div className='flex flex-row items-center justify-around mx-auto lg:ml-60 md:ml-16'>
          
      
          <div className='lg:basis-4/5 flex flex-col items-start w-full rounded-xl'>
            <div className=' w-4/12 md:h-8 relative ml-9 h-5 '>
                  <Image src="/images/Rectangle 29.png" alt="rectangle" objectFit='fit' layout='fill' />
            </div>

            <div className='bg-white w-full sm:h-56 shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.1)] lg:text-3xl md:text-xl text-sm text-left md:p-24 p-8 flex items-center justify-end rounded-lg'> 
              <div className='max-w-2xl md:max-2xl py-8 md:py-0'>
                Know your landlord so you or your family can live in peace.
              </div>
            </div>
          </div>

          <div className="lg:h-[22rem] lg:w-[22rem] md:h-[20rem] md:w-[20rem] h-20 w-20 rounded-full md:relative absolute lg:-translate-x-20 lg:translate-y-0 md:-translate-x-16 md:-translate-y-0 -translate-y-20 translate-x-32 ">
            <Image src="/images/Ellipse 5.png" alt="rectangle" objectFit='fit' layout='fill' />
          </div>

          
         
        </div>

        <div className='flex flex-row items-center justify-around mx-auto'>
          <div className="lg:h-[22rem] lg:w-[22rem] md:h-[20rem] md:w-[20rem] h-20 w-20 rounded-full md:relative absolute lg:translate-x-20 lg:translate-y-0 md:translate-x-16 md:translate-y-0 -translate-y-20 -translate-x-32 ">
            <Image src="/images/Ellipse 5.png" alt="rectangle" objectFit='fit' layout='fill' />
          </div>
          
          <div className='lg:basis-4/5 flex flex-col items-end w-full rounded-xl'>
            <div className=' w-4/12 md:h-8 relative mr-9 h-5 '>
                  <Image src="/images/Rectangle 28 (1).png" alt="rectangle" objectFit='fit' layout='fill' />
            </div>
            <div className='rounded-lg bg-white w-full sm:h-56 shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.1)] lg:text-3xl md:text-xl text-sm text-right md:p-24 p-8 flex items-center justify-end'> 
              <div className='max-w-2xl md:max-2xl py-8 md:py-0'>
              We help you discover the truth about the apartment before you sign the lease.
              </div>
            </div>
          </div>

          
         
        </div>

        
        

      </div>
      


      {/* Reviews Section */}
      <div className='flex flex-col justify-center items-center w-10/12  mx-auto mt-20'>
        <h1 className='font-bold text-xl'>Recent Activities  Tenants </h1>
        <div className="m:p-4 p-8 flex flex-row flex-wrap items-center">
          {reviewsData.map((review) => (                
                
           
            <div
              key={review.id}
              className="sm:basis-3/6 md:basis-4/12 lg:basis-1/3 flex flex-col md:space-y-0 md:space-x-2 p-8 mx-auto"

            >

              <div className='relative h-96 min-w-60'>
                <Image
                  src={review.image}
                  alt={review.houseName}
                  className="w-full h-full block rounded-lg overflow-hidden"
                  objectFit="cover"
                  layout="fill"
                />

              </div>
            

              <div className="flex space-y-4 flex-col translate-y-[-50px]">

              
                 <h3 className="text-lg font-semibold">{review.houseName}</h3>
                
                 <Rating rating={review.rating}/>

                 <p className="text-xs flex w-full justify-between">
                   <span>
                     {review.location.state}, {review.location.country}
                   </span>
                   <span>
                     {new Date(review.date).toLocaleDateString()}

                   </span>
                 </p>

                 <p className="mt-2 text-gray-700 text-sm">{review.review}</p>
              
             </div>
             
            </div>
          ))}

            
        </div>  
        <Link href="./reviews/reviews">
                <div className="hover:translate-y-[-3px] text-lg font-bold duration-300 p-10 transform leading-normal transition-transform text-blue-700 gap-2 flex flex-row items-center text-center justify-center">
                    See More Reviews <span><IoIosArrowDown /></span>
                </div>
        </Link> 
      
      </div>     


      {/* Sign Up Section */}
      <div className="flex flex-col tertiary w-full justify-center h-[50vh] items-center text-center space-y-10">

        <p className='md:text-4xl text-xl md:max-w-[45vw] max-w-[80vw] font-md'>
          <Image 
            src="/images/arrow up.png"
            height={40}
            width={40}
            alt='arrow up'
            className='translate-x-10'
          />
          Discover the perfect home by getting honest <span className='font-primary'>reviews</span> from verified tenants.

        </p>


        <LinkButton
                              href="./login"
                              label = "Sign Up"
                              theme = "primary md:w-[20vw]"
        />

      </div>
      

      
    </div>
  )
}

export default HomePage
