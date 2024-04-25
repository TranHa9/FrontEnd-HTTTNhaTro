import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    heartArr: []
}

const postSave = createSlice({
    name: 'postSave',
    initialState,
    reducers: {
        addPostHeart: (state, action) => {
            const postId = state.heartArr.findIndex((p) => p.id === action.payload.id)
            if (postId === -1) {
                state.heartArr.push({ ...action.payload, quantity: 1 });
            } else {
                state.heartArr[postId].quantity += 1;
            }
        },
        deletePostHeart: (state, action) => {
            const postIdRemove = action.payload.id;
            const newHeart = state.heartArr.filter((item) => item.id !== postIdRemove)
            return { ...state, heartArr: newHeart }

        },
    },
})

export const { addPostHeart, deletePostHeart } = postSave.actions

export default postSave.reducer