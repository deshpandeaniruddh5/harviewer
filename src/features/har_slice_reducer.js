import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const initialState = {
    harData : null,
    status : "idle",
    error : null,
};

export const fetchData  = createAsyncThunk("har/fetchData",async()=>{
    const response = await fetch('http://localhost:8000/');
    const result= await response.json();
    return result;
})

const harSlice = createSlice({
    name :"har",
    initialState,
    extraReducers:{
        [fetchData.pending]:(state , action) =>{
            state.status = "loading";
        },
        [fetchData.rejected]:(state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        },
        [fetchData.fulfilled]: (state,action) =>{
            state.status= "succeeded";
            state.harData = action.payload;
        }
    }
})

export default harSlice.reducer;