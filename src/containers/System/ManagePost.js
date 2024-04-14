import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import *as actions from '../../store/actions';
import { formatDate } from '../../ultils/Common/formatDate';
import { Button } from '../../components'
import icons from '../../ultils/icons';

const ManagePost = () => {
    const { AiOutlineEdit, AiOutlineDelete } = icons
    const dispatch = useDispatch()
    const { postOfCurrent } = useSelector(state => state.post)
    useEffect(() => {
        dispatch(actions.getPostsLimitAdmin())
    }, [])

    const checkExpiration = (isoDateString) => {
        const expiryDate = new Date(isoDateString);
        const currentDate = new Date();
        if (expiryDate.getTime() >= currentDate.getTime()) {
            return "Đang hoạt động";
        } else {
            return "Đã hết hạn";
        }
    }

    return (
        <div className='flex flex-col gap-6'>
            <div className='py-4 border-b border-gray-300 flex items-center justify-between'>
                <h1 className='text-3xl font-medium'>Quản lý tin đăng</h1>
                <select className='outline-none border p-2 border-gray-300 rounded-md'>
                    <option value=''>Lọc theo trạng thái</option>
                </select>
            </div>
            <div className="">
                <table className="">
                    <thead>
                        <tr>
                            <th className="px-4 py-3 bg-gray-50 text-center text-xs font-bold uppercase">Mã tin</th>
                            <th className="px-4 py-3 bg-gray-50 text-center text-xs font-bold uppercase">Ảnh đại diện</th>
                            <th className="px-4 py-3 bg-gray-50 text-center text-xs font-bold uppercase">Tiêu đề</th>
                            <th className="px-4 py-3 bg-gray-50 text-center text-xs font-bold uppercase">Giá</th>
                            <th className="px-4 py-3 bg-gray-50 text-center text-xs font-bold uppercase">Ngày bắt đầu</th>
                            <th className="px-4 py-3 bg-gray-50 text-center text-xs font-bold uppercase">Ngày hết hạn</th>
                            <th className="px-4 py-3 bg-gray-50 text-center text-xs font-bold uppercase">Trạng thái</th>
                            <th className="px-4 py-3 bg-gray-50 text-center text-xs font-bold uppercase">Hoạt động</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {!postOfCurrent ? (
                            <tr>
                                <td className="px-4 py-3 whitespace-no-wrap">Bạn chưa có tin đăng nào</td>
                            </tr>
                        ) : (
                            postOfCurrent.map(item => (
                                <tr key={item.id}>
                                    <td className="px-4 py-3 whitespace-no-wrap">{item?.overviews?.code}</td>
                                    <td className="px-4 py-3 whitespace-no-wrap flex items-center justify-center">
                                        <img src={JSON.parse(item?.images?.image)[0] || ''} alt='ảnh của bài đăng' className='w-10 h-10 object-cover rounded-md' />
                                    </td>
                                    <td className="px-4 py-3 whitespace-no-wrap">{item?.title}</td>
                                    <td className="px-4 py-3 whitespace-no-wrap">{item?.attributes?.price}</td>
                                    <td className="px-4 py-3 whitespace-no-wrap">{formatDate(item?.overviews?.created)}</td>
                                    <td className="px-4 py-3 whitespace-no-wrap">{formatDate(item?.overviews?.expired)}</td>
                                    <td className="px-4 py-3 whitespace-no-wrap">{checkExpiration(item?.overviews?.expired)}</td>
                                    <td className="px-4 py-3 whitespace-no-wrap">
                                        <AiOutlineEdit />
                                        <AiOutlineDelete />
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ManagePost