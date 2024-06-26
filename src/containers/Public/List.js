import React, { useEffect, useState } from 'react';
import { Item, Loading, NoSearch } from '../../components';
import { getPostsLimit } from '../../store/actions/post';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

const List = ({ categoryId }) => {
    const dispatch = useDispatch()
    const [searchParams] = useSearchParams()
    const { posts } = useSelector(state => state.post)
    const [sort, setSort] = useState(0)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true);
        // Tạo một mảng để lưu các cặp key-value từ searchParams
        let params = []
        for (let entry of searchParams.entries()) {
            params.push(entry)
        }
        // Tạo đối tượng từ các cặp key-value trong params
        let searchParamsObject = {}
        params?.forEach(i => {
            if (Object.keys(searchParamsObject)?.some(item => item === i[0])) {
                // Nếu key đã tồn tại trong searchParamsObject, thêm giá trị vào mảng
                searchParamsObject[i[0]] = [...searchParamsObject[i[0]], i[1]]
            } else {
                // Nếu key chưa tồn tại, tạo key mới và gán giá trị là mảng chứa giá trị hiện tại
                searchParamsObject = { ...searchParamsObject, [i[0]]: [i[1]] }
            }
        })
        // Nếu có categoryId, thêm vào đối tượng searchParamsObject
        if (categoryId) searchParamsObject.categoryId = categoryId
        // Nếu sort bằng 1, thêm thuộc tính order vào đối tượng searchParamsObject
        if (sort === 1) searchParamsObject.order = ['createdAt', 'DESC']
        dispatch(getPostsLimit(searchParamsObject))
            .then(() => {
                setIsLoading(false);
            })
            .catch(() => {
                setIsLoading(false);
            });
    }, [searchParams, categoryId, sort])
    return (
        <div className='w-full p-2 bg-white shadow-lg rounded-md px-4'>
            <div className='flex items-center justify-between py-3'>
                <h4 className='text-2xl font-semibold'>Danh sách tin đăng</h4>
            </div>
            <div className='flex items-center gap-2 my-2'>
                <span>Sắp xếp:</span>
                <span onClick={() => setSort(0)} className={`bg-gray-200 p-2 rounded-md cursor-pointer hover:underline ${sort === 0 && 'text-red-500'}`}>Mặc định</span>
                <span onClick={() => setSort(1)} className={`bg-gray-200 p-2 rounded-md cursor-pointer hover:underline ${sort === 1 && 'text-red-500'}`}>Mới nhất</span>
            </div>
            {isLoading
                ?
                <div className='flex items-center justify-center h-[250px]'>
                    <Loading />
                </div>
                :
                !posts?.length
                    ?
                    <NoSearch />
                    :
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
                                    name={item?.name}
                                    user={item?.user}
                                    id={item?.id}
                                    item={item}
                                    status={item?.status}
                                />
                            )
                        })}
                    </div>}
        </div>
    )
}
export default List
