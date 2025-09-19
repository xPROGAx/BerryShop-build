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
                    <Link 
                        href="/" 
                        className="flex items-center gap-2 hover:opacity-90 transition-opacity duration-200 group"
                    >
                        <div className="flex-shrink-0 h-[60px] flex items-center">
                            <Image 
                                src={logo} 
                                alt='BerryShop - Свежая клубника в шоколаде и цветы'
                                width={300}
                                height={60}
                                className="
                                    h-[50px] w-auto object-contain 
                                    md:h-[55px] 
                                    lg:h-[60px]  
                                "
                                priority
                                style={{ 
                                    maxWidth: 'none' 
                                }}
                            />
                        </div>
                        <span className="text-xl font-bold text-gray-800 whitespace-nowrap ml-1">
                            BERRYSHOP
                        </span>
                    </Link>

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
                                        className={`transition-colors duration-200 hover:text-red-600 py-2 text-base ${
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

                    <div className="flex items-center gap-4">
                        <div className="text-gray-700 whitespace-nowrap hidden lg:block">
                            <div className="font-semibold text-base">+7 (922) 400-09-40</div>
                            <div className="text-xs text-gray-600">Сургут</div>
                        </div>

                        <div className="relative">
                            <button
                                onClick={goToCart}
                                className="cursor-pointer flex items-center relative p-2 hover:bg-red-50 rounded-full transition-colors duration-200 group"
                                aria-label="Корзина покупок"
                            >
                                <Image
                                    src={cartIcon}
                                    width={28}
                                    height={28}
                                    alt=''
                                    className='object-contain text-gray-700 group-hover:text-red-600'
                                />
                                {cart.length > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
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
