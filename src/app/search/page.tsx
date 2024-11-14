"use client"

import { useState } from 'react';
import SearchBar from '../../components/searchbar';
import cardData from '../../data/reviews.json';
import Rating from '@/components/rating';
import { IoIosArrowDown, IoIosArrowDropright } from 'react-icons/io';
import { VscSettings } from 'react-icons/vsc';
import Image from 'next/image';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';

type Card = {
  id: number;
  houseName: string;
  review: string;
  date: string;
  location: {
    country: string;
    county: string;
    state: string;
  };
  rating: number;
  image: string;
};

const CARDS_PER_PAGE = 5;

const SearchPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  const handleToggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === 'newest' ? 'oldest' : 'newest'));
  };

  const handleLocationSelect = (location: string) => {
    setSelectedLocation(location);
  };

  const filteredCards = (cardData as Card[]).filter((card) => {
    const termLower = searchTerm.toLowerCase();
    if (!termLower) return true;
    const { county, state, country } = card.location;
    const locationMatch =
      county.toLowerCase().includes(termLower) ||
      state.toLowerCase().includes(termLower) ||
      country.toLowerCase().includes(termLower);
    const nameMatch = card.houseName.toLowerCase().includes(termLower);
    return locationMatch || nameMatch;
  });

  const sortedCards = filteredCards.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
  });

  const totalCards = sortedCards.length;
  const totalPages = Math.ceil(totalCards / CARDS_PER_PAGE);
  const startIndex = (currentPage - 1) * CARDS_PER_PAGE;
  const endIndex = Math.min(startIndex + CARDS_PER_PAGE, totalCards);
  const paginatedCards = sortedCards.slice(startIndex, endIndex);

  const handlePreviousPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <div className="p-4 mx-auto w-full">
      <h1 className="text-3xl max-w-md font-bold mb-4 text-center w-full mx-auto">
        Latest apartment reviews from {selectedLocation}
      </h1>

      <SearchBar onLocationSelect={handleLocationSelect} />

      {/* Show 'No Results' message and prompt card if no results */}
      {sortedCards.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-screen space-y-6">
          <p className="text-xl font-semibold text-gray-600">
            No results found. Try a different search.
          </p>
          <div className="bg-gray-100 p-6 rounded-xl shadow-lg w-3/4 md:w-1/2 text-center">
            <p className="text-lg font-medium text-gray-700">
              Please enter a search term to find apartment reviews.
            </p>
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-row font-bold w-full justify-center gap-8 items-center">
            <p className="md:basis-1/2 hidden md:block">
              {startIndex + 1}-{endIndex} of {totalCards} results
            </p>
            <div className="md:basis-1/2 flex w-full flex-row space-x-10 justify-center">
              <button
                onClick={handleToggleSortOrder}
                className="mt-2 px-4 py-2 rounded-lg flex items-center shadow-[0px_4px_5px_0px_rgba(0,_0,_0,_0.1)] neutral-white"
              >
                Sort by <IoIosArrowDown className="ml-2 h-3 w-3" />
              </button>
              <button
                onClick={handleToggleSortOrder}
                className="mt-2 px-4 py-2 rounded-lg flex items-center shadow-[0px_4px_5px_0px_rgba(0,_0,_0,_0.1)]"
              >
                Filter <VscSettings className="ml-2 h-5 w-5 text-blue-800" />
              </button>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6">
            {paginatedCards.map((card) => (
              <div key={card.id} className="p-4 border bg-gray-100 rounded-3xl md:p-14 flex flex-col items-center justify-center md:flex-row min-w-60 md:w-5/6 md:gap-20 max-h-96">
                <div className="md:basis-2/6 flex h-64 w-80 md:h-80 md:w-full flex-col justify-center items-center relative">
                  <Image src={card.image} alt={card.houseName} objectFit="cover" layout="fill" className="rounded-3xl" />
                </div>
                <div className="md:basis-4/6 items-center md:flex md:flex-col md:items-start justify-between md:h-full w-full space-y-2 md:justify-evenly">
                  <h2 className="text-xl md:text-3xl font-bold mt-2">{card.houseName}</h2>
                  <div className="flex flex-row justify-between w-full">
                    <p className="text-gray-700 text-sm">
                      {`${card.location.county}, ${card.location.state}, ${card.location.country}`}
                    </p>
                    <span className="text-gray-600 text-xs md:text-base">
                      {new Date(card.date).toLocaleDateString()}
                    </span>
                  </div>
                  <span className="text-gray-600">
                    <Rating rating={card.rating} />
                  </span>
                  <p className="text-sm font-semibold mt-2 w-full">{card.review}</p>
                  <div className="flex flex-row justify-between w-full items-center text-xs sm:text-sm lg:text-base">
                    <div className="text-sm text-gray-800">1 - 2 bedroom apartments</div>
                    <div className="flex flex-row items-center font-bold underline-offset-8 underline text-blue-700 md:font-sm hover:cursor-pointer hover:text-blue-900">
                      See More Reviews <MdOutlineKeyboardArrowRight className="h-10 w-8" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex justify-between items-center">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default SearchPage;
