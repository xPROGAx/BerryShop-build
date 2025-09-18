import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '../store/cartContext'
import { useRouter, usePathname } from 'next/navigation'
import logo from '../../public/icons/main-logo.png'
import cartIcon from '../../public/icons/cart.svg'

const DesktopMenu = () => {
    const { cart } = useCart()
    const router = useRouter()
    const pathname = usePathname()

    const goToCart = () => {
        router.push('/cart')
    }

    return (
        <>
            <div className="h-[80px]"></div>
            <nav className="bg-white fixed top-0 left-0 w-full h-[80px] shadow-md z-50">
                <div className="max-w-7xl mx-auto flex justify-between items-center h-full px-4 lg:px-8">
                    {/* Логотип и название - левая часть */}
                    <Link 
                        href="/" 
                        className="flex items-center gap-3 hover:opacity-90 transition-opacity duration-200"
                    >
                        <div className="flex-shrink-0">
                            <Image 
                                src={logo} 
                                alt='BerryShop - Свежая клубника в шоколаде и цветы'
                                width={220}
                                height={44}
                                className="
                                    w-[180px] h-[36px] object-contain
                                    md:w-[200px] md:h-[40px]
                                    lg:w-[220px] lg:h-[44px]
                                "
                                priority
                            />
                        </div>
                        <span className="text-xl font-bold text-gray-800 whitespace-nowrap hidden xl:block ml-1">
                            BerryShop
                        </span>
                    </Link>

                    {/* Навигация - центр */}
                    <div className="flex-1 flex justify-center px-4">
                        <ul className="flex gap-8 text-gray-800 font-medium">
                            {[
                                { name: 'Клубника в шоколаде', path: '/strawberry' },
                                { name: 'Цветы', path: '/flowers' },
                                { name: 'Акции', path: '/deals' },
                            ].map((item) => (
                                <li key={item.path} className="relative group">
                                    <Link
                                        href={item.path}
                                        className={`transition-colors duration-200 hover:text-red-600 py-2 text-lg ${
                                            pathname === item.path 
                                                ? 'text-red-600 font-bold' 
                                                : 'text-gray-800'
                                        }`}
                                    >
                                        {item.name}
                                    </Link>
                                    <div className={`absolute bottom-0 left-0 w-full h-1 bg-red-600 transition-all duration-200 ${
                                        pathname === item.path 
                                            ? 'opacity-100' 
                                            : 'opacity-0 group-hover:opacity-60'
                                    }`}></div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Правая часть - контакты и корзина */}
                    <div className="flex items-center gap-6">
                        <div className="text-gray-700 whitespace-nowrap hidden lg:block">
                            <div className="font-semibold text-lg">+7 (922) 400-09-40</div>
                            <div className="text-sm text-gray-600">Сургут</div>
                        </div>

                        <div className="relative">
                            <button
                                onClick={goToCart}
                                className="cursor-pointer flex items-center relative p-3 hover:bg-red-50 rounded-full transition-colors duration-200 group"
                                aria-label="Корзина покупок"
                            >
                                <Image
                                    src={cartIcon}
                                    width={32}
                                    height={32}
                                    alt=''
                                    className='object-contain text-gray-700 group-hover:text-red-600'
                                />
                                {cart.length > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-red-600 text-white text-sm font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-sm">
                                        {cart.length}
                                    </span>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default DesktopMenu
