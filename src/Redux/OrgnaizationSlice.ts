import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../App/api/AxiosInstance";
import { toast } from "react-toastify";

export const getOrgnaization = createAsyncThunk<void>(
  "orgnaization/getOrgnaization",
  async (_, decodeing) => {
    try {
      const getDecode: any = decodeing.getState();
      const orgnizationId = getDecode.login.decoded.orgId;
      const response = await axiosInstance.get(
        `/organization/${orgnizationId}`,
        { headers: { token: localStorage.getItem("token") } }
      );
      console.log(response);
      return response.data;
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  }
);

type initialStateType = {
  getOrgData: any;
  orgLoading: boolean;
  editing: boolean;
  error: string;
};

const initialState: initialStateType = {
  getOrgData: {},
  orgLoading: false,
  editing: false,
  error: "",
};

export const OrgnaizationSlice = createSlice({
  name: "orgnaization",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrgnaization.pending, (state) => {
        state.orgLoading = true;
      })
      .addCase(getOrgnaization.fulfilled, (state, action) => {
        state.orgLoading = false;
        if (action.payload !== undefined) {
          state.getOrgData = action.payload;
        }
      })
      .addCase(getOrgnaization.rejected, (state, action) => {
        state.orgLoading = false;
        if (action.meta.requestStatus === "rejected") {
          state.error = action.error.message || "Something went wrong";
          toast.error(state.error);
        }
      });
  },
});

export let organizationReducer = OrgnaizationSlice.reducer;
