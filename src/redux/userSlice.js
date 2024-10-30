import { createSlice } from '@reduxjs/toolkit';
import avatar from '../assets/images/avatar.avif';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        image: avatar,
        tiktokid: 'thuylinh',
        name: 'Hoang Thuy Linh',
        bio: 'Hú hú khẹc khẹc',
    },
    reducers: {
        update: (state, action) => {
            state.image = action.payload.image;
            state.tiktokid = action.payload.tiktokid;
            state.name = action.payload.name;
            state.bio = action.payload.bio;
        },
    },
});
export const { update } = userSlice.actions;
export default userSlice.reducer;
