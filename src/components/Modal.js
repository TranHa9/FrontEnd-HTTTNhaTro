import React, { useEffect, useState } from 'react';
import icons from '../ultils/icons';

const { GrLinkPrevious } = icons;

const Modal = ({ setIsShowModal, content, name }) => {

    const [persent1, setPersent1] = useState(0)
    const [persent2, setPersent2] = useState(100)

    useEffect(() => {
        const activedTrackEl = document.getElementById('track-active')
        if (persent2 <= persent1) {
            activedTrackEl.style.left = `${persent2}%`;
            activedTrackEl.style.right = `${100 - persent1}%`
        } else {
            activedTrackEl.style.left = `${persent1}%`;
            activedTrackEl.style.right = `${100 - persent2}%`
        }
    }, [persent1, persent2])

    const handleClickTrack = (e, value) => {
        e.stopPropagation()
        const stackEl = document.getElementById('track')
        const stacRect = stackEl.getBoundingClientRect()
        let persent = value ? value : Math.round((e.clientX - stacRect.left) * 100 / stacRect.width, 0)
        if (Math.abs(persent - persent1) <= (Math.abs(persent - persent2))) {
            setPersent1(persent)
        } else {
            setPersent2(persent)
        }
    }
    const convert100to15 = (persent) => {
        return (Math.ceil(Math.round((persent * 1.5)) / 5) * 5) / 10
    }
    return (
        <div
            onClick={(e) => { setIsShowModal(false) }}

            className='fixed top-0 left-0 right-0 bottom-0 bg-overlay-50 z-20 flex justify-center items-center'
        >
            <div
                onClick={(e) => {
                    e.stopPropagation()
                    setIsShowModal(true)
                }}
                className='w-1/3 bg-white rounded-md'
            >
                <div className='h-[45px] px-4 flex items-center border-b border-gray-100'>
                    <span
                        className='hover:text-red-600 cursor-pointer'
                        onClick={(e) => {
                            e.stopPropagation()
                            setIsShowModal(false)
                        }}
                    >
                        < GrLinkPrevious size={24} />
                    </span>
                </div>
                {(name === 'category' || name === 'province') && <div className='p-4 flex flex-col'>
                    {content?.map(item => {
                        return (
                            <span
                                key={item.code}
                                className='py-2 flex gap-2 items-center border-b border-gray-300'
                            >
                                <input type='radio' name={name} id={item.code} value={item.code} />
                                <label htmlFor={item.code}>{item.value}</label>
                            </span>
                        )
                    })}
                </div>}
                {(name === 'price' || name === 'area') && <div className='p-12 py-20'>
                    <div className='flex flex-col items-center justify-center relative'>
                        <div className='z-20 absolute top-[-48px] font-bold text-xl text-orange-600'>
                            {`Từ ${persent1 <= persent2 ? convert100to15(persent1) : convert100to15(persent2)} đến ${persent2 >= persent1 ? convert100to15(persent2) : convert100to15(persent1)} triệu +`}
                        </div>
                        <div onClick={handleClickTrack} id='track' className='silder-track h-[5px] absolute top-0 bottom-0 w-full bg-gray-300 rounded-full'></div>
                        <div onClick={handleClickTrack} id='track-active' className='silder-track-active h-[5px] absolute top-0 bottom-0 bg-orange-500 rounded-full'></div>
                        <input
                            max='100'
                            min='0'
                            step='1'
                            type='range'
                            value={persent1}
                            className='w-full appearance-none pointer-events-none absolute top-0 bottom-0'
                            onChange={(e) => setPersent1(+e.target.value)}
                        />
                        <input
                            max='100'
                            min='0'
                            step='1'
                            type='range'
                            value={persent2}
                            className='w-full appearance-none pointer-events-none absolute top-0 bottom-0'
                            onChange={(e) => setPersent2(+e.target.value)}
                        />
                        <div className='absolute z-30 top-6 left-0 right-0 flex justify-between items-center'>
                            <span
                                className='cursor-pointer'
                                onClick={(e) => {
                                    e.stopPropagation()
                                    handleClickTrack(e, 0)
                                }}
                            >
                                0
                            </span>
                            <span
                                className='mr-[-12px] cursor-pointer'
                                onClick={(e) => {
                                    e.stopPropagation()
                                    handleClickTrack(e, 100)
                                }}
                            >
                                15 triệu +
                            </span>
                        </div>
                    </div>
                </div>
                }
            </div>
        </div>
    )
}

export default Modal