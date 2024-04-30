import React from 'react'

const InputFormV2 = ({ label, unit, small, value, setValue, name, invalidFields, setInvalidFields, direction, type }) => {
    return (
        <div className={`flex  ${direction ? direction : 'flex-col gap-2'}`}>
            <label className='w-48 flex-none font-medium' htmlFor='title'>{label}</label>
            <div className='flex flex-auto flex-col items-center'>
                <div className='flex w-full items-center'>
                    <input
                        className={`${unit ? 'rounded-lt-md rounded-lb-md' : 'rounded-md'} flex-auto outline-none border border-gray-300 p-2`}
                        type={`${type ? type : 'text'}`}
                        id='title'
                        value={value}
                        onChange={(e) => setValue(prev => ({ ...prev, [name]: e.target.value }))}
                        onFocus={() => setInvalidFields && setInvalidFields([])}
                    />
                    {unit && <span className='flex items-center rounded-tr-md rounded-br-md justify-center w-16 p-2 border bg-gray-300'>{unit}</span>}
                </div>
                {invalidFields?.some(item => item.name === name) && <small className='text-red-500 block w-full'>
                    {invalidFields?.find(item => item.name === name)?.message}
                </small>}
            </div>
            {small && <small className='opacity-70 whitespace-nowrap'>{small}</small>}
        </div>
    )
}

export default InputFormV2