import React, { memo } from 'react';
import Sliders from "react-slick";


const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
};

const Slider = ({ images }) => {

    return (
        <div className='w-full'>
            <Sliders {...settings}>
                {images?.length > 0 && images?.map((item, index) => {
                    return (
                        <div key={index} className='bg-black flex justify-center h-[320px] px-12'>
                            <img
                                src={item}
                                alt='ảnh'
                                className='m-auto h-full object-contain'
                            />
                        </div>
                    )
                })}
            </Sliders>
        </div>
    )
}

export default memo(Slider)