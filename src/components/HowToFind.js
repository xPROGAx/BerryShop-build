import YandexMap from "./YandexMap";
import Link from "next/link";

const HowToFind = () => {
    return (
      <div className="bg-[#F1ADAE] py-8">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl font-semibold mb-4">Как нас найти</h2>
          <YandexMap />
          <p className="mt-4">
            Наш адрес: г. Сургут, ул. Ивана Захарова 11/1
          </p>
          <div className="flex justify-center gap-6 mt-4">
            <Link href="https://www.instagram.com/klubnika_surgut?igsh=eXJzdW9tb3ljbzRx" target="_blank" className="hover:text-[#5e3b3a]">
              <p>Instagram</p>
            </Link>
            <Link href="https://vk.com/berryshopsurgut" target="_blank" className="hover:text-[#5e3b3a]">
              <p>VK</p>
            </Link>
          </div>
        </div>
      </div>
    );
  };
  
  export default HowToFind;  