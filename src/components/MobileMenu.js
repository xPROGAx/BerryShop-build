import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '../store/cartContext'
import { useRouter, usePathname } from 'next/navigation'
import { useState } from 'react'
import extra from '../../public/icons/extra.svg'
import logo from '../../public/icons/main-logo.png'
import cartIcon from '../../public/icons/cart.svg'

const MobileMenu = () => {
    const { cart } = useCart()
    const router = useRouter()
    const pathname = usePathname()

    const goToCart = () => {
        router.push('/cart')
    }

    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <div className="h-[70px]"></div>
            <nav className="bg-white fixed top-0 left-0 w-full h-[70px] shadow-md z-50">
                <div className="container mx-auto flex justify-between items-center h-full px-4">
                    {/* Логотип */}
                    <Link 
                        href="/" 
                        className="flex items-center hover:opacity-90 transition-opacity duration-200"
                    >
                        <Image 
                            src={logo} 
                            alt='BerryShop'
                            width={160}
                            height={32}
                            className="w-[140px] h-[28px] object-contain md:w-[160px] md:h-[32px]"
                            priority
                        />
                    </Link>

                    {/* Правая часть - меню и корзина */}
                    <div className="flex items-center gap-3">
                        {/* Корзина */}
                        <button
                            onClick={goToCart}
                            className="cursor-pointer flex items-center relative p-2 hover:bg-red-50 rounded-full transition-colors duration-200"
                            aria-label="Корзина"
                        >
                            <Image
                                width={28}
                                height={28}
                                alt=''
                                src={cartIcon}
                                className='object-contain'
                            />
                            {cart.length > 0 && (
                                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                    {cart.length}
                                </span>
                            )}
                        </button>

                        {/* Кнопка меню */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200 ml-2"
                            aria-label="Меню"
                        >
                            <Image
                                src={extra}
                                alt=''
                                width={28}
                                height={28}
                                className="object-contain"
                            />
                        </button>
                    </div>

                    {/* Мобильное меню */}
                    {isOpen && (
                        <div className="absolute top-full left-0 w-full bg-white shadow-xl border-t border-gray-200 animate-fadeIn">
                            {/* Контакты */}
                            <div className="p-4 bg-gradient-to-r from-red-50 to-pink-50 border-b">
                                <div className="text-lg font-bold text-gray-800">+7 (922) 400-09-40</div>
                                <div className="text-sm text-gray-600 mt-1">Сургут · Ежедневно 9:00-21:00</div>
                                <div className="text-xs text-gray-500 mt-2">
                                    Менеджер Юлия: +7 (917) 928-04-54
                                </div>
                            </div>
                            
                            {/* Навигация */}
                            <ul className='py-3'>
                                {[
                                    { name: 'Клубника в шоколаде', path: '/strawberry' },
                                    { name: 'Цветы', path: '/flowers' },
                                    { name: 'Акции', path: '/deals' },
                                ].map((item) => (
                                    <li key={item.path} className="border-b border-gray-100 last:border-b-0">
                                        <Link
                                            href={item.path}
                                            className={`block py-4 px-6 transition-colors duration-200 text-lg ${
                                                pathname === item.path 
                                                    ? 'text-red-600 bg-red-50 font-bold' 
                                                    : 'text-gray-800 hover:bg-gray-50'
                                            }`}
                                            onClick={() => setIsOpen(false)}
                                        >
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </nav>
            
            {/* Затемнение фона */}
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-30 z-40 mt-[70px] cursor-pointer"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </>
    )
}

export default MobileMenu
