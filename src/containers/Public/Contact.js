import React, { useState } from 'react'
import { Button, InputForm } from '../../components'
import Swal from 'sweetalert2';
import validate from '../../ultils/Common/validateField';

const Contact = () => {
    const [payload, setPayload] = useState({
        name: '',
        phone: '',
        content: '',
    })
    const [invalidFields, setInvalidFields] = useState([]);
    const handleSubmit = () => {
        let invalids = validate(payload, setInvalidFields)
        if (invalids === 0) {
            Swal.fire(`Cảm ơn ${payload.name}`, 'Phản hồi đã được chúng tôi ghi nhận!', 'success').then(() => {
                setPayload({
                    name: '',
                    phone: '',
                    content: '',
                })
            })
        }
    }
    return (
        <div className='w-full'>
            <h1 className='text-2xl font-semibold my-6'>Liên hệ</h1>
            <div className='flex gap-4'>
                <div className='flex-1 flex flex-col gap-4 h-fit bg-redcover rounded-3xl p-4 text-white bg-gradient-to-br from-[#E03C31] to-[#af82b2ee]'>
                    <h4 className='font-medium'>Thông tin liên hệ</h4>
                    <span>Cảm ơn đã chọn chúng tôi</span>
                    <span>Điện thoại: 0123 456 789</span>
                    <span>Email: phongtro@gmail.com</span>
                    <span>Zalo: 0123 456 789</span>
                    <span>Viber: 0123 456 789</span>
                    <span>Địa chỉ: Trâu Qùy - Gia Lâm - Hà Nội</span>
                </div>
                <div className='flex-1 bg-white shadow-md rounded-3xl pt-5 pb-8 px-8 mb-8'>
                    <h4 className='font-bold text-xl mb-6'>Liên hệ trực tuyến</h4>
                    <div className=' flex flex-col gap-5'>
                        <InputForm
                            label={'Họ và tên'}
                            value={payload.name}
                            setValue={setPayload}
                            keyPayload='name'
                            invalidFields={invalidFields}
                            setInvalidFields={setInvalidFields}
                        />
                        <InputForm
                            label={'Số điện thoại'}
                            value={payload.phone}
                            setValue={setPayload}
                            keyPayload='phone'
                            invalidFields={invalidFields}
                            setInvalidFields={setInvalidFields}
                        />
                        <div>
                            <label htmlFor='desc'>Nội dung mô tả</label>
                            <textarea
                                id='desc'
                                cols={30} rows={3}
                                className="outline-none bg-[#e8f0fe] p-2 rounded-md w-full"
                                value={payload.content}
                                onChange={e => setPayload(prev => ({ ...prev, content: e.target.value }))}
                                name='content'
                                onFocus={() => setInvalidFields([])}
                            />
                            {invalidFields?.some(i => i.name === 'content') && <small className="text-red-500">{invalidFields.find(i => i.name === 'content')?.message}</small>}
                        </div>
                        <Button text={'Gửi liên hệ'}
                            bgColor={'bg-redcover'}
                            textColor={'text-white'}
                            fullwidth
                            onClick={handleSubmit}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact