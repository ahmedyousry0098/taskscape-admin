import jwtDecode from "jwt-decode";
import { axiosInstance } from "../AxiosInstance";
import { IJwtPayload } from "../../shared/Interfaces/authentication.interface";

const token = localStorage.getItem("token");
let decode: IJwtPayload = {
  _id: "",
  orgId: "",
  email: "",
};

if (token) {
  decode = jwtDecode(token);
}
let orgnizationId = decode.orgId;

export const getProjects = async () => {
  const response = await axiosInstance.get(
    `/project/org-projects/${orgnizationId}`
  );
  return response.data;
};

export const getProjectDetails = async ({ projectId }: any) => {
  const response = await axiosInstance.get(`/project/details/${projectId}`);
  return response.data;
};
