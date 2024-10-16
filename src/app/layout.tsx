"use client";

import { ThemeProvider } from "@/components/theme-provider";
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

import { Analytics } from "@vercel/analytics/react";

import BottomNav from "@/components/bottom-nav";
import Sidebar from "@/components/sidebar";
import Topbar from "@/components/topbar";
import { User, UserProfile } from "@/types";
import { Layout } from "lucide-react";
import { useEffect, useState } from "react";
import { JubarexContext } from "./context";

import { UserProvider } from '@/context/UserContext';

const nunito = Nunito({ subsets: ["latin"] });

const metadata: Metadata = {
    title: "Ancient Treasures",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [user, setUser] = useState<User | undefined>();
    const [userProfile, setUserProfile] = useState<UserProfile | undefined>();

    const logout = async () => {
        setUser(undefined);
        setUserProfile(undefined);
    };

    const refreshUserFromToken = async () => {
        //get token to session
        const accessToken = await localStorage.getItem("accessToken");

        if (!accessToken) {
            console.error("No access token found on cache, return to login");
            await logout();
        }

        // get profile
        const userProfileResponse = await fetch(
            process.env.NEXT_PUBLIC_BACKEND_URL + "/auth/profile",
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + accessToken,
                },
            }
        );
        const userProfile: UserProfile = await userProfileResponse.json();
        setUserProfile(userProfile);

        //get user

        const userResponse = await fetch(
            process.env.NEXT_PUBLIC_BACKEND_URL + "/user/" + userProfile.sub,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + accessToken,
                },
            }
        );
        const user = await userResponse.json();
        setUser(user);
    };

    useEffect(() => {
        (async () => {
            if (!user || !user.email) await refreshUserFromToken();
        })();
    }, []);

    return (
        <html lang="en">
            <body
                className={`font-nunito bg-bg-color-light dark:bg-bg-color-dark/50`}
            >
                   <UserProvider>
   
              
                <JubarexContext.Provider
                    value={{
                        user,
                        setUser,
                        userProfile,
                        setUserProfile,
                        logout,
                        refreshUserFromToken,
                    }}
                >
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="dark"
                        enableSystem
                        disableTransitionOnChange
                    >
                        <Sidebar />
                        <Topbar />
                        <BottomNav />

                        <main className="main">{children}</main>
                    </ThemeProvider>
                    <Analytics />
                </JubarexContext.Provider>
                       
                </UserProvider>

            </body>
        </html>
    );
}
