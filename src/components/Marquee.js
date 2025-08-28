// components/Marquee.js
'use client'
import toast from "react-hot-toast";

import React from "react";
function callManager() {
  toast.success('Для большей информации свяжитесь с менеджером')
}


const Marquee = () => {
  return (
    <div className="relative overflow-hidden bg-[#cea5a1] py-2 sm:py-3 marquee">
      {/* Градиенты по краям */}
      <div className="absolute left-0 top-0 h-full w-6 sm:w-10 bg-gradient-to-r from-[#cea5a1] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 h-full w-6 sm:w-10 bg-gradient-to-l from-[#cea5a1] to-transparent z-10 pointer-events-none" />

      <div className="marquee-track">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="flex gap-x-4 px-2">
            <button
              href="/app/deals/page.js"
              className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-black whitespace-nowrap transition"
              onClick={callManager}
            >
              <span className="text-sm sm:text-base">🍓</span>
              <p className="hover:underline">Бесплатная доставка от 5000₽</p>
            </button>

            <button
              href="/app/deals/page.js"
              className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-black whitespace-nowrap transition"
              onClick={callManager}
            >
              <span className="text-sm sm:text-base">🍓</span>
              <p className="hover:underline">Открытка в подарок!</p>
            </button>

            <button
              href="/app/deals/page.js"
              className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-black whitespace-nowrap transition"
              onClick={callManager}
            >
              <span className="text-sm sm:text-base">🍓</span>
              <p className="hover:underline">Промокод 3% на первый заказ</p>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marquee;