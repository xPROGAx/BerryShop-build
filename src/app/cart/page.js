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

const orderSchema = z.object({
  senderName: z.string().min(1, 'Имя отправителя обязательно'),
  senderEmail: z.string().email('Некорректный E-mail'),
  senderPhone: z.string()
    .min(10, 'Телефон должен содержать не менее 10 символов')
    .regex(/^[\d+]+$/, 'Телефон должен содержать только цифры'),
  contactMethod: z.string().optional(),
  deliveryDate: z.string().min(1, 'Выберите дату доставки'),
  deliveryTime: z.string().min(1, 'Выберите время доставки'),
  deliveryMethod: z.string().optional(),

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
        const phone = data.senderPhone.replace(/\D/g, '');
        const botUrl = `https://t.me/BerryShopAuthBot?start=${phone}_${code}`;
        window.open(botUrl, '_blank');

        setGeneratedCode(code);
        setPhone(phone);
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
    message += `- Телефон: ${formData.senderPhone}\n\n`;

    message += `<b>📅 Доставка:</b>\n`;
    message += `- Дата: ${formData.deliveryDate}\n`;
    message += `- Время: ${formData.deliveryTime}\n\n`;

    // Добавляем содержимое корзины
    message += `<b>🛒 Товары:</b>\n`;
    cart.forEach((item, index) => {
      message += `${index + 1}. ${item.name} (${item.selectedOption}) - ${item.quantity} × ${item.price}\n`;
    });

    message += `\n<b>💰 Итого: ${total} ₽</b>`;

    // Отправляем запрос к Telegram API
    const response = await fetch(`https://api.telegram.org/bot7969947917:AAGPqZxT7FxAmbR4HA8ntRVPTh0seL51law/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        chat_id: '581497267',
        text: message,
        parse_mode: 'HTML'
      })
    });

    const data = await response.json();

    alert('Спасибо за заказ, скоро с вами свяжется менеджер')

    if (!response.ok) {
      console.error('Ошибка Telegram API:', data);
      throw new Error('Ошибка отправки сообщения');
    }

    console.log('Сообщение успешно отправлено:', data);

    return true;
  } catch (error) {
    console.error('Ошибка при отправке данных:', error);

    return false;
  }
}

  const [currentTime, setCurrentTime] = useState(new Date());

  // Обновляем текущее время каждую минуту
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
    { value: "12:00", label: "12:00" },
    { value: "15:00", label: "15:00" },
    { value: "18:00", label: "18:00" }
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
                <div className="flex items-center">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={150}
                    height={250}
                    className="object-cover mx-auto rounded-md"
                  />
                  <div className='ml-5'>
                    <p className="font-semibold">{product.name}</p>
                    <p className="text-sm">{product.price}</p>
                    <p className="text-sm">{product.selectedOption}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => decreaseQuantity(product.id, product.selectedOption)}
                    className="px-2 py-1 bg-gray-200 rounded"
                  >
                    -
                  </button>
                  <span>{product.quantity}</span>
                  <button
                    onClick={() => increaseQuantity(product.id, product.selectedOption)}
                    className="px-2 py-1 bg-gray-200 rounded"
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
              </li>
            ))}
          </ul>

          <div className="mt-6 flex justify-between items-center">
            <p className="font-semibold">Итоговая сумма: {total} ₽</p>
            <button
              onClick={clearCart}
              className="bg-red-500 text-white py-2 px-4 rounded-md"
            >
              Очистить корзину
            </button>
          </div>

          <div className="mt-4">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-green-500 text-white py-2 px-4 rounded-md"
            >
              Оформить заказ
            </button>
          </div>
          <div className='mt-3 flex flex-col gap-2'>
            <p className='font-bold'>Количество клубники и урашения могут отличаться от представленных на фотографии.</p>
            <p className='font-bold'>Срок хранения фруктов в шоколаде 1 сутки.</p>
            <p className='font-bold'>Желательно употребить в течение первых 12 часов и хранить в холодильнике при температуре от +5 до +10 C.</p>
            <p className='font-bold'>Перед употреблением подержать при комнатной температуре 15 мин.</p>
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
                    <label>Имя отправителя</label>
                    <input
                      {...register('senderName')}
                      placeholder="Имя отправителя"
                      className="w-full p-2 border rounded-md"
                    />
                    {errors.senderName && (
                      <p className="text-red-500">{errors.senderName.message}</p>
                    )}
                  </div>

              <div>
                <label>E-mail отправителя</label>
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
                    <label>Телефон отправителя</label>
                    <input
                      {...register('senderPhone')}
                      placeholder="Телефон отправителя"
                      className="w-full p-2 border rounded-md"
                    />
                    {errors.senderPhone && (
                      <p className="text-red-500">{errors.senderPhone.message}</p>
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

              <div>
                <label>Время доставки</label>
                <select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="">Выберите время</option>
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
              </div>

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
                <input
                  {...register('agreeTerms')}
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => setIsChecked(!isChecked)}
                  className="form-checkbox"
                />
                <label>Я согласен с условиями*</label>
              </div>

              <div>
                <p>* Принимаем заказы по полной предоплате</p>
                <p>Укажите номер телефона и мессенджер, где будет удобно связаться с вами для подтверждения заказа и его оплаты</p>
                <p>Учитывайте, что срок годности клубники в шоколаде 24ч</p>
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