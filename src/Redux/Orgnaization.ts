import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../App/api/AxiosInstance";
import { toast } from "react-toastify";

export const getOrgnaization = createAsyncThunk<void>(
  "Orgnaization/getOrgnaization",
  async (_, decodeing) => {
    try {
      const getDecode: any = decodeing.getState();
      const orgnizationId = getDecode.login.decoded.orgId;
      const response = await axiosInstance.get(
        `/employee/getAllEmployees/${orgnizationId}`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      return response.data;
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  }
);

type initialStateType = {
  getOrgnaization: any;
  orgLoading: boolean;
  editing: boolean;
};

const initialState: initialStateType = {
  getOrgnaization: {},
  orgLoading: false,
  editing: false,
};

export const OrgnaizationSlice = createSlice({
  name: "Orgnaization",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});
