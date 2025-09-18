import React from "react";
import Marquee from "@/components/Marquee";

const Header = () => {
  return (
    <header className="bg-F8DAD8 text-center py-8 md:py-10 lg:py-12">
      {/* Заголовок */}
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-9E0E05 px-4">
        Свежая клубника в шоколаде и цветы
      </h1>
      <p className="text-lg md:text-xl text-49321d mt-3 md:mt-4 px-4">
        Подарите радость и сладкие моменты
      </p>

      {/* Бегущая строка */}
      <div className="mt-4 md:mt-6 px-4">
        <Marquee />
      </div>
    </header>
  );
};

export default Header;
