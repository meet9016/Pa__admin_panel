import React from "react";
import "primereact/resources/primereact.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primeicons/primeicons.css";

type DialogBoxProps = {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title?: string;
    message?: string;
};

const DialogBox: React.FC<DialogBoxProps> = ({
    isOpen,
    onClose,
    onConfirm,
    title = "",
    message = "",
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center  bg-opacity-10">
            <div className="relative bg-[#ecf3ff] rounded-3xl shadow-2xl max-w-3xl w-full md:w-1/2 lg:w-1/3 p-10 animate-fadeIn">
                <h2 className="text-4xl font-extrabold text-gray-900 mb-6">
                    {title}
                </h2>
                <p className="text-lg text-gray-600 mb-10 leading-relaxed">
                    {message}
                </p>
                <div className="flex justify-center gap-6">
                    <button
                        onClick={onConfirm}
                        className="px-8 py-3 text-lg font-semibold rounded-full bg-red-600 text-white shadow-lg hover:bg-red-700 transform hover:scale-105 transition"
                    >
                        Yes
                    </button>
                    <button
                        onClick={onClose}
                        className="px-8 py-3 text-lg font-semibold rounded-full bg-gray-200 text-gray-800 shadow-lg hover:bg-gray-300 transform hover:scale-105 transition"
                    >
                        No
                    </button>
                </div>
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition"
                >
                    <i className="ri-close-line text-2xl"></i>
                </button>
            </div>
        </div>
    );

};

export default DialogBox;
