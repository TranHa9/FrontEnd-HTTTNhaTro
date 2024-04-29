import React from 'react'
import { Item, NoSearch } from '../../components'
import { useDispatch, useSelector } from 'react-redux'
import * as action from '../../store/actions'
import { useEffect } from 'react'

const ConfirmPost = () => {
    const dispatch = useDispatch()
    const { postsStatus } = useSelector(state => state.post)
    useEffect(() => {
        dispatch(action.getPostsStatus())
    }, [])
    console.log(postsStatus)
    return (
        <div>
            {
                !postsStatus?.length
                    ?
                    <NoSearch />
                    :
                    postsStatus?.length > 0 && postsStatus.map(item => {
                        return (
                            <Item
                                key={item?.id}
                                address={item?.address}
                                price={item?.price}
                                area={item?.area}
                                description={item?.description}
                                images={JSON.parse(item?.images)}
                                name={item?.name}
                                user={item?.user}
                                id={item?.id}
                                type
                            />
                        )
                    })}
        </div>
    )
}

export default ConfirmPost