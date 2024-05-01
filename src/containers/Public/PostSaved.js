import React, { useEffect, useState } from 'react'
import { Item, NoSearch } from '../../components'
import { useSelector } from 'react-redux'

const PostSaved = () => {
    const { savePosts } = useSelector(state => state.post)
    return (
        <div className='w-full'>
            <div>
                <h1 className='text-3xl font-medium py-4 border-b border-gray-300'>Tin đã lưu</h1>
            </div>
            {
                !savePosts?.length
                    ?
                    <NoSearch />
                    :
                    savePosts?.length > 0 && savePosts.map(item => {
                        return (
                            <Item
                                key={item?.id}
                                address={item?.post?.address}
                                price={item?.post?.price}
                                area={item?.post?.area}
                                description={item?.post?.description}
                                images={JSON.parse(item?.post?.images)}
                                name={item?.post?.name}
                                user={item?.post?.user}
                                id={item?.postId}
                            />
                        )
                    })}
        </div>
    )
}

export default PostSaved