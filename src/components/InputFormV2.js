import React from 'react'

const InputFormV2 = ({ label, unit, small, value, setValue, name }) => {
    return (
        <div className='flex flex-col gap-2'>
            <label className='font-medium' htmlFor='title'>{label}</label>
            <div className='flex items-center'>
                <input
                    className={`${unit ? 'rounded-lt-md rounded-lb-md' : 'rounded-md'} flex-auto outline-none border border-gray-300 p-2`}
                    type='text'
                    id='title'
                    value={value}
                    onChange={(e) => setValue(prev => ({ ...prev, [name]: e.target.value }))}
                />
                {unit && <span className='flex items-center rounded-tr-md rounded-br-md justify-center w-16 p-2 border bg-gray-300'>{unit}</span>}
            </div>
            {small && <small className='opacity-70'>{small}</small>}
        </div>
    )
}

export default InputFormV2