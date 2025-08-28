import Image from 'next/image';
import price1 from '../../public/images/price1.PNG';
import price2 from '../../public/images/price2.PNG';

const Price = () => {

  return (
    <div className="ml-auto mr-auto mb-5 max-w-5/6 flex flex-wrap gap-10 justify-center">
      <Image 
        src={price1}
        alt='Цены'
        width={350}
        height={450}
      />
      <Image 
        src={price2}
        alt='Цены'
        width={350}
        height={450}
      />
    </div>
  )
}

export default Price;