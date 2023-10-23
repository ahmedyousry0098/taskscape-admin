import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosRequestConfig } from 'axios'
import { ILogin } from '../Interfaces/authentication.interface'
import jwtDecode from "jwt-decode";


const baseUrl: string = 'https://taskspace-rxco.onrender.com';
const token = localStorage.getItem('token');
const headers: AxiosRequestConfig = {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
}}

export const logIn = createAsyncThunk<void, ILogin>("Admin/logIn", async (values) => {
    await axios.post(`${baseUrl}/admin/login`, values)
        .then(res => {
            if (res.data.message === 'Done') {
                localStorage.setItem('token', res.data.token)
                // const decode = jwtDecode(localStorage.getItem('token')!)
                // if (decode) {
                //     console.log(decode);
                // }
            }
        }).catch(err => {
            console.log(err);
        })
})

//#################################################
// mtf34 3la github w m4 3aref el link
//#################################################
export const addEmployee = createAsyncThunk<void, ILogin>("Admin/addEmployee", async (values) => {
    await axios.post(`${baseUrl}  ############  `, values, headers)
    .then(res => {
            console.log(headers)
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
        isLoggedIn: false,
        adminData: {
            id: '',
            email: '',
            exp: '',
        }
    },
    reducers: {
        logout: (state) => {
            state.isLoggedIn = false
        },
        decoding: (state) => {
            if (state.isLoggedIn === true) {
                let decode: { _id: string, email: string, exp: string } = jwtDecode(localStorage.getItem('token')!)
                state.adminData.id = decode._id
                state.adminData.email = decode.email
                state.adminData.exp = decode.exp
            }
        }
    },

    extraReducers: (builder) => {
        builder.addCase(logIn.pending, (state) => {
            state.admin = '';
            state.loading = true;
        })
            .addCase(logIn.fulfilled, (state) => {
                state.loading = false;
                state.isLoggedIn = true
            }).addCase(addEmployee.pending, (state)=> {
            state.loading = true
        }).addCase(addEmployee.fulfilled, (state)=> {
            state.loading = false
        })

    }
})

export let adminReducer = AdminSlice.reducer
export let { logout, decoding }: any = AdminSlice.actions

