import React, { useState } from 'react'
import { FaXmark } from 'react-icons/fa6'
import validate from '../ultils/Common/validateField';
import Swal from 'sweetalert2';
import Button from './Button';
import { apiUpdatePost } from '../services';
import * as actions from '../store/actions'
import { useDispatch } from 'react-redux';
import { createBrowserHistory } from 'history';


const ModalComment = ({ setIsModal, refuse, setRefuse, report, type }) => {
    const dispatch = useDispatch()
    const history = createBrowserHistory()
    const [payload, setPayload] = useState({
        content: '',
    })
    const [invalidFields, setInvalidFields] = useState([]);
    const handleSubmit = async () => {
        let invalids = validate(payload, setInvalidFields)
        if (invalids === 0) {
            refuse.report = payload.content
            const response = await apiUpdatePost(refuse)
            if (response?.data.err === 0) {
                Swal.fire("Thông báo", "Đã từ chối", "success").then(() => {
                    setRefuse({
                        status: 'Đã từ chối'
                    })
                    dispatch(actions.getPostsStatus())
                    type && history.back();
                    setIsModal(false)
                })
            } else {
                Swal.fire("Thông báo", "Đã có lỗi", 'error')
            }
        }
    }
    return (
        <div
            className='absolute top-0 left-0 right-0 bottom-0 bg-overlay-50 flex justify-end z-50'
            onClick={e => {
                e.stopPropagation()
                setIsModal(false)
            }}
        >
            <div
                className='bg-white max-w-600 w-full overflow-y-auto'
                onClick={e => e.stopPropagation()}
            >

                <div className='p-5 flex flex-col gap-6'>
                    <div className='py-4 border-b border-gray-300 flex items-center justify-between'>
                        <h1 className='text-3xl font-medium'>{report ? 'Nguyên nhân' : 'Từ chối duyệt'}</h1>
                        <span
                            onClick={e => {
                                e.stopPropagation()
                                setIsModal(false)
                            }}
                            className='cursor-pointer'
                        ><FaXmark size={30} color='red' /></span>
                    </div>
                    <div>
                        <label className='font-medium' htmlFor='comment'>Nôi dung sai phạm</label>
                        {report ?
                            <p className='mt-4 mb-5'>{report}</p>
                            :
                            <div>
                                <textarea
                                    className='w-full rounded-md outline-none border border-gray-300 p-2'
                                    id='comment'
                                    cols={30}
                                    rows={10}
                                    value={payload.content}
                                    onChange={e => setPayload(prev => ({ ...prev, content: e.target.value }))}
                                    onFocus={() => setInvalidFields([])}
                                />
                                {invalidFields?.some(i => i.name === 'content') && <small className="text-red-500">{invalidFields.find(i => i.name === 'content')?.message}</small>}
                            </div>
                        }
                        {report ? <Button text={'Đóng'}
                            bgColor={'bg-redcover'}
                            textColor={'text-white'}
                            fullwidth
                            onClick={e => setIsModal(false)}
                        />
                            : <Button text={'Xác nhận'}
                                bgColor={'bg-redcover'}
                                textColor={'text-white'}
                                fullwidth
                                onClick={handleSubmit}
                            />}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalComment