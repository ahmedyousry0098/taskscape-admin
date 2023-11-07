import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../AxiosInstance";
import { ILogin } from "../../shared/Interfaces/authentication.interface";
import { toast } from "react-toastify";

export const addEmployee = createAsyncThunk<void, ILogin>(
  "Add_Employee/addEmployee",
  async (values) => {
    try {
      const response = await axiosInstance.post(
        `/employee/createmployee`,
        values,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      if (response.status === 200) {
        toast.success(response.data.message);
      }
      return response.data;
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.details[0]);
      toast.error(error.response.data.error);
    }
  }
);

export const AddEmpSlice = createSlice({
  name: "Add_Employee",
  initialState: {
    loading: false,
    done: false,
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addEmployee.pending, (state) => {
        state.loading = true;
        state.done = false;

        state.error = "";
      })
      .addCase(addEmployee.fulfilled, (state, action) => {
        if (action.payload !== undefined) {
        }
        state.loading = false;
        state.error = "";
      })
      .addCase(addEmployee.rejected, (state, action) => {
        state.loading = false;
        state.done = false;
        if (action.meta.requestStatus === "rejected") {
          state.error = action.error.message!;
          toast.error("User already in ornization");
        } else {
          toast.error("Something went wrong");
        }
      });
  },
});

export let addEmployeeReducer = AddEmpSlice.reducer;
