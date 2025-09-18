import Header from "../components/Header";
import ProductsSection from "../components/ProductsSection";

export default function Home() {
  return (
    <main>
      <Header />
      <section className="text-center py-4 md:py-6 lg:py-8">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#9E0E05] px-4">
          Лучшие букеты и клубника в шоколаде
        </h2>
      </section>
      <ProductsSection id="products" category="popular" title="Популярные товары" />
    </main>
  );
}
