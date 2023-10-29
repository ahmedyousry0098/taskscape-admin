import { JwtPayload } from "jwt-decode";

export interface ILogin {
  email: string;
  password: string;
}

export interface IRegister {
  employeeName: string;
  email: string;
  password: string;
  role: string;
}

export interface IProject {
  projectName: string;
  startDate: string;
  deadline: string;
  description: string;
  scrumMaster: string;
  employees: string[];
  organization: string;
}

export interface IJwtPayload extends JwtPayload {
  _id: string;
  email: string;
  orgId: string;
}
