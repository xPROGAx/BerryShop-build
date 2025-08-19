'use client';

import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { useCart } from '../store/cartContext';
import { useSheetProducts } from '../hooks/useSheetProducts';
import Image from 'next/image';
import ProductSlider from './ProductSlider';

const ProductsSection = ({ id, title, category }) => {
  const { addToCart } = useCart();
  
  const categories = typeof category === 'string' ? [category] : category;
  const { products, loading, error } = useSheetProducts(categories);

  // Фильтруем продукты по категориям
  const filteredProducts = products.filter(product => {
    // Если у продукта категория - строка, проверяем вхождение
    if (typeof product.category === 'string') {
      return categories.includes(product.category);
    }
    // Если у продукта категории - массив, проверяем пересечение
    if (Array.isArray(product.category)) {
      return product.category.some(cat => categories.includes(cat));
    }
    return false;
  });

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedOption, setSelectedOption] = useState('');
  const [finalPrice, setFinalPrice] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  const openModal = useCallback((product) => {
    setSelectedProduct(product);
    const firstOption = product.options.size?.[0];
    const firstPrice = product.price?.[0];
    setSelectedOption(firstOption || '');
    setFinalPrice(firstPrice || 0);
    setIsModalOpen(true);
    setSelectedImage(product.image);
  }, []);

  const closeModal = useCallback(() => {
    setSelectedProduct(null);
    setIsModalOpen(false);
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${window.innerWidth - document.documentElement.clientWidth}px`; // Компенсация для скроллбара
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [isModalOpen]);

  const handleAddToCart = () => {
    if (!selectedOption) {
      alert('Выберите вариант!');
      return;
    }
    addToCart({ ...selectedProduct, selectedOption, price: finalPrice });
    closeModal();
  };

  // Лоадер или ошибка
  if (loading) return <div className="loader">Загрузка...</div>;
  if (error) return <p className="text-red-500">Ошибка: {error}</p>;

  return (
    <section id={id} className="my-8">
      <h2 className="text-2xl font-bold text-center mb-4">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-11/12 ml-auto mr-auto">
        {loading ? (
          <div className="loader">Загрузка...</div>
        ) : error ? (
          <p className="text-red-500">Ошибка: {error}</p>
        ) : filteredProducts.length === 0 ? (
          <p className="text-center">Нет товаров в этой категории.</p>
        ) : (
          filteredProducts.map((product) => {
              if (!product.name || !product.price || !product.image) {
                console.error(`Ошибка: отсутствуют обязательные данные для продукта с id ${product.id}`);
                return null;
              }

              // Если у продукта есть несколько изображений, показываем слайдер
              const isSlider = product.images && Array.isArray(product.images) && product.images.length > 1;

              return (
                <div key={product.id} className="bg-white p-4 rounded-lg shadow-md flex flex-col justify-between">
                  <div className="relative w-full 2x1:h-100">
                    {isSlider ? (
                      <ProductSlider images={product.images} productName={product.name} />
                    ) : (
                      <Image
                        src={product.image}
                        alt={product.name}
                        className="object-cover rounded-md cursor-pointer w-100 h-130"
                        width={300}
                        height={400}
                        onClick={() => openModal(product)}
                        loading="lazy"
                      />
                    )}
                  </div>
                  <h3 className="mt-2 text-lg font-semibold">{product.name}</h3>
                  <p className="text-sm text-gray-500 line-clamp-2">{product.description || 'Без описания'}</p>
                  <p className="text-red-500 font-bold">{product.price[0]} ₽</p>
                  <button
                    className="mt-2 bg-[#F1ADAE] text-white px-4 py-2 rounded-md shadow-md hover:bg-[#ec9898] transition"
                    onClick={() => openModal(product)}
                  >
                    Заказать
                  </button>
                </div>
              );
            })
        )}
      </div>

      {/* Модалка с слайдером */}
      {isModalOpen && selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 backdrop-blur-sm animate-fade-in overflow-y-auto py-8" 
            onClick={closeModal}>
          <div
            className="bg-white w-full max-w-lg p-6 rounded-2xl shadow-2xl transform transition-all scale-100 animate-fade-in max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-xl font-bold text-gray-500"
              onClick={closeModal}
            >
            </button>
            <h3 className="text-xl font-bold text-center mb-2">{selectedProduct.name}</h3>
            <p className="text-gray-600 text-center">{selectedProduct.description || 'Без описания'}</p>

            <div className="mb-4">
              <ProductSlider images={selectedProduct.images} productName={selectedProduct.productName}/>
            </div>
            <div className='flex'>
              {selectedProduct.options.size?.map((option, index) => (
                <div
                  key={index}
                >
                  <button
                    onClick={() => {
                      setSelectedOption(option)
                      setFinalPrice(selectedProduct.price[index])
                    }}
                    className={`${selectedOption === option ? 'bg-gray-300' : ''} rounded-2xl p-2 hover:bg-gray-100 transition-colors`}
                  >
                    {option}
                  </button>
                </div>
              ))}
            </div>


            <p className="text-lg font-bold text-red-600 mb-4">Итого: {finalPrice} ₽</p>
            <button
              onClick={handleAddToCart}
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
            >
              Добавить в корзину
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductsSection;