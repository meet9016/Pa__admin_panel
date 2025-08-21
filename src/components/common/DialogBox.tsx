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
        <div className="fixed inset-0 z-30  flex items-center justify-center bg-black/0 backdrop-blur-sm">
            <div className="relative bg-white/90 rounded-2xl shadow-xl max-w-lg w-full p-8 animate-fadeIn border border-gray-300">
                {/* Title */}
                <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
                    {title}
                </h2>

                {/* Message */}
                <p className="text-base text-gray-600 mb-8 leading-relaxed text-center">
                    {message}
                </p>

                {/* Buttons */}
                <div className="flex justify-center gap-4">
                    <button
                        onClick={onConfirm}
                        className="px-6 py-2 text-base font-medium rounded-xl bg-red-500 text-white shadow-md hover:bg-red-600 transition-all duration-200"
                    >
                        Yes, Confirm
                    </button>
                    <button
                        onClick={onClose}
                        className="px-6 py-2 text-base font-medium rounded-xl bg-gray-100 text-gray-800 shadow-md hover:bg-gray-200 transition-all duration-200"
                    >
                        Cancel
                    </button>
                </div>

                {/* Close Icon */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
                >
                    <i className="ri-close-line text-2xl"></i>
                </button>
            </div>
        </div>
    );

};

export default DialogBox;
