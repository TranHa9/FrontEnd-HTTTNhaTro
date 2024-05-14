import React from 'react';
import { text } from '../ultils/dataContact';
import { Button } from '../components'
import { useNavigate } from 'react-router-dom';

const Contact = () => {
    const navigate = useNavigate()
    return (
        <div className='bg-white rounded-md shadow-md p-4 w-full flex flex-col justify-center items-center gap-6 mt-6'>
            <img
                src={text.image}
                alt="thumbnal"
                className='w-full h-48 object-contain'
            />
            <p>{text.content}</p>
            <div className='flex items-center justify-around w-full'>
                {text.contacts.map((item, index) => {
                    return (
                        <div key={index} className='flex flex-col items-center justify-center'>
                            <span className=' font-semibold'>{item.text}</span>
                            <span className='text-[#E03C31] text-[24px] font-semibold'>{item.phone}</span>
                            <span className='text-[#E03C31] text-[24px] font-semibold'>{item.zalo}</span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Contact