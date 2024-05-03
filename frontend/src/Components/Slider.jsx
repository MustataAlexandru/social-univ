import React from "react";
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import {Button, Card} from "flowbite-react";
import 'swiper/css/navigation'
import {Pagination} from "swiper/modules";


export default function Swiping({data}) {

    return (
        <div>
            <div className='container'>
                <Swiper style={{width: '40rem'}}
                        pagination={{
                            dynamicBullets: true,
                        }}
                        className="mySwiper"
                        modules={[Pagination]}
                        spaceBetween={0}
                        slidesPerView={1}
                        onSlideChange={() => console.log('slide change')}
                        onSwiper={(swiper) => console.log(swiper)}>
                    {data.map((item) => {
                        return (
                            <SwiperSlide key={item.post_id}>
                                <Card key={item.post_id} style={{margin: '0 auto'}} key={item.post_id}
                                      className="max-w-sm loading-f">
                                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
                                        {item.post_title}
                                    </h5>
                                    <h5 className='text-center'>{item.post_author}</h5>
                                    <p className='text-gray-400'>{item.post_date}</p>
                                    <p className="font-normal text-gray-700 dark:text-gray-400">
                                        {item.post_content}
                                    </p>
                                    <Button outline gradientDuoTone="greenToBlue">
                                        Vezi
                                    </Button>
                                </Card> </SwiperSlide>)
                    })}
                </Swiper>
            </div>
        </div>
    )
}