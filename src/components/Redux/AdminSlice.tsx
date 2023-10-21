import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import React from 'react'


    export const logIn = createAsyncThunk("Admin/logIn", async (values)=> {
        // m4 m3aya el link bs hn7oto w hn3ml react Toast
        await axios.post('', values).then(res => {
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

