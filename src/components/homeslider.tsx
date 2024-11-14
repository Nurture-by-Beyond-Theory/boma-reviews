import React from 'react';
import { AiFillHome } from 'react-icons/ai';
import reviewsData from '../data/reviews.json'
import Link from 'next/link'
import Image from 'next/image';

const LocationMenu = ({ }) => {

    return (
      <div className="w-full p-12 mx-auto flex flex-col justify-center">
        <hr className="primary my-10"/>
        <h1 className="text-xl font-bold sm:text-xl text-center"> Find apartment reviews from your city or state</h1>

        {/* Location menu section */}
        <div className="relative flex flex-row items-end justify-center">
          {/* Slider content (Horizontal scroll) */}
          <div className="flex overflow-x-auto space-x-4 py-2 scrollbar-hide items-center">
            {reviewsData.map((reviews) => (
              <div
                key={reviews.id}
                className="flex flex-col min-h-[80px] w-20 rounded-full items-center min-w-[80px] sm:min-w-[100px] sm:min-h-[100px]  md:min-w-[120px] md:min-h-[120px] p-4 justify-center hover:bg-slate-200"
              >
                <div className="">
                  <Image src='/images/Country House.png' alt='menu' height={30} width={30} />
                </div>
                <span className="text-sm text-center text-gray-700 font-normal">
                  {reviews.location.county}
                </span>
              </div>
            ))}

            <div className=" right-0 transform pr-4 ">
                    <Link
                        href="../reviews/reviews"
                        className="text-blue-500 hover:underline font-medium"
                    > 
                    
                        <div>
                         See more Reviews>
                        </div>
                    
                    </Link>
                    
                    
                    
            </div>
  
          </div>
          {/* See More Reviews Link */}
        
          
        </div>
      </div>
    );
  };
  
  export default LocationMenu;
  