// src/app/layout.js
import { Montserrat, Unbounded, Rubik_Mono_One, Great_Vibes } from 'next/font/google'
import './globals.css'
import { CartProvider } from '../store/cartContext'
import Menu from '../components/Menu'
import Footer from '../components/Footer'
import WhyUs from '../components/WhyUs'
import Reviews from '../components/Reviews'
import HowToFind from '../components/HowToFind'
import Price from '../components/Price'
import { Toaster } from 'react-hot-toast';

// Подключаем шрифты
const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '600'], // Обычный и жирный
})

const unbounded = Unbounded({
  variable: '--font-unbounded',
  subsets: ['latin', 'cyrillic'],
  weight: ['200'], // Extralight
})

const rubikMonoOne = Rubik_Mono_One({
  variable: '--font-rubik-mono-one',
  subsets: ['latin', 'cyrillic'],
  weight: ['400'],
})

const greatVibes = Great_Vibes({
  variable: '--font-great-vibes',
  subsets: ['latin'],
  weight: ['400'],
})

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="../icons/strawberry.ico" />
        <title>BerryShop – Клубника в шоколаде и цветы</title>
      </head>
      <body
        className={`${montserrat.variable} ${unbounded.variable} ${rubikMonoOne.variable} ${greatVibes.variable} antialiased`}
      >
        <CartProvider>
          <Menu />
          <main>{children}</main>
          <Price />
          <WhyUs />
          <Reviews />
          <HowToFind />
          <div className='flex flex-col gap-2 pt-5 pb-5 bg-[#9b655b] text-white'>
            <div className='mr-auto ml-auto'>
              <p className='font-medium'>Количество клубники и урашения могут отличаться от представленных на фотографии.</p>
              <p className='font-medium'>Срок хранения фруктов в шоколаде 1 сутки.</p>
              <p className='font-medium'>Желательно употребить в течение первых 12 часов и хранить в холодильнике при температуре от +5 до +10 C.</p>
              <p className='font-medium'>Перед употреблением подержать при комнатной температуре 15 мин.</p>
            </div>
          </div>
          <Footer />
          <Toaster position="top-center" reverseOrder={false} />
        </CartProvider>
      </body>
    </html>
  )
}
