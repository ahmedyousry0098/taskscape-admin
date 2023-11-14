import { JwtPayload } from "jwt-decode";

export interface ILogin {
  email: string;
  password: string;
}

export interface IForgetPassword {
  email: string;
}

export interface IResetPassword extends IForgetPassword {
  code: string;
  newPassword: string;
}

export interface IRegister {
  employeeName: string;
  email: string;
  password: string;
  role: string;
  experience: string;
  employmentType: string;
  title: string;
}

export interface IReplaceEmp {
  orgId: string;
  altEmpId: string;
}

export interface IReplaceScrum {
  orgId: string;
  altScrumId: string;
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

export interface DeleteEmpOfProj {
  organization: string;
  project: string;
  employee: string;
}

export interface AddEmpOfProj {
  organization: string;
  project: string;
  employees: string[];
}

export interface UpdateOrgnaization {
  organization_name: string;
  description: string;
  headQuarters: string;
}

export interface UpdateProject {
  projectName: string;
  description: string;
  startDate: string;
  deadline: string;
}
