import React from 'react'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { ILogin } from '../../Interfaces/authentication.interface'


const baseUrl:string = 'https://taskspace-api.vercel.app';

export const logIn = createAsyncThunk<void, ILogin>("Admin/logIn", async (values)=> {
    
    await axios.post(`${baseUrl}/admin/login`, values)
    .then(res => {
        console.log(res);
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

