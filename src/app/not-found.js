import Link from 'next/link'
import notFoundImg from '../../public/images/notFoundImg.webp';
import Image from 'next/image';

export default function NotFound() {
  return <div>
      <Image 
        src={notFoundImg}
        alt='Окак'
        // width={100}
        // height={100}
        className='w-full h-100'
      />
      <div className='mt-5 mb-5'>
        <Link href="/">
          <p className='font-bold text-4xl ml-auto mr-auto w-100'>Вернуться назад</p>
        </Link>
      </div>
  </div>
}