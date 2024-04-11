import React from 'react';
import { InputFormV2, InputReadOnly, Select } from './';
import { useSelector } from "react-redux";

const targets = [
    { code: 'Nam', value: 'Nam' },
    { code: 'Nữ', value: 'Nữ' },
]


const Overview = ({ payload, setPayload }) => {
    const { categories } = useSelector(state => state.app)
    const { currentData } = useSelector(state => state.user)
    return (
        <div>
            <h2 className='font-semibold text-xl py-4'>Thông tin mô tả</h2>
            <div className='w-full flex flex-col gap-4'>
                <div className='w-1/2'>
                    <Select value={payload.categoryCode} setValue={setPayload} name='categoryCode' options={categories} label='Loại chuyên mục' />
                </div>
                <InputFormV2 value={payload.title} setValue={setPayload} name='title' label={'Tiêu đề'} />
                <div className='flex flex-col gap-2'>
                    <label className='font-medium' htmlFor='desc'>Nôi dung mô tả</label>
                    <textarea
                        className='w-full rounded-md outline-none border border-gray-300 p-2'
                        id='desc'
                        cols={30}
                        rows={10}
                        value={payload.description}
                        onChange={(e) => setPayload(prev => ({ ...prev, description: e.target.value }))}
                    ></textarea>
                </div>
                <div className='w-1/2 flex flex-col gap-4'>
                    <InputReadOnly label={'Thông tin liên hệ'} value={currentData?.name || currentData?.username} />
                    <InputReadOnly label={'Điện thoại'} value={currentData?.phone} />
                    <InputFormV2
                        small='Nhập đầy đủ số, ví dụ 1 triệu thì nhập là 1000000'
                        label={'Giá cho thuê'}
                        unit={'đồng'}
                        value={payload.priceNumber}
                        setValue={setPayload}
                        name='priceNumber'
                    />
                    <InputFormV2
                        label={'Diện tích'}
                        unit={'m2'}
                        value={payload.areaNumber}
                        setValue={setPayload}
                        name='areaNumber'
                    />
                    <Select
                        options={targets}
                        label={'Đối tượng cho thuê'}
                        value={payload.target}
                        setValue={setPayload}
                        name='target'
                    />
                </div>
            </div>
        </div>
    )
}

export default Overview