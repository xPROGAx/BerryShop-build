import { Marquee, ProductsSection } from "@/components";

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

      <div className="mt-6">
        <Marquee />
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