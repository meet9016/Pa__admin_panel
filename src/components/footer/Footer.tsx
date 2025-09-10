// Define the interface for the props
interface HeaderProps {
    onClick?: () => void; // Optional function that takes no arguments and returns void
    onToggle: () => void;
}
const Footer: React.FC<HeaderProps> = () => {

    return (
        <header className="sticky top-0 flex w-full bg-white border-gray-200 z-99999 dark:border-gray-800 dark:bg-gray-900 lg:border-b">
            <div className="flex flex-col items-center justify-between grow lg:flex-row lg:px-6">
                <div
                    className={`items-center justify-between w-full gap-4 px-5 py-4 lg:flex shadow-theme-md lg:justify-end lg:px-0 lg:shadow-none`}
                >
                    <div className="flex items-center gap-2 2xsm:gap-3">
                        hello
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Footer;
