import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../App/AxiosInstance";
import { ILogin } from "../shared/Interfaces/authentication.interface";
import { toast } from "react-toastify";

export const addEmployee = createAsyncThunk<void, ILogin>(
  "Add_Employee/addEmployee",
  async (values) => {
    await axiosInstance
      .post(`/employee/createmployee`, values)
      .then((res) => {
        console.log(res);
        toast.success(res.data.message);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.details[0]);
      });
  }
);

export const AddEmpSlice = createSlice({
  name: "Add_Employee",
  initialState: {
    loading: false,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(addEmployee.pending, (state) => {
        state.loading = true;
      })
      .addCase(addEmployee.fulfilled, (state) => {
        state.loading = false;
      });
  },
});

export let addEmployeeReducer = AddEmpSlice.reducer;
// export let {  }: any = AdminSlice.actions;
