"use client";
import Link from "next/link";
import Image from "next/image"; 
import { items } from "@/utils/db.js";
 
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/userContext";

export default function Posts() {
     
    const [isLoading , setIsLoading] = useState(true)
    
    const router = useRouter();
    useEffect(() => { 
       const userExists  = localStorage.getItem("user") !== null;
        if(!userExists){
            router.push("/")
        }else{
            setIsLoading(false)
        }
    } ,[] )


    const { login } = useUser();
    useEffect(() => {
        const userExists = localStorage.getItem("user") !== null;
        if (userExists) login(true); 
    }, []);



    if(isLoading){
        return  <div className={`flex items-center justify-center transition-all duration-500 opacity-100  h-screen`}>
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


    }



    return (
        <section className="relative container mx-auto h-screen p-4 sm:p-8 bg-white dark:bg-black rounded-lg transition-colors duration-300 ease-in-out"> {/* Color transition */}
          
            <h1 className="text-3xl sm:text-4xl font-bold text-black dark:text-[#FFB800] mb-4 sm:mb-6 text-center">
                Artifacts
            </h1>

           

            {/* Card Grid */}
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
                {items.map((item) => (
                    <li
                        key={item.id}
                        className="border border-[#ffb800] flex flex-col items-center justify-center p-6 mb-4 sm:mb-8 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-lg shadow-lg transition-shadow duration-300" // Visible borders using shadow
                    >
                        <Link href={`/artefacts/${item.id}`} passHref>
                            <div className="cursor-pointer w-full h-48 relative overflow-hidden rounded-lg mb-4">
                                <Image
                                    src={item.imageUrl}
                                    alt={item.name}
                                    layout="fill"
                                    className="rounded-lg object-cover" // Removed hover effect on image
                                />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-[#FFB800] mb-2">{item.name}</h3>
                            <p className="text-gray-700 dark:text-gray-300 text-sm text-center">{item.description}</p>
                        </Link>
                    </li>
                ))}
            </ul>
           
        </section>
    );
}
