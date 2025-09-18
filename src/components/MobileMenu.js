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
            <div className="h-[50px]"></div>
            <nav className="bg-[#FFFFFF] fixed top-0 left-0 w-full h-[50px] shadow-md z-50">
                <div className="container mx-auto flex justify-between items-center h-full px-4">
                    <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                        <Image 
                            src={logo} 
                            alt='BerryShop'
                            width={180}
                            height={29}
                            className="w-[140px] h-[22px] object-contain md:w-[160px] md:h-[26px]"
                            priority
                        />
                        <span className="text-base font-bold text-gray-800 whitespace-nowrap md:hidden">
                            BerryShop
                        </span>
                    </Link>

                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="p-1"
                    >
                        <Image
                            className='hover:bg-gray-300 rounded-full p-1'
                            src={extra}
                            alt='Меню'
                            width={40}
                            height={40}
                        />
                    </button>

                    {isOpen && (
                        <div className="absolute top-full left-0 w-full bg-white shadow-lg border-t">
                            <ul className='flex flex-col gap-4 p-5 text-black font-semibold'>
                                {[
                                    { name: 'Клубника в шоколаде', path: '/strawberry' },
                                    { name: 'Цветы', path: '/flowers' },
                                    { name: 'Акции', path: '/deals' },
                                ].map((item) => (
                                    <li key={item.path} className="relative py-2 border-b last:border-b-0">
                                        <Link
                                            href={item.path}
                                            className={`hover:text-red-500 block ${pathname === item.path ? 'text-red-500' : ''}`}
                                            onClick={() => setIsOpen(false)}
                                        >
                                            {item.name}
                                        </Link>
                                        {pathname === item.path && (
                                            <span className="absolute bottom-0 left-0 w-full h-[1px] bg-black"></span>
                                        )}
                                    </li>
                                ))}
                                <li className="text-sm text-gray-600 pt-2">
                                    BerryShop +7 (922) 400-09-40
                                </li>
                                <li className="text-sm text-gray-600">
                                    Менеджер Юлия +7 (917) 928-04-54
                                </li>
                            </ul>
                        </div>
                    )}

                    <div className="relative">
                        <button
                            onClick={goToCart}
                            className="cursor-pointer flex items-center relative"
                        >
                            <Image
                                width={35}
                                height={35}
                                alt='Корзина покупок'
                                src={cartIcon}
                                className='object-contain'
                            />
                            {cart.length > 0 && (
                                <span className="absolute -top-1 -right-1 bg-[#F1ADAE] text-black text-xs font-bold rounded-full px-2">
                                    {cart.length}
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default MobileMenu
