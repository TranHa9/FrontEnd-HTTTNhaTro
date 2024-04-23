import React, { memo } from 'react';
import Slider from "react-slick";


const SliderCustom = ({ images }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    return (
        <div className='w-full'>
            <Slider {...settings}>
                {images?.length > 0 && images?.map((item, index) => {
                    return (
                        <div key={index} className='bg-black flex justify-center h-[320px]'>
                            <img
                                src={item}
                                alt='ảnh'
                                className='m-auto h-full object-contain'
                            />
                        </div>
                    )
                })}
            </Slider>
        </div >
    )
}

export default memo(SliderCustom)