"use client";

import { useState } from "react";
import { FaEye, FaEyeSlash, FaGoogle, FaFacebook } from "react-icons/fa";
import './signup.css'
import Image from "next/image";
import Link from "next/link";
import LinkButton from "@/components/linkbutton";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    country: "",
    state: "",
    address: "",
    apartmentName: "",
    tenancyStartDate: "",
    tenancyEndDate: "",
    proofImage: null
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [showState, setShowState] = useState(false);
  const [showAddressDetails, setShowAddressDetails] = useState(false);
  const [showTenancyStartDate, setShowTenancyStartDate] = useState(false);
  const [showTenancyEndDate, setShowTenancyEndDate] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(e);
    setShowState(e.target.value !== "");
  };

  const handleStateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(e);
    setShowAddressDetails(e.target.value !== "");
  };

  const handleAddressOrApartmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (value !== "") setShowTenancyStartDate(true);
  };

  const handleTenancyStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      tenancyStartDate: value,
      tenancyEndDate: "", // Reset the tenancy end date when start date changes
    }));
    if (value !== "") setShowTenancyEndDate(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    alert("Account Created Successfully!");
  };

  const handleGoogleSignUp = () => {
    console.log("Signing up with Google...");
    alert("Signed up with Google!");
  };

  const handleFacebookSignUp = () => {
    console.log("Signing up with Facebook...");
    alert("Signed up with Facebook!");
  };

  return (

    <div className="w-full container mx-auto">

          <div className="max-w-4xl mx-auto p-24 space-y-10 tertiary rounded-lg">
            
            
            <div className="flex flex-col space-y-10 justify-center w-full">
              
              <div className="justify-start text-md md:basis-1/12 lg:basis-1/6 relative min-h-10 min-w-36">
                  <Image
                      src="/images/logo.png"
                      layout="fill"
                      alt="Logo"
                      objectFit='contain'
                  />
              </div>
              <div className="flex flex-row text-xl items-center w-full font-bold  justify-evenly space-x-2"> 
                        <span className="primary rounded-full  h-16 w-16 text-sm text-center flex  justify-center items-center">1</span> 
                        <p className="font-semibold">Create an account</p>   
                        <span className="h-[0.022rem] bg-gray-700 w-56 w-max-[80%]"></span>
                        <span className="tertiary border-gray-700 border-[1px] rounded-full h-16 w-16 text-sm text-center text-black flex  justify-center items-center">2</span> 
                        <p className="font-semibold">Submit a review</p> 
              </div>
            
            </div>

            <div className="md:flex-start  flex-col flex font-semibold gap-4">
              <p className="text-xl">  Sign up with email </p>
              <p className="sm font-neutral-gray flex flex-row gap-2 ">
                Already have an account ? 
                <Link href="./login">
                  <div className="text-blue-700">
                    Log In
                  </div>
                </Link> 
              </p>
            </div>

            <form onSubmit={handleSubmit} className="w-full">
              
              
              <div className="flex flex-col gap-4">

                {/* Email */}
                <div className="relative mb-4">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder=" "
                    required
                  />
                  <label
                    htmlFor="email"
                    className={`absolute left-3 transition-all duration-200  text-gray-500 text-lg pointer-events-none ${
                      formData.email || document.activeElement.id === "email"
                        ? "top-0 text-xs"
                        : "top-1/2 transform -translate-y-1/2"
                    }`}
                  >
                    Email Address
                  </label>
                </div>

                {/* Username */}
                <div className="relative mb-4">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder=" "
                    required
                  />
                  <label
                    htmlFor="username"
                    className={`absolute left-3 transition-all duration-200 text-gray-500 text-sm pointer-events-none ${
                      formData.username || document.activeElement.id === "username"
                        ? "top-0 text-xs"
                        : "top-1/2 transform -translate-y-1/2"
                    }`}
                  >
                    Username
                  </label>
                </div>

                {/* Password */}
                <div className="relative mb-4">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder=" "
                    required
                    className="w-full p-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <label
                    htmlFor="password"
                    className={`absolute left-3 transition-all duration-200 text-gray-500 text-sm pointer-events-none ${
                      formData.password || document.activeElement.id === "password"
                        ? "top-0 text-xs"
                        : "top-1/2 transform -translate-y-1/2"
                    }`}
                  >
                    Password
                  </label>
                  <div
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEye className="text-gray-700"/>  : <FaEyeSlash className="text-gray-700" />}
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="relative mb-4">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder=" "
                    className="w-full p-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <label
                    htmlFor="confirmPassword"
                    className={`absolute left-3 transition-all duration-200 text-gray-500 text-sm pointer-events-none ${
                      formData.confirmPassword || document.activeElement.id === "confirmPassword"
                        ? "top-0 text-xs"
                        : "top-1/2 transform -translate-y-1/2"
                    }`}
                  >
                    Confirm Password
                  </label>
                  <div
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <FaEye className="text-gray-700"/>  : <FaEyeSlash className="text-gray-700" />}
                  </div>
                </div>

              </div>
              

              <div className="flex md:flex-row md:space-x-4 mt-10">
                {/* Country */}
                <div className="relative mb-4 w-full font-semibold md:basis-1/2">
                  <label htmlFor="country">Select country <span className="font-primary">*</span></label>
                  <input
                    id="country"
                    name="country"
                    type="text"
                    value={formData.country}
                    onChange={handleCountryChange}
                    className="w-full p-3 border font-light border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Select your country of residence"
                    required
                  />
                </div>

                {/* State */}
                {showState && (
                  <div className="relative font-semibold mb-4 md:basis-1/2">
                  
                    <label htmlFor="country">Select state / county <span className="font-primary">*</span></label>
                    <input
                      id="state"
                      name="state"
                      type="text"
                      value={formData.state}
                      onChange={handleStateChange}
                      className="w-full p-3 border font-light border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Select State/County"
                      required
                    />
                  </div>
                )}
              </div>

              {/* Address or Apartment Name */}
              {showAddressDetails && (
                <div className="flex justify-between font-semibold md:space-x-4 mb-4">
                  <div className="w-full md:basis-1/2">
                  <label htmlFor="address">Enter Address <span className="font-primary">*</span></label>
                    <input
                      id="address"
                      name="address"
                      type="text"
                      value={formData.address}
                      onChange={handleAddressOrApartmentChange}
                      className="w-full p-3 border font-light border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your address"
                    />
                  </div>

                  <div className="w-full md:basis-1/2">
                    <label htmlFor="apartmentName">Enter Apartment Name</label>
                    <input
                      id="apartmentName"
                      name="apartmentName"
                      type="text"
                      value={formData.apartmentName}
                      onChange={handleAddressOrApartmentChange}
                      className="w-full p-3 border font-light border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your apartment name"
                    />
                  </div>
                </div>
              )}


              <div className="flex justify-start items-end gap-4 mt-4">

                {/* Tenancy Start Date */}
                {showTenancyStartDate && (
                  <div className="relative mb-4 sm:basis-1/2 font-semibold">
              
                    <label htmlFor="tenancyStartDate">Tenancy Start Date<span className="font-primary">*</span> <br/> <p className="text-sm font-light text-gray-400 mb-3">Select Start and End Date of your Tenancy</p></label>
                    <input
                      id="tenancyStartDate"
                      name="tenancyStartDate"
                      type="date"
                      value={formData.tenancyStartDate}
                      onChange={handleTenancyStartDateChange}
                      className="w-full p-3 border font-light border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                )}

                {/* Tenancy End Date */}
                {showTenancyEndDate && (
                  <div className="relative mb-4 font-semibold sm:basis-1/2">
                    
                    <input
                      id="tenancyEndDate"
                      name="tenancyEndDate"
                      type="date"
                      value={formData.tenancyEndDate}
                      onChange={handleChange}
                      className="w-full p-3 border font-light border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                )}

              </div>

              {/* Proof of Image */}
              {formData.tenancyStartDate && formData.tenancyEndDate && (
                <div className="relative mb-4 font-semibold">
                  <label htmlFor="proofImage" className="text-gray-700">
                    Upload Proof of Tenancy <span className="font-primary">*</span>
                  </label>
                  <input
                    id="proofImage"
                    name="proofImage"
                    type="file"
                    accept="image/*"
                    onChange={handleChange}
                    className="w-full p-3 border font-light border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              )}

              <div className="flex justify-center space-x-4">
                <FaGoogle className="text-2xl cursor-pointer" onClick={handleGoogleSignUp} />
                <FaFacebook className="text-2xl cursor-pointer" onClick={handleFacebookSignUp} />
              </div>

              {/* Submit Button */}
              
              <div className="w-full mx-auto flex flex-col">

                <LinkButton href={"./login"} theme="primary p-10" label="Create Account and Review" />

              </div>

                
              
              

              {/* Social Media Sign Up */}
              
            </form>
            
          </div>

    </div>
  );
};

export default SignupForm;
