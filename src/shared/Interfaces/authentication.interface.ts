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
}
