const AppFooter: React.FC = () => {
  return (
   <footer className="w-full bg-white shadow-md py-3 footer-mobile">
  <div className="container mx-auto px-4">
    <p className="text-center text-sm text-gray-700">
      © {new Date().getFullYear()} <span className="font-medium">Progress Alliance Foundation</span>. 
      All Rights Reserved. | Designed with{" "}
      <span className="text-red-500">❤</span> by{" "}
      <a 
        href="https://shopnoecommerce.com" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="text-black-600 hover:underline font-medium"
      >
        Shopno E-commerce Private Limited
      </a>
    </p>
  </div>
</footer>





  );
};

export default AppFooter;
