"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaRegAddressCard } from "react-icons/fa";
import { FaHouse } from "react-icons/fa6";
import { IoMdContact } from "react-icons/io";
import { TbCategoryFilled, TbPencilPlus } from "react-icons/tb";
import { TbLogout } from "react-icons/tb";


import { Button } from "../ui/button";

import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useUser } from "@/context/userContext";
type PropTypes = {
    mobile?: boolean;
};

const NavigationLinks = ({ mobile = false }: PropTypes) => {
 
    const { userExists, login } = useUser();
    const pathname = usePathname();

    const iconSize = mobile ? 20 : 24;
    const textSize = mobile ? "text-xs" : "text-sm";

    const router = useRouter()
    const handleLougout = () =>{
        localStorage.removeItem("user");
        login(false)
        router.push("/")
    }
   

    if (!userExists) {
        return <> </>;
    }
    return (
        <ul className="nav-links">
            <Link
                href="/"
                className={`nav-link ${
                    pathname === "/" && "selected-nav-link"
                }`}
            >
                <FaHouse size={iconSize} />
                <p className={textSize}>Home</p>
            </Link>
            <Link
                href="/artefacts"
                className={`nav-link ${
                    pathname === "/artefacts" && "selected-nav-link"
                }`}
            >
                <TbCategoryFilled size={iconSize} />
                <p className={textSize}>Artefacts</p>
            </Link>
            <Link
                href="/artefact"
                className={`nav-link  ${
                    pathname === "/artefact" && "selected-nav-link"
                }`}
            >
                <TbPencilPlus size={iconSize} />
                <p className={textSize}>Artefact</p>
            </Link>

            <div className={`nav-link cursor-pointer `}  onClick={()=>handleLougout()}  >
                <TbLogout  size={iconSize} />
                <p className={textSize}>Logout</p>
            </div>


            {/* <Link
                href="/about"
                className={`nav-link ${
                    pathname === "/about" && "selected-nav-link"
                }`}
            >
                <FaRegAddressCard size={iconSize} />
                <p className={textSize}>About</p>
            </Link> */}

            {/* <Button onClick={logout} className={textSize}>
                <IoMdContact size={iconSize} /> Logout
            </Button> */}
        </ul>
    );
};

export default NavigationLinks;
