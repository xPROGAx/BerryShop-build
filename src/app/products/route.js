import { NextResponse } from 'next/server';
import Papa from 'papaparse';
import NodeCache from 'node-cache';

const cache = new NodeCache({ stdTTL: 600 }); // 10 минут

const SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSw5APjLniZiW1W97l0ByzPFfy6zmy1hjP9b9s9VWtC8rZiU7QK0bap3IoYlFYn_RdFc2rJFlsER3QT/pub?output=csv';

async function fetchSheetData() {
  const csvResponse = await fetch(SHEET_URL);
  const csvText = await csvResponse.text();

  return new Promise((resolve) => {
    Papa.parse(csvText, {
      header: true,
      complete: (res) => resolve(res.data)
    });
  });
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    // Проверяем кэш для всех продуктов
    const cachedAllProducts = cache.get('all_products');
    if (cachedAllProducts) {
      // Если есть кэш и не запрошена фильтрация - возвращаем все
      if (!category) return NextResponse.json(cachedAllProducts);
      
      // Фильтруем по категории
      const filtered = cachedAllProducts.filter(product => 
        product.category.includes(category)
      );
      return NextResponse.json(filtered);
    }

    const rawData = await fetchSheetData();
    if (!rawData) {
      throw new Error('Данные не были получены');
    }

    const products = rawData.map((product, index) => ({
      id: product.id || `auto-${index}`,
      name: product.name,
      price: product.price.split(',').map(q => Number(q.trim())),
      image: product.image.trim(),
      // Преобразуем категории в массив (разделитель может быть запятая или точка с запятой)
      category: product.category 
        ? product.category.split(/[,;]/).map(c => c.trim()).filter(c => c)
        : [],
      description: product.description || '',
      images: product.sliders ? product.sliders.split(',').map(i => i.trim()) : [],
      options: {
        size: product.options_size ? product.options_size.split(',').map(s => s.trim()) : [],
        quantity: product.options_quantity ? product.options_quantity.split(',').map(q => Number(q.trim())) : []
      },
    }));

    // Кэшируем все продукты
    cache.set('all_products', products);

    // Если категория не указана - возвращаем все
    if (!category) return NextResponse.json(products);

    // Фильтруем продукты по категории
    const filteredProducts = products.filter(product => 
      product.category.includes(category)
    );

    return NextResponse.json(filteredProducts);
  } catch (err) {
    console.error('API ошибка:', err);
    return NextResponse.json({ error: 'Ошибка загрузки данных' }, { status: 500 });
  }
}
