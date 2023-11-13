//@ts-ignore
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../App/api/AxiosInstance";
import { toast } from "react-toastify";
import {
  ILogin,
  IReplaceEmp,
  IReplaceScrum,
} from "../shared/Interfaces/authentication.interface";

export const allEmployees = createAsyncThunk<void>(
  "All_Employee/allEmployee",
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

export const allScrums = createAsyncThunk<void>(
  "All_Employee/allScrums",
  async (_, decodeing) => {
    try {
      const getDecode: any = decodeing.getState();
      const orgnizationId = getDecode.login.decoded.orgId;
      const response = await axiosInstance.get(
        `/employee/getAllScrums/${orgnizationId}`,
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

export const deleteEmployee = createAsyncThunk<void, string>(
  "All_Employee/deleteEmployee",
  async (projectId) => {
    try {
      const response = await axiosInstance.patch(
        `/employee/delete/${projectId}`,
        {},
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      toast.success(response.data.message);
      return response.data;
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  }
);

export const addEmployee = createAsyncThunk<void, ILogin>(
  "All_Employee/addEmployee",
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
      toast.error(error.response.data.error);
    }
  }
);

export const deleteAndReplaceEmployee = createAsyncThunk<
  void,
  { values: IReplaceEmp; memberId: string }
>("All_Employee/deleteAndReplaceEmployee", async ({ values, memberId }) => {
  try {
    const response = await axiosInstance.patch(
      `/employee/del-and-replace-emp/${memberId}`,
      values,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    console.log(response);
    toast.success(response.data.message);
    return response.data;
  } catch (error: any) {
    console.log(error);
    toast.error(error.response.data.message);
  }
});

export const deleteAndReplaceScrum = createAsyncThunk<
  void,
  { values: IReplaceScrum; scrumId: string }
>("All_Employee/deleteAndReplaceScrum", async ({ values, scrumId }) => {
  try {
    const response = await axiosInstance.patch(
      `/employee/del-and-replace-scrum/${scrumId}`,
      values,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    toast.success(response.data.message);
    return response.data;
  } catch (error: any) {
    console.log(error);
    toast.error(error.response.data.message);
  }
});

type initialStateType = {
  EmployeeLoading: boolean;
  ScrumLoading: boolean;
  getAllEmployees: any;
  getScrums: any;
  error: string;
  isDeleting: boolean;
  message: string;
  loading: boolean;
  assignToLoading: boolean;
};

const initialState: initialStateType = {
  EmployeeLoading: false,
  ScrumLoading: false,
  getAllEmployees: [],
  getScrums: [],
  error: "",
  isDeleting: false,
  message: "",
  loading: false,
  assignToLoading: false,
};

export const AllEmpSlice = createSlice({
  name: "All_Employee",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(allEmployees.pending, (state) => {
        state.EmployeeLoading = true;
      })
      .addCase(allEmployees.fulfilled, (state, action: any) => {
        if (action.payload !== undefined) {
          state.getAllEmployees = action.payload;
        }
        state.EmployeeLoading = false;
      })
      .addCase(allEmployees.rejected, (state, action) => {
        state.EmployeeLoading = false;
        if (action.meta.requestStatus === "rejected") {
          state.error = action.error.message || "Something went wrong";
          toast.error(state.error);
        }
      });

    builder
      .addCase(allScrums.pending, (state) => {
        state.ScrumLoading = true;
      })
      .addCase(allScrums.fulfilled, (state, action) => {
        if (action.payload !== undefined) {
          state.getScrums = action.payload;
        }
        state.ScrumLoading = false;
      })
      .addCase(allScrums.rejected, (state, action) => {
        state.EmployeeLoading = false;
        if (action.meta.requestStatus === "rejected") {
          state.error = action.error.message || "Something went wrong";
          toast.error(state.error);
        }
      });

    builder
      .addCase(addEmployee.pending, (state) => {
        state.loading = true;
      })
      .addCase(addEmployee.fulfilled, (state, action: any) => {
        if (
          action.payload.message === "Employee added successfully!!" &&
          !state.getAllEmployees.employees &&
          action.payload.employee.role !== "scrumMaster"
        ) {
          state.getAllEmployees.employees = [];
          state.getAllEmployees.employees.push(action.payload.employee);
        } else if (
          action.payload.message === "Employee added successfully!!" &&
          !state.getScrums.scrums &&
          action.payload.employee.role !== "member"
        ) {
          state.getScrums.scrums = [];
          state.getScrums.scrums.push(action.payload.employee);
        } else if (action.payload) {
          state.getAllEmployees.employees.push(action.payload.employee);
          state.getScrums.scrums.push(action.payload.employee);
        }
        state.loading = false;
      })
      .addCase(addEmployee.rejected, (state, action) => {
        state.loading = false;
        if (action.meta.requestStatus === "rejected") {
          state.error = action.error.message!;
          toast.error("User already in ornization");
        } else {
          toast.error("Something went wrong");
        }
      });

    builder
      .addCase(deleteEmployee.pending, (state) => {
        state.isDeleting = true;
      })
      .addCase(deleteEmployee.fulfilled, (state, action: any) => {
        state.isDeleting = false;
        if (action.payload !== undefined) {
          const empID = action.meta.arg;
          const getAllEmployees = state.getAllEmployees.employees.filter(
            (emp: any) => emp._id !== empID
          );
          state.getAllEmployees.employees = getAllEmployees;
        }
      })
      .addCase(deleteEmployee.rejected, (state, action) => {
        state.isDeleting = false;
        if (action.meta.requestStatus === "rejected") {
          state.error = action.error.message || "Something went wrong";
          toast.error(state.error);
        }
      });

    builder
      .addCase(deleteAndReplaceEmployee.pending, (state) => {
        state.assignToLoading = true;
      })
      .addCase(deleteAndReplaceEmployee.fulfilled, (state, action: any) => {
        state.assignToLoading = false;
        if (action.payload !== undefined) {
          const empID = action.meta.arg.memberId;
          console.log(action);

          const getAllEmployees = state.getAllEmployees.employees.filter(
            (emp: any) => emp._id !== empID
          );
          state.getAllEmployees.employees = getAllEmployees;
        }
      })
      .addCase(deleteAndReplaceEmployee.rejected, (state, action) => {
        state.assignToLoading = false;
        if (action.meta.requestStatus === "rejected") {
          state.error = action.error.message || "Something went wrong";
          toast.error(state.error);
        }
      });

    builder
      .addCase(deleteAndReplaceScrum.pending, (state) => {
        state.assignToLoading = true;
      })
      .addCase(deleteAndReplaceScrum.fulfilled, (state, action: any) => {
        state.assignToLoading = false;
        if (action.payload !== undefined) {
          const empID = action.meta.arg.scrumId;
          console.log(action);

          const getScrums = state.getScrums.scrums.filter(
            (emp: any) => emp._id !== empID
          );
          state.getScrums.scrums = getScrums;
        }
      })
      .addCase(deleteAndReplaceScrum.rejected, (state, action) => {
        state.assignToLoading = false;
        if (action.meta.requestStatus === "rejected") {
          state.error = action.error.message || "Something went wrong";
          toast.error(state.error);
        }
      });
  },
});

export let allEmployeesReducer = AllEmpSlice.reducer;
