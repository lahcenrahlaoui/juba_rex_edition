"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/userContext";

const ItemForm = () => {
    const { userExists, login } = useUser();


    const router = useRouter();
    useEffect(() => {
        if(!userExists){
            router.push("/")
        }
    } ,[] )

    const [image, setImage] = useState(null);
    const [threeDItem, setThreeDItem] = useState(null);
    const [item, setItem] = useState({
        id: 1,
        name: "",
        description: "",
        imageUrl: "", // Default value
        fileUrl: "", // Default value
    });
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const handleChangeState = (e) => {
        const { name, value } = e.target;
        setItem((prevItem) => ({
            ...prevItem,
            [name]: value,
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setImage(file); // Save the file object for display
        };
        reader.readAsDataURL(file);
    };

    const handleThreeDItemChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setThreeDItem(file); // Save the file object for display
        };
        reader.readAsDataURL(file);
    };

    const handleUploadImage = async () => {
        const response = await fetch("/api/upload", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ image }),
        });
        const data = await response.json();
        return data.secure_url;
    };

    const handleUploadThreeD = async () => {
        const response = await fetch("/api/uploadGlb", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ image2: threeDItem }),
        });
        const data = await response.json();
        return data.glbPath;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = await handleUploadImage();
        const glbPath = await handleUploadThreeD();

        const sendItem = {
            ...item,
            imageUrl: url,
            fileUrl: glbPath,
        };
        try {
            const response = await fetch("/api/posts/new", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(sendItem),
            });

            const data = await response.json();
            setSubmitSuccess(true);
            router.push("/artefacts"); // Redirect after successful submission
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
            <form
                onSubmit={handleSubmit}
                className="max-w-lg w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 space-y-6 transition duration-300 ease-in-out"
            >
                <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200 text-center">
                    Add New Item
                </h2>

                {/* Name Input */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Name:
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={item.name}
                        onChange={handleChangeState}
                        required
                        className="p-3 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-[#FFB800] transition ease-in-out"
                    />
                </div>

                {/* Description Input */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Description:
                    </label>
                    <textarea
                        name="description"
                        value={item.description}
                        onChange={handleChangeState}
                        required
                        className="p-3 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-[#FFB800] transition ease-in-out h-32 resize-none"
                    />
                </div>

                {/* Image Upload */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Upload Image (JPG, PNG):
                    </label>
                    <input
                        type="file"
                        onChange={handleImageChange}
                        accept="image/*"
                        className="p-2 border border-[#FFB800] rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 transition ease-in-out focus:outline-none hover:border-[#FFB800] dark:hover:border-[#FFB800]"
                    />
                    {image && <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{image.name}</p>}
                </div>

                {/* 3D Model Upload */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Upload 3D Model (GLB, GLTF):
                    </label>
                    <input
                        type="file"
                        onChange={handleThreeDItemChange}
                        accept=".glb, .gltf"
                        className="p-2 border border-[#FFB800] rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 transition ease-in-out focus:outline-none hover:border-[#FFB800] dark:hover:border-[#FFB800]"
                    />
                    {threeDItem && <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{threeDItem.name}</p>}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-[#FFB800] to-[#e5a700] text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 ease-in-out"
                >
                    Submit
                </button>

                {/* Success Feedback */}
                {submitSuccess && <p className="mt-4 text-green-500 text-center">Item submitted successfully!</p>}
            </form>
        </div>
    );
};

export default ItemForm;
