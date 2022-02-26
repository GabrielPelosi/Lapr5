import { createSlice } from "@reduxjs/toolkit";
import {buscarPostDoLocalStorage, setPostLocalStorage} from '../../../utils/SelectedPostLocalStorage'


export const SelectedPostSlice = createSlice({
    name: 'selectedPost',
    initialState: {
        selectedPost: buscarPostDoLocalStorage()
    },
    reducers: {
        setSelectedPost: (state, action) => {
            state.selectedPost = {...action.payload}
            setPostLocalStorage(state.selectedPost)
        },
    }
})

export const { setSelectedPost } = SelectedPostSlice.actions;

export const selectSelectedPost = state => state.selectedPost.selectedPost || {}

export default SelectedPostSlice.reducer;