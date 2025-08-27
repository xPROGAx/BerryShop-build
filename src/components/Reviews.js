'use client'

import Image from "next/image";
import 'swiper/css'
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import { Navigation, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import arrow from '../../public/icons/arrow.svg';

import review from '../../public/images/review.jpg';
import review2 from '../../public/images/review2.jpg';
import review3 from '../../public/images/review3.jpg';
import review4 from '../../public/images/review4.jpg';
import review5 from '../../public/images/review5.jpg';
import review6 from '../../public/images/review6.jpg';
import review7 from '../../public/images/review7.jpg';

const data = [
  {
    id:1,
    img: review,
  },
  {
    id:2,
    img: review2,
  },
  {
    id:3,
    img: review3,
  },
  {
    id:4,
    img: review4,
  },
  {
    id:5,
    img: review5,
  },
  {
    id:6,
    img: review6,
  },
  {
    id:7,
    img: review7,
  },
]

console.log(data);


const Reviews = () => {

    return (
      <div className="bg-white py-8">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-[#9E0E05] mb-5">Отзывы покупателей</h2>
          <div>
            <Swiper
              modules={[Navigation, Autoplay]}
              slidesPerView={1}
              loop='true'
              autoplay={
                'delay: 1000'
              }
              navigation={{
                nextEl: '.swiper-button-left',
                prevEl: '.swiper-button-right'
              }}
              spaceBetween={20}
              breakpoints={{
                720: {
                  slidesPerView: 3,
                }
              }}
            >
              {data.map((photo) => (
                <SwiperSlide key={photo.id}>
                  <Image 
                    src={photo.img}
                    width={200}
                    height={300}
                    alt="review"
                    className="w-110 h-110 object-contain"
                  />
                </SwiperSlide>
              ))}

              <Image
                src={arrow}
                alt='arrow'
                width={30}
                className='swiper-button-left'
              />
      
              <Image
                src={arrow}
                alt='arrow'
                height={30}
                className='swiper-button-right'
              />

            </Swiper>
          </div>
        </div>
      </div>
    );
  };

  export default Reviews;