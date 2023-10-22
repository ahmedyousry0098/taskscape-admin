import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'
import { ILogin } from '../../Interfaces/authentication.interface'
import { Navigate } from "react-router-dom";


const baseUrl:string = 'https://taskspace-rxco.onrender.com';

export const logIn = createAsyncThunk<void, ILogin>("Admin/logIn", async (values)=> {
    await axios.post(`${baseUrl}/admin/login`, values)
    .then(res => {
        console.log(res.data.message);
        if (res.status === 200) {
            <Navigate to={"/"}/>
            localStorage.setItem('token', res.data.token)
        }
        
    }).catch(err => {
        console.log(err);  
    })
})

     


export const AdminSlice = createSlice({
    name: "Admin",
    initialState: {
        admin: '',
        loading: false,
    },
    reducers: {},
    extraReducers: (builder)=> {
        builder.addCase(logIn.pending, (state, action) => {
            state.admin = '';
            state.loading = true;
        })
        .addCase(logIn.fulfilled, (state, action) => {
            state.loading = false;
            state.admin = action.payload!;
        })
        
    }
})

export let adminReducer = AdminSlice.reducer

