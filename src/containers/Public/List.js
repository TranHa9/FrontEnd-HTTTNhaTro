import React, { useEffect } from 'react';
import { Button, Item } from '../../components';
import { getPosts, getPostsLimit } from '../../store/actions/post';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

const List = ({ categoryId }) => {
    const dispatch = useDispatch()
    const [searchParams] = useSearchParams()
    const { posts } = useSelector(state => state.post)
    useEffect(() => {
        let params = []
        for (let entry of searchParams.entries()) {
            params.push(entry)
        }
        let searchParamsObject = {}
        params?.forEach(i => {
            if (Object.keys(searchParamsObject)?.some(item => item === i[0])) {
                searchParamsObject[i[0]] = [...searchParamsObject[i[0]], i[1]]
            } else {
                searchParamsObject = { ...searchParamsObject, [i[0]]: [i[1]] }
            }
        })
        if (categoryId) searchParamsObject.categoryId = categoryId
        dispatch(getPostsLimit(searchParamsObject))
    }, [searchParams, categoryId])
    return (
        <div className='w-full p-2 bg-white shadow-md rounded-md px-4'>
            <div className='flex items-center justify-between py-3'>
                <h4 className='text-xl font-semibold'>Danh sách tin đăng</h4>
                <span>Cập nhật: 12/03/2024</span>
            </div>
            <div className='flex items-center gap-2 my-2'>
                <span>Sắp xếp:</span>
                <Button bgColor='bg-gray-200' text='Mặc định' />
                <Button bgColor='bg-gray-200' text='Mới nhất' />
            </div>
            <div className='items'>
                {posts?.length > 0 && posts.map(item => {
                    return (
                        <Item
                            key={item?.id}
                            address={item?.address}
                            price={item.price}
                            area={item?.area}
                            description={item?.description}
                            images={JSON.parse(item?.images)}
                            //star={+item?.star}
                            name={item?.name}
                            user={item?.user}
                            id={item?.id}
                        />
                    )
                })}
            </div>
        </div>
    )
}
export default List
