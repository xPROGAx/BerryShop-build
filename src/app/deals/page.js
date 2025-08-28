import { ProductsSection } from "@/components";

const MarqueeItem = ({ text }) => (
  <a
    href="/app/deals/page.js"
    className="flex items-center gap-1 sm:gap-2 sm:text-sm text-black whitespace-nowrap transition"
  >
    <span className="text-sm sm:text-base">🍓</span>
    <p className="hover:underline text-2xl">{text}</p>
  </a>
);

const categories = [
  { id: "stock", name: "Акции" },
];

const DealsPage = () => {
  return (
    <div className="mb-10">
      <h1 className="text-3xl font-bold text-center my-6">Акции</h1>

      <div className="relative overflow-hidden bg-[#cea5a1] py-2 sm:py-3 marquee">
      {/* Градиенты по краям */}
      <div className="absolute left-0 top-0 h-full w-6 sm:w-10 bg-gradient-to-r from-[#cea5a1] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 h-full w-6 sm:w-10 bg-gradient-to-l from-[#cea5a1] to-transparent z-10 pointer-events-none" />

      <div className="marquee-track">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="flex gap-x-4 px-2">
            <MarqueeItem text="Уточняйте у менеджера" />
          </div>
        ))}
      </div>
    </div>
      {categories.map((category) => (
        <ProductsSection
          key={category.id}
          id={category.id}
          title={category.name}
          category={category.id}
        />
      ))}
    </div>
  );
};

export default DealsPage;