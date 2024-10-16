"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import ModelViewer from "@/components/ModelViewer";
import { items } from "@/utils/db.js";

const ItemDetail = ({ params }) => {
    const { id } = params;
    const [showItem, setShowItem] = useState({});

    useEffect(() => {
        const selectedItem = items.find((item) => item.id === id);
        console.log(selectedItem)
        setShowItem(selectedItem || {});
    }, [id]);

    return (
        <div className="relative container mx-auto h-screen p-4 sm:p-8 bg-white dark:bg-black rounded-lg transition-colors duration-300 ease-in-out mb-20"> {/* Color transition */}
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
                        <span className="ml-2 text-black dark:text-[#FFB800] transition-colors duration-300 ease-in-out">Back</span>
                    </button>
                </Link>
            </div>

           {/* Content Section */}
           <div className="flex flex-col md:flex-row items-center justify-center mt-0 h-auto md:h-[80%] rounded-lg overflow-hidden">
    {/* Description - 2/5 width on larger screens */}
    <div className="flex-1 md:flex-[2] flex flex-col items-center justify-center mb-4 sm:mb-8 px-4 sm:px-6 order-2 md:order-1"> {/* Added md:order-2 for reverse order on larger screens */}
        <p className="text-gray-900 dark:text-white text-base sm:text-lg max-w-xs sm:max-w-md p-4 sm:p-6 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-lg shadow-lg leading-relaxed text-center">
            {showItem?.description}
        </p>
    </div>

    {/* Model Viewer - 3/5 width on larger screens */}
    <div className="w-96 flex-1 md:flex-[3] flex items-center justify-center px-4 sm:px-6 order-1 md:order-2"> {/* Added md:order-1 for normal order on larger screens */}
        <div className="w-full h-full flex justify-center items-center">
            <ModelViewer
                fileUrl={showItem?.fileUrl}
                className="w-full h-full rounded-lg shadow-lg" // Adjusted shadow for consistency
            />
        </div>
    </div>
</div>



        
        

        </div>
    );
};

export default ItemDetail;