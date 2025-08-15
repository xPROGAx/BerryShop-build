'use client'

import React from "react";
import CategoryNav from "../../components/CategoryNav";
import ProductsSection from "../../components/ProductsSection";
import Marquee from "@/components/Marquee";

const categories = [
  { id: "bqt_sb_fl", name: "Букеты с клубникой и цветами" },
  { id: "bqt_sb", name: "Букеты из клубники" },
  { id: "basket", name: "Шляпные коробочки и корзинки с клубникой и цветами" },
  { id: "set", name: "Наборы из клубники" },
  { id: "cake", name: "Торты из клубники" },
  { id: "bqt_fl", name: "Букеты цветов" },
  { id: "combo", name: "Комбо и акции" },
  { id: "other", name: "Шоколад и прочее" },
  { id: "limit", name: "Лимитированные предложения" },
  { id: "popular", name: "Популярное" },
];

const StrawberryPage = () => {

  return (
    <div>
      <h1 className="text-3xl font-bold text-center my-6">Клубника в шоколаде</h1>

      <div className="mt-6">
        <Marquee />
      </div>

      <div className="container mx-auto px-4">
        <CategoryNav
          categories={categories}
        />

        {categories.map((category) => (
            <div key={category.id} id={category.id} className="my-8">
              <ProductsSection
                title={category.name}
                category={category.id}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default StrawberryPage;