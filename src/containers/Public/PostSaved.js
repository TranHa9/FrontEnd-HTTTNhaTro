import React from 'react'
import { Item } from '../../components'
import { useSelector } from 'react-redux'

const PostSaved = () => {
    const heartPosts = useSelector(state => state.heart.heartArr)
    return (
        <div>
            {heartPosts?.length > 0 && heartPosts.map(item => {
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
                    />
                )
            })}
        </div>
    )
}

export default PostSaved