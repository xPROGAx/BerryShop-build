import React from "react";
import CategoryNav from "../../components/CategoryNav";
import ProductsSection from "../../components/ProductsSection";
import Marquee from "@/components/Marquee";

const categories = [
  { id: "bqt_sb_fl", name: "Букеты с клубникой и цветами" },
  { id: "basket", name: "Шляпные коробочки и корзинки с клубникой и цветами" },
  { id: "bqt_fl", name: "Букеты цветов" },
  { id: "combo", name: "Комбо и акции" },
  { id: "limit", name: "Лимитированные предложения" },
  { id: "popular", name: "Популярное" },
];

const FlowersPage = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-center my-6">Цветы</h1>

      <div className="mt-6">
        <Marquee />
      </div>

      <div className="container mx-auto px-4">
        <CategoryNav categories={categories} />

        {categories.map((category) => (
          <ProductsSection
            key={category.id}
            id={category.id}
            title={category.name}
            category={category.id}
          />
        ))}
      </div>
    </div>
  );
};

export default FlowersPage;