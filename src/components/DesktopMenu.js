import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '../store/cartContext'
import { useRouter, usePathname } from 'next/navigation'
import logo from '../../public/icons/main-logo.png'
import cartIcon from '../../public/icons/cart.svg'
import { toast } from 'react-hot-toast';

const DesktopMenu = () => {
    const { cart } = useCart()
    const router = useRouter()
    const pathname = usePathname()

    const goToCart = () => {
        router.push('/cart')
    }

    return (
        <>
            <div className="h-[50px]"></div>
            <nav className="bg-[#FFFFFF] fixed top-0 left-0 w-full h-[50px] shadow-md z-50">
                <div className="container mx-auto flex justify-between items-center h-full px-4">
                    <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                        <Image 
                            src={logo} 
                            alt='BerryShop'
                            width={225}
                            height={36}
                            className="
                                w-[160px] h-[26px] object-contain
                                md:w-[180px] md:h-[29px]
                                lg:w-[200px] lg:h-[32px]
                                xl:w-[225px] xl:h-[36px]
                            "
                            priority
                        />
                        <span className="text-lg font-bold text-gray-800 whitespace-nowrap hidden md:block">
                            BerryShop
                        </span>
                    </Link>

                    <ul className="flex gap-6 text-black font-semibold">
                        {[
                            { name: 'Клубника в шоколаде', path: '/strawberry' },
                            { name: 'Цветы', path: '/flowers' },
                            { name: 'Акции', path: '/deals' },
                        ].map((item) => (
                            <li key={item.path} className="relative">
                                <Link
                                    href={item.path}
                                    className={`hover:text-red-500 ${pathname === item.path ? 'text-red-500' : ''
                                        }`}
                                >
                                    {item.name}
                                </Link>
                                {pathname === item.path && (
                                    <span className="absolute bottom-[-3px] left-0 w-full h-[1px] bg-black"></span>
                                )}
                            </li>
                        ))}
                    </ul>

                    <div className="text-black mr-4 whitespace-nowrap hidden lg:block">
                        BerryShop +7 (922) 400-09-40
                    </div>

                    <div className="relative">
                        <button
                            onClick={goToCart}
                            className="cursor-pointer flex items-center relative"
                        >
                            <Image
                                src={cartIcon}
                                width={35}
                                height={35}
                                alt='Корзина покупок'
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

export default DesktopMenu
