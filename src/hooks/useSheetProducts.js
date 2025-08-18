'use client';

import { useEffect, useState } from 'react';

function useSheetProducts() {  // Убираем параметр категории из хука
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');  // Запрашиваем все продукты
        if (!response.ok) {
          throw new Error('Ошибка загрузки данных с сервера');
        }
        const data = await response.json();

        console.log('Полученные данные продуктов:', data);

        if (Array.isArray(data)) {
          data.forEach(product => {
            if (!product.id || !product.name || !product.price || !Array.isArray(product.sliders)) {
              console.warn('Неверные данные для продукта:', product);
            }
          });
        }

        setProducts(data);
      } catch (err) {
        console.error('Ошибка:', err);
        setError('Не удалось загрузить данные');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);  // Пустой массив зависимостей - загружаем один раз при монтировании

  return { products, loading, error };
}

export { useSheetProducts };