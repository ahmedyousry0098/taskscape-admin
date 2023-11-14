import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../App/api/AxiosInstance";
import { toast } from "react-toastify";
import { UpdateOrgnaization } from "../shared/Interfaces/authentication.interface";

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
      console.log(response.data);

      return response.data;
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.message);
    }
  }
);

export const updateOrgnaization = createAsyncThunk<void, UpdateOrgnaization>(
  "orgnaization/updateOrgnaization",
  async (values, decodeing) => {
    try {
      const getDecode: any = decodeing.getState();
      const orgnizationId = getDecode.login.decoded.orgId;
      const response = await axiosInstance.put(
        `/organization/${orgnizationId}/update`,
        values,
        { headers: { token: localStorage.getItem("token") } }
      );
      return response.data;
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.message);
    }
  }
);

type initialStateType = {
  getOrgData: any;
  orgLoading: boolean;
  error: string;
  editLoading: boolean;
};

const initialState: initialStateType = {
  getOrgData: {},
  orgLoading: false,
  error: "",
  editLoading: false,
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

    builder
      .addCase(updateOrgnaization.pending, (state) => {
        state.editLoading = true;
      })
      .addCase(updateOrgnaization.fulfilled, (state, action: any) => {
        state.editLoading = false;
        if (action.payload !== undefined) {
          console.log(action);

          state.getOrgData.organization = action.payload.updatedOrganization;
        }
      })
      .addCase(updateOrgnaization.rejected, (state, action) => {
        state.editLoading = false;
        if (action.meta.requestStatus === "rejected") {
          state.error = action.error.message || "Something went wrong";
          toast.error(state.error);
        }
      });
  },
});

export let organizationReducer = OrgnaizationSlice.reducer;
