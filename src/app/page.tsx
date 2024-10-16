"use client";

import { useContext, useState, useEffect } from "react";
import Orbits from "@/components/shared/orbits";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { JubarexContext, JubarexContextType } from "./context";
import { useRouter } from "next/navigation";
import { useUser } from '@/context/UserContext';

const Home = () => {
    const { userExists, login } = useUser(); 
    const router = useRouter();

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [keyPresses, setKeyPresses] = useState<string[]>([]);

    useEffect(() => {
       
        const handleKeyDown = (event: KeyboardEvent) => {


            const lastFiveKeys = [...keyPresses.slice(-4), event.key];

            if(lastFiveKeys.join('').toLowerCase() === 'enter'){
                handleSubmit()
            }


            setKeyPresses((prev) => [...prev, event.key]);
            // Check for the sequence "DATA"
            if (keyPresses.length >= 3) {
                const lastFourKeys = [...keyPresses.slice(-3), event.key];
                if (lastFourKeys.join('').toLowerCase() === 'data') {
                    setEmail("juba@rex.com");
                    setPassword("password123");
                    setKeyPresses([]); // Clear key presses after setting
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [keyPresses]);

    const dummyUser = {
        name: "John",
        email: "juba@rex.com",
        password: "password123",
    };

    useEffect(() => {
        localStorage.setItem("existingUser", JSON.stringify(dummyUser));
        const userExists = localStorage.getItem("user") !== null;
        if (userExists) {
            login();
            router.push("/artefacts");
        }
    }, []);

    const validateEmail = (email: string): boolean => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple regex for basic email validation
        return emailPattern.test(email);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        // event.preventDefault(); // Prevent default form submission behavior

        // Reset error state
        setError("");

        // Basic input validation
        if (!email || !password) {
            setError("Please enter both email and password.");
            return;
        }

        // Email format validation
        if (!validateEmail(email)) {
            setError("Please enter a valid email address.");
            return;
        }

        setLoading(true); // Set loading to true
        const retrievedUser = localStorage.getItem("existingUser");
        const user = retrievedUser ? JSON.parse(retrievedUser) : null;

        // Validate user credentials
        if (user && user.email === email && user.password === password) {
            localStorage.setItem("user", JSON.stringify(dummyUser));
            login();
            router.push("/artefacts");
        } else {
            setError("Incorrect email or password.");
        }
        setLoading(false); // Set loading to false
    };

    return (
        <section className="relative">
            <div className="fixed inset-0 bg-black bg-opacity-5 z-0" />
            <motion.section
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="z-10 relative container flex flex-col justify-center items-center text-center lg:text-start lg:items-start h-[calc(100vh-60px)] lg:h-screen"
            >
                <article className="mb-8 flex flex-col gap-y-2 lg:gap-y-4">
                    <h3 className="font-jetbrains font-medium text-base lg:text-lg text-gray-900 dark:text-gray-300">
                        Protect Your Ancient Treasures with Juba Rex
                    </h3>
                    <h1 className="font-bold text-4xl lg:text-6xl leading-tight text-gray-900 dark:text-white">
                        Safeguarding & Digitalizing{" "}
                        <span className="text-[#FFB800]">Ancient Treasures</span>
                    </h1>
                </article>

                <p className="text-lg lg:text-xl text-gray-700 dark:text-gray-400 max-w-2xl lg:mr-[40%]">
                    Our services not only secure your physical treasures but also preserve them digitally for future generations.
                </p>

                <form onSubmit={handleSubmit} className="mt-10 lg:mt-12 w-full max-w-lg space-y-4">
                    <div className="flex flex-col w-full">
                        <label className="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                            Email Address
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:border-[#FFB800] focus:ring-2 focus:ring-[#FFB800] transition ease-in-out"
                            placeholder="Email"
                            required
                        />
                    </div>

                    <div className="flex flex-col w-full">
                        <label className="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:border-[#FFB800] focus:ring-2 focus:ring-[#FFB800] transition ease-in-out"
                            placeholder="Password"
                            required
                        />
                    </div>

                    {/* Display error message if any */}
                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    <Button
    type="submit"
    disabled={loading} // Disable button when loading
    className={`w-full py-3 text-lg font-semibold ${loading ? 'bg-gray-400' : 'bg-[#FFB800]'} text-white rounded-lg hover:bg-[#e5a700] transition duration-300`}
    
    
>
    {loading ? "Logging in..." : "Login"} {/* Change button text based on loading state */}
</Button>


                </form>
            </motion.section>
            
            <Orbits mini={false} />
        </section>
    );
};

export default Home;
