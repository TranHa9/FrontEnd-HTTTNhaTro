import React from 'react';
import { CreatePost } from '../containers/System'
import { FaXmark } from 'react-icons/fa6';
import { GrLinkNext, GrLinkPrevious } from 'react-icons/gr';
import { resetDataEdit } from '../store/actions';
import { useDispatch } from 'react-redux';

const ModalPost = ({ setIsEdit }) => {
    const dispatch = useDispatch()
    return (
        <div
            className='absolute top-0 left-0 right-0 bottom-0 bg-overlay-50 flex justify-end'
            onClick={e => {
                e.stopPropagation()
                setIsEdit(false)
                dispatch(resetDataEdit())
            }}
        >
            <div
                className='bg-white max-w-1100 w-full overflow-y-auto'
                onClick={e => e.stopPropagation()}
            >
                <div className='relative'>
                    <span
                        onClick={e => {
                            e.stopPropagation()
                            setIsEdit(false)
                            dispatch(resetDataEdit())
                        }}
                        className='cursor-pointer absolute top-5 right-10 bottom-0'
                    ><FaXmark size={30} color='red' /></span>
                    <div className=''>
                        <CreatePost isEdit />
                    </div>
                </div>
            </div>
        </div >
    )
}

export default ModalPost