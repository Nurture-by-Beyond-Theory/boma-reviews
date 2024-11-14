import { useState, useEffect, useRef } from 'react';
import { FaX } from 'react-icons/fa6';
import { CiSearch } from 'react-icons/ci';
import { NG, KE } from 'country-flag-icons/react/3x2';
import reviewsData from '../data/reviews.json'; // Update this path as needed
import { IoIosArrowDown } from 'react-icons/io';
import { GrLocation } from 'react-icons/gr';
import Link from 'next/link';

type ReviewData = {
  date: string;
  review: string;
  rating: number;
  image: string;
  location: {
    country: string;
    county: string;
    state: string;
  };
  houseName: string;
  id: number;
};

type SearchBarProps = {
  onLocationSelect: (location: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ onLocationSelect }) => {
  const [selectedCountry, setSelectedCountry] = useState<'Nigeria' | 'Kenya'>('Nigeria');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredOptions, setFilteredOptions] = useState<string[]>([]);
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState<boolean>(false);
  const [isSearchDropdownOpen, setIsSearchDropdownOpen] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const countryDropdownRef = useRef<HTMLDivElement | null>(null);
  const searchDropdownRef = useRef<HTMLDivElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  // Filter options based on search query
  useEffect(() => {
    if (searchQuery) {
      const uniqueOptions = new Set<string>();
  
      reviewsData.forEach((review) => {
        if (review.location.country === selectedCountry) {
          const { county, state } = review.location;
          const { houseName } = review;
  
          // Check if any of these fields match the search query
          if (
            county.toLowerCase().includes(searchQuery.toLowerCase()) ||
            state.toLowerCase().includes(searchQuery.toLowerCase()) ||
            houseName.toLowerCase().includes(searchQuery.toLowerCase())
          ) {
            // Add a unique state-county combination
            uniqueOptions.add(`${state} - ${county}`);
          }
        }
      });
  
      setFilteredOptions(Array.from(uniqueOptions));
    } else {
      setFilteredOptions([]);
    }
  }, [searchQuery, selectedCountry]);

  const handleCountrySelect = (country: 'Nigeria' | 'Kenya') => {
    setSelectedCountry(country);
    setSearchQuery(''); // Clear search query when changing countries
    setIsCountryDropdownOpen(false);
    setIsSearchDropdownOpen(false);
  };

  const clearSearch = (): void => setSearchQuery('');

  const handleSearchInputFocus = () => {
    setIsSearchDropdownOpen(true);
    setIsCountryDropdownOpen(false);
  };

  const handleOptionSelect = (option: string) => {
    setSearchQuery(option);
    setIsSearchDropdownOpen(false);
    onLocationSelect(option);
  };

  return (
    <div className="p-8">
      <div ref={containerRef} className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto mt-4 bg-white shadow-md rounded-full p-4 relative">
        <div className="flex items-center w-full space-x-4 relative justify-center">
          {/* Country Selection Button */}
          <div className="relative">
            <button
              onClick={() => {
                setIsCountryDropdownOpen(!isCountryDropdownOpen);
                setIsSearchDropdownOpen(false);
              }}
              className="flex items-center p-2 text-gray-700 rounded-md focus:outline-none"
            >
              <span className="flex items-center space-x-2">
                {selectedCountry === 'Nigeria' ? (
                  <NG title="Nigeria" className="w-8 h-8" />
                ) : (
                  <KE title="Kenya" className="w-8 h-8" />
                )}
                <span>{selectedCountry}</span>
              </span>
              <IoIosArrowDown className="w-4 h-4 ml-1" />
            </button>

            {/* Country Dropdown */}
            {isCountryDropdownOpen && (
              <div ref={countryDropdownRef} className="absolute z-10 bg-white shadow-lg w-full mt-5 border border-gray-500">
                {selectedCountry === 'Nigeria' && (
                  <button onClick={() => handleCountrySelect('Kenya')} className="flex items-center p-2 w-full">
                    <KE title="Kenya" className="w-8 h-8" />
                    <span className="ml-2">Kenya</span>
                  </button>
                )}
                {selectedCountry === 'Kenya' && (
                  <button onClick={() => handleCountrySelect('Nigeria')} className="flex items-center p-2 w-full">
                    <NG title="Nigeria" className="w-8 h-8" />
                    <span className="ml-2">Nigeria</span>
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Vertical Separator */}
          <p className="text-2xl bg-gray-500 text-center flex justify-center items-center w-[0.05rem] h-10"></p>

          {/* Search Input Field */}
          <div className="flex-grow relative">
            <input
              ref={searchInputRef}
              type="text"
              className="w-full p-2 text-gray-700 bg-white border-none focus:outline-none text-xs md:text-sm"
              placeholder={`Search reviews by County, State, City, Town, Apartment Name... in ${selectedCountry}`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={handleSearchInputFocus}
            />
            {searchQuery && (
              <button onClick={clearSearch} className="p-2 text-gray-500 hover:text-gray-700 focus:outline-none absolute right-2 top-2">
                <FaX className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Search Button */}
          <button className="flex items-center justify-center p-2 rounded-full text-white primary hover:bg-blue-600 focus:outline-none">
            <Link href="/search">
              <CiSearch className="w-5 h-5 rounded-full" />
            </Link>
          </button>
        </div>

        {/* Filtered Search Results */}
        {isSearchDropdownOpen && filteredOptions.length > 0 && (
          <div ref={searchDropdownRef} className="absolute top-full z-10 py-3 px-5 bg-white shadow-lg rounded-md border w-full max-w-[32rem] mt-2 max-h-64 overflow-y-auto border-gray-700">
            {filteredOptions.map((option, index) => (
              <div key={index} className="py-2 px-3 rounded-md hover:bg-gray-200 cursor-pointer flex flex-row text-gray-700" onClick={() => handleOptionSelect(option)}>
                <GrLocation className="h-7 w-5 mr-5" />
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
