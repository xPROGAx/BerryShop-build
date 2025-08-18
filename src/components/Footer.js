import Link from "next/link";

const Footer = () => {
    return (
      <footer className="bg-[#49321D] text-white py-4">
        <div className="container mx-auto text-center">
          <p>&copy; 2025 Ваша Компания. Все права защищены.</p>
          <div className="mt-2">
            <Link href="/terms">
              <p className="text-white mx-2">Условия</p>
            </Link>
            <Link href="/privacy">
              <p className="text-white mx-2">Условия</p>
            </Link>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;  