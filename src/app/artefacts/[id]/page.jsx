"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import ModelViewer from "@/components/ModelViewer";
import { items } from "@/utils/db.js";
import { motion } from "framer-motion"; // Import motion
import { useUser } from "@/context/userContext";
import { useRouter } from "next/navigation";

const ItemDetail = ({ params }) => {
    const { id } = params;
    const [isLoading, setIsLoading] = useState(true);
    const [showItem, setShowItem] = useState({});
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const { login } = useUser();
    useEffect(() => {
        const userExists = localStorage.getItem("user") !== null;
        if (userExists) login(true); 
    }, []);

    const router = useRouter();
    useEffect(() => { 
       const userExists  = localStorage.getItem("user") !== null;
        if(!userExists){
            router.push("/")
        }else{
            setIsLoading(false)
        }
    } ,[] )

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const selectedItem = items.find((item) => item.id === id);
            console.log(selectedItem);
            setShowItem(selectedItem || {});
            (async () => {
                await delay(2000);
                setIsLoading(false);
            })();
        };

        fetchData();
    }, [id]);

    if (isLoading) {
        return (
            <div className={`flex items-center justify-center transition-all duration-500 opacity-100  h-screen`}>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div
                    className={`relative flex flex-col items-center transition-transform duration-500`}
                    style={{ transform: 'scale(1)' }} // No scaling
                    >
                    <div className="w-24 h-24 rounded-full border-4 border-transparent border-t-[#FFB800] animate-spin" />
                    <div className="w-20 h-20 rounded-full bg-[#FFB800] animate-pulse absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                    </div>
                </div>
                </div>
        );
    }

    return (
        <motion.div
            className="relative container mx-auto h-screen p-4 sm:p-8 bg-white dark:bg-black rounded-lg transition-colors duration-300 ease-in-out mb-20"
            initial={{ opacity: 0 }} // Start fully transparent
            animate={{ opacity: 1 }} // Fade in
            transition={{ duration: 0.5 }} // Duration of fade-in effect
        >
            {/* Title */}
            <h1 className="text-3xl sm:text-4xl font-bold text-black dark:text-[#FFB800] mb-4 sm:mb-6 text-center">
                {showItem?.name}
            </h1>
            {/* Back button */}
            <div className="absolute top-4 sm:top-8 left-4">
                <Link href="/artefacts" passHref>
                    <button className="flex items-center bg-transparent border-none cursor-pointer">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6 text-black dark:text-[#FFB800] transition-colors duration-300 ease-in-out"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 12H3m0 0l9-9m-9 9l9 9"
                            />
                        </svg>
                        <span className="ml-2 text-black dark:text-[#FFB800] transition-colors duration-300 ease-in-out">
                            Back
                        </span>
                    </button>
                </Link>
            </div>
            {/* Content Section */}
            <div className="flex flex-col md:flex-row items-center justify-center mt-0 h-auto md:h-[80%] rounded-lg overflow-hidden">
                {/* Description - 2/5 width on larger screens */}
                <div className="flex-1 md:flex-[2] flex flex-col items-center justify-center mb-4 sm:mb-8 px-4 sm:px-6 order-2 md:order-1">
                    <p className="text-gray-900 dark:text-white text-base sm:text-lg max-w-xs sm:max-w-md p-4 sm:p-6 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-lg shadow-lg leading-relaxed text-center">
                        {showItem?.description}
                    </p>
                </div>

                {/* Model Viewer - 3/5 width on larger screens */}
                <div className="w-[25rem] h-[25rem] flex-1 md:flex-[3] flex items-center justify-center px-4 sm:px-6 order-1 md:order-2">
                    <div className="w-full h-full flex justify-center items-center">
                        <ModelViewer fileUrl={showItem?.fileUrl} />
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ItemDetail;
