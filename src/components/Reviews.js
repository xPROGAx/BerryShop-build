'use client'

import Image from "next/image";
import 'swiper/css'
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import { Navigation, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import arrow from '../../public/icons/arrow.svg';

import review from '../../public/images/review.PNG';
import review2 from '../../public/images/review2.PNG';
import review3 from '../../public/images/review3.PNG';
import review4 from '../../public/images/review4.PNG';
import review5 from '../../public/images/review5.PNG';
import review6 from '../../public/images/review6.PNG';
import review7 from '../../public/images/review7.PNG';
import review8 from '../../public/images/review8.PNG';
import review9 from '../../public/images/review9.PNG';
import review10 from '../../public/images/review10.PNG';

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
  {
    id:8,
    img: review8,
  },
  {
    id:9,
    img: review9,
  },
  {
    id:10,
    img: review10,
  },
]

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
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
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