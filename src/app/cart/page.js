'use client';
import React, { useState, useEffect } from 'react';
import { useCart } from '../../store/cartContext';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Image from 'next/image';
import Link from 'next/link';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { registerLocale, setDefaultLocale } from "react-datepicker";
import ru from "date-fns/locale/ru";
import { toast } from 'react-hot-toast';

registerLocale('ru', ru);

const orderSchema = z.object({
  senderName: z.string().min(1, 'Имя отправителя обязательно'),
  senderEmail: z.string().email('Некорректный E-mail'),
  senderPhone: z.string().optional(),
  contactMethod: z.string().min(1, 'Выберите способ связи, ТГ, ВК, телефон'),
  deliveryDate: z.string().min(1, 'Выберите дату доставки'),
  // deliveryTime: z.string().min(1, 'Выберите время доставки'),
  deliveryTime: z.string().optional(),
  deliveryMethod: z.string().min(1, 'Выберите способ доставки'),

  recipientAddress: z.string().optional(),
  comment: z.string().optional(),
  promoCode: z.string().optional(),
  paymentMethod: z.string().optional(),
  agreeTerms: z
    .boolean()
    .refine((val) => val === true, 'Вы должны согласиться с условиями'),
});

const CartPage = () => {
  const { cart, removeFromCart, clearCart, increaseQuantity, decreaseQuantity } = useCart();
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [phone, setPhone] = useState(0);
  const [verificationStep, setVerificationStep] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: zodResolver(orderSchema),
  });

  useEffect(() => {
    setValue('deliveryDate', selectedDate.toLocaleDateString('ru-RU'));
  }, [selectedDate, setValue]);

  useEffect(() => {
    setValue('deliveryTime', selectedTime);
  }, [selectedTime, setValue]);

  useEffect(() => {
    console.log('Ошибки формы:', errors);
  }, [errors]);

  // Используем cart из контекста вместо локального состояния
  const total = cart.reduce(
    (sum, product) =>
      sum +
      parseFloat(String(product.price).replace(' ₽', '').replace(' ', '')) *
        (product.quantity || 1),
    0
  );

  const ADMIN_CHAT_IDS = [
    '581497267', 
    '1151637117',
    '882264045',
    '823779634',
    '878074165'
  ];

  const closeModal = () => {
    setIsModalOpen(false);
    setVerificationStep(false); // Сбрасываем шаг верификации
    setVerificationCode(''); // Очищаем код
  };

  const handleClickOutside = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const handleSubmitOrder = handleSubmit(async (data) => {
    if (cart.length === 0) {
      alert('Корзина пуста');
      return;
    }

    setIsSending(true);

    try {
      if (!verificationStep) {
        const code = Math.floor(1000 + Math.random() * 9000).toString();
        const botUrl = `https://t.me/BerryShopAuthBot?start=${phone}_${code}`;
        window.open(botUrl, '_blank');

        setGeneratedCode(code);
        setVerificationStep(true);
        return;
      }

      if (verificationCode !== generatedCode) {
        throw new Error('Неверный код подтверждения');
      }

      await sendData(data);
      setOrderConfirmed(true);
      clearCart();
      reset();
      closeModal(); // Закрываем модальное окно после успешного подтверждения

    } catch (error) {
      alert(`Ошибка: ${error.message}`);
    } finally {
      setIsSending(false);
    }
  });

  async function sendData(formData) {
  try {
    // Формируем сообщение для Telegram
    let message = `<b>📦 Новый заказ!</b>\n\n`;

    // Добавляем данные формы
    message += `<b>👤 Отправитель:</b>\n`;
    message += `- Имя: ${formData.senderName}\n`;
    message += `- Email: ${formData.senderEmail}\n`;
    message += `- Способ связи: ${formData.contactMethod}\n\n`;
    message += `- Способ доставки: ${formData.deliveryMethod}\n\n`;
    message += `- Дата: ${formData.deliveryDate}\n`;
    message += `- Время: ${formData.deliveryTime}\n\n`;

    // Добавляем содержимое корзины со ссылками на изображения
    message += `<b>🛒 Товары:</b>\n`;
    cart.forEach((item, index) => {
      message += `${index + 1}. ${item.name}\n`;
      message += `   🎯 Вариант: ${item.selectedOption}\n`;
      message += `   📦 Количество: ${item.quantity} × ${item.price}\n`;
      if (item.image) {
        message += `   📸 Изображение: ${item.image}\n`;
      }
      message += `\n`;
    });

    message += `\n<b>💰 Итого: ${total} ₽</b>`;

    // Отправляем сообщение всем администраторам
    const sendPromises = ADMIN_CHAT_IDS.map(async (chatId) => {
      try {
        // Отправляем текстовое сообщение
        const textResponse = await fetch(`https://api.telegram.org/bot7969947917:AAGPqZxT7FxAmbR4HA8ntRVPTh0seL51law/sendMessage`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            chat_id: chatId,
            text: message,
            parse_mode: 'HTML',
            disable_web_page_preview: true
          })
        });

        const textData = await textResponse.json();

        if (!textResponse.ok) {
          console.error(`Ошибка отправки сообщения для ${chatId}:`, textData);
          return { chatId, success: false, error: textData };
        }

        console.log(`Сообщение успешно отправлено для ${chatId}:`, textData);

        // Отправляем фотографии для каждого товара
        for (const item of cart) {
          if (item.image) {
            try {
              const photoMessage = `
                📸 <b>${item.name}</b>
                🎯 ${item.selectedOption}
                📦 ${item.quantity} × ${item.price}
              `.trim();

              await fetch(`https://api.telegram.org/bot7969947917:AAGPqZxT7FxAmbR4HA8ntRVPTh0seL51law/sendPhoto`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  chat_id: chatId,
                  photo: item.image,
                  caption: photoMessage,
                  parse_mode: 'HTML'
                })
              });

              // Задержка между отправками
              await new Promise(resolve => setTimeout(resolve, 500));
              
            } catch (photoError) {
              console.warn(`Не удалось отправить фото для ${item.name} пользователю ${chatId}:`, photoError);
              continue;
            }
          }
        }

        return { chatId, success: true };
      } catch (error) {
        console.error(`Ошибка при отправке для ${chatId}:`, error);
        return { chatId, success: false, error };
      }
    });

    // Ждем завершения всех отправок
    const results = await Promise.all(sendPromises);
    
    // Проверяем результаты
    const successfulSends = results.filter(result => result.success);
    const failedSends = results.filter(result => !result.success);

    console.log(`Успешно отправлено: ${successfulSends.length}, Не удалось: ${failedSends.length}`);

    if (successfulSends.length === 0) {
      throw new Error('Не удалось отправить заказ ни одному администратору');
    }

    alert('Спасибо за заказ, скоро с вами свяжется менеджер');

    return true;
  } catch (error) {
    console.error('Ошибка при отправке данных:', error);
    throw error; // Пробрасываем ошибку для обработки в handleSubmitOrder
  }
}

useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // 60 секунд

    return () => clearInterval(timer);
  }, []);

  // Функция для проверки, доступно ли время
  const isTimeAvailable = (timeStr) => {
    if (!timeStr) return true;
    
    const [hours, minutes] = timeStr.split(':').map(Number);
    const optionTime = new Date();
    optionTime.setHours(hours, minutes, 0, 0);
    
    // Добавляем 1 час (60 минут) к текущему времени для сравнения
    const comparisonTime = new Date(currentTime.getTime() + 60 * 60 * 1000);
    
    return optionTime > comparisonTime;
  };

  const timeOptions = [
    { value: "9:00", label: "9:00" },
    { value: "9:30", label: "9:30" },
    { value: "10:00", label: "10:00" },
    { value: "10:30", label: "10:30" },
    { value: "11:00", label: "11:00" },
    { value: "11:30", label: "11:30" },
    { value: "12:00", label: "12:00" },
    { value: "12:30", label: "12:30" },
    { value: "13:00", label: "13:00" },
    { value: "13:30", label: "13:30" },
    { value: "14:00", label: "14:00" },
    { value: "14:30", label: "14:30" },
    { value: "15:00", label: "15:00" },
    { value: "15:30", label: "15:30" },
    { value: "16:00", label: "16:00" },
    { value: "16:30", label: "16:30" },
    { value: "17:00", label: "17:00" },
    { value: "17:30", label: "17:30" },
    { value: "18:00", label: "18:00" },
    { value: "18:30", label: "18:30" },
    { value: "19:00", label: "19:00" },
    { value: "19:30", label: "19:30" },
    { value: "20:00", label: "20:00" },
    { value: "20:30", label: "20:30" },
    { value: "21:00", label: "21:00" },
  ];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Корзина</h1>
      {cart.length === 0 ? (
        <p>
          Корзина пуста.{' '}
          <Link href="/" className="text-blue-500">
            Вернуться к покупкам
          </Link>
        </p>
      ) : (
        <div>
          <ul>
            {cart.map((product, index) => (
              <li
                key={`${product.id}-${product.selectedOption}-${index}`}
                className="flex justify-between items-center py-4 border-b"
              >
                <div className="flex items-center flex-wrap">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={150}
                    height={250}
                    className="object-cover mx-auto rounded-md"
                  />
                </div>
                <div className="flex flex-wrap justify-between gap-2 ml-5 w-full">
                  <div className='ml-5'>
                    <p className="font-semibold">{product.name}</p>
                    <p className="text-sm">{product.price}</p>
                    <p className="text-sm">{product.selectedOption}</p>
                  </div>
                  <div>
                    <button
                      onClick={() => decreaseQuantity(product.id, product.selectedOption)}
                      className="px-2 py-1 m-4 bg-gray-200 rounded"
                    >
                      -
                    </button>
                    <span>{product.quantity}</span>
                    <button
                      onClick={() => increaseQuantity(product.id, product.selectedOption)}
                      className="px-2 m-4 py-1 bg-gray-200 rounded"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeFromCart(product.id, product.selectedOption)}
                      className="text-red-500 ml-4"
                    >
                      Удалить
                    </button>
                  </div>
                  
                </div>
              </li>
            ))}
          </ul>

          <p className="font-semibold">Итоговая сумма: {total} ₽</p>

          <div className="mt-6 flex justify-between items-center">
            <button
              onClick={clearCart}
              className="bg-red-500 text-white py-2 px-4 rounded-md"
            >
              Очистить корзину
            </button>

            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-green-500 text-white py-2 px-4 rounded-md"
            >
              Оформить заказ
            </button>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div
          onClick={handleClickOutside}
          className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-50 backdrop-blur-sm"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white p-8 rounded-md w-full max-w-lg relative max-h-[90vh] overflow-y-auto border-black border-1"
          >
            <button
              className="absolute top-4 right-4 text-xl font-bold text-gray-500"
              onClick={closeModal}
            >
              ×
            </button>

            <h2 className="text-2xl font-bold mb-6">
              {verificationStep ? 'Подтверждение телефона' : 'Оформление заказа'}
            </h2>

            <form onSubmit={handleSubmitOrder} className="space-y-4">
              {!verificationStep ? (
                <>
                <div>
                  <label>Имя заказчика</label>
                  <input
                    {...register('senderName')}
                    placeholder="Имя заказчика"
                    className="w-full p-2 border rounded-md"
                  />
                  {errors.senderName && (
                    <p className="text-red-500">{errors.senderName.message}</p>
                  )}
                </div>

              <div>
                <label>E-mail заказчика</label>
                <input
                  {...register('senderEmail')}
                  placeholder="E-mail"
                  className="w-full p-2 border rounded-md"
                />
                {errors.senderEmail && (
                  <p className="text-red-500">{errors.senderEmail.message}</p>
                )}
              </div>

              <div>
                <label>Укажите способ связи(ТГ, ВК, номер телефона)</label>
                <input
                  {...register('contactMethod')}
                  placeholder="@tg / +7(123)456 78-90"
                  className="w-full p-2 border rounded-md"
                />
                {errors.contactMethod && (
                  <p className="text-red-500">{errors.contactMethod.message}</p>
                )}
              </div>

              <div>
                <label>Укажите способ доставки</label>
                <select
                  {...register('deliveryMethod')}
                  className="w-full p-2 border rounded-md"
                >
                  <option defaultValue='Самовывоз'>Самовывоз</option>
                  <option value='Доставка'>Доставка</option>
                </select>
                {errors.deliveryMethod && (
                  <p className="text-red-500">{errors.deliveryMethod.message}</p>
                )}
              </div>

              <div>
                <label>Дата доставки</label>
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  dateFormat="dd/MM/yyyy"
                  className="w-full p-2 border rounded-md"
                  minDate={Date.now()}
                />
              </div>

              {/* <div>
                <label>Время доставки</label>
                <select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="" hidden disabled>Выберите время</option>
                  {timeOptions.map((option) => (
                    <option 
                      key={option.value}
                      value={option.value}
                      disabled={!isTimeAvailable(option.value)}
                    >
                      {option.label}
                    </option>
                  ))}
                </select>
              </div> */}

              </>
              ) : (
                <>
                  <div>
                    <label>Введите код подтверждения</label>
                    <input
                      type="number"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                      placeholder="Код из Telegram"
                      className="w-full p-2 border rounded-md"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Проверьте Telegram для получения кода
                    </p>
                  </div>
                </>
              )}

              <div className="flex items-center space-x-2">
                <label>
                  <input
                    {...register('agreeTerms')}
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => setIsChecked(!isChecked)}
                    className="form-checkbox"
                  /> Я согласен с условиями*
                </label>
              </div>

              <div>
                <p className='font-light'>* Принимаем заказы по полной предоплате</p>
                <p className='font-light'>Укажите номер телефона и мессенджер, где будет удобно связаться с вами для подтверждения заказа и его оплаты</p>
                <p className='font-light'>Учитывайте, что срок годности клубники в шоколаде 24ч</p>
              </div>

              <button
                type="submit"
                className="bg-green-500 text-white py-2 px-4 rounded-md mt-4 disabled:opacity-50"
                disabled={!isChecked || isSending}
              >
                {verificationStep
                  ? (isSending ? 'Проверка...' : 'Подтвердить заказ')
                  : (isSending ? 'Подготовка...' : 'Получить код')}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;