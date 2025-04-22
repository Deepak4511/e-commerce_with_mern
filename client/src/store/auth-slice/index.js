import  {createSlice} from '@reduxjs/toolkit';

const initialState = {
    isAuthenticated: false,
    user: null,
    isLoading  : false,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
        }
    }
});

export default authSlice.reducer;
