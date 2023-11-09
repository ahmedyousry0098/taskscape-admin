/* eslint-disable react-hooks/exhaustive-deps */
import { useFormik } from "formik";
import { AddEmpOfProj } from "../../../shared/Interfaces/authentication.interface";
import { useAppDispatch, useAppSelector } from "../../../App/hooks";
import React, { useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { Slide } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { allEmployees } from "../../../Redux/EmployeesSlice";
import {} from "../../../Redux/ProjectsSlice";
import { addEmployeeToProject } from "../../../Redux/ProjDetailsSlice";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddEmpToProj(props: any) {
  const dispatch = useAppDispatch();
  const { addLoading } = useAppSelector((state) => state.projectDetails);
  const { getAllEmployees } = useAppSelector((state) => state.allEmployees);
  const { decoded } = useAppSelector((state) => state.login);

  useEffect(() => {
    dispatch(allEmployees());
  }, []);

  let formik = useFormik<AddEmpOfProj>({
    initialValues: {
      project: "",
      employees: [""],
      organization: "",
    },
    onSubmit: (values) => {
      dispatch(addEmployeeToProject(values)).then((result) => {
        if (result.payload) {
          props.setAddDialog();
          formik.resetForm();
        }
      });
    },
  });

  return (
    <div>
      <Dialog
        open={props.openAddEmp}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => props.setAddDialog()}
        fullWidth>
        <DialogContent>
          <h1 className="text-center text-3xl text-sky-900 mb-3 mt-4">
            Add collaporator to project
          </h1>
          <h1 className="text-lg mb-6 text-sky-900 text-center">
            More employees more success
          </h1>
          <form onSubmit={formik.handleSubmit} className="w-5/6 mx-auto">
            {/* Organization */}
            <input
              type="hidden"
              name="organization"
              value={(formik.values.organization = decoded.orgId)}
            />
            {/* Project */}
            <input
              type="hidden"
              name="project"
              value={(formik.values.project = props.projectId)}
            />

            {/* Select Members */}
            <div className="mb-5 w-full px-4">
              <select
                multiple
                id="employees"
                name="employees"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.employees}
                className="border border-sky-600 h-40 w-full outline-0 text-sky-900 ps-3 rounded-lg mb-1">
                <option disabled hidden className="py-5 ps-3 h-10">
                  Select Collaborators
                </option>
                {getAllEmployees?.employee?.length === 0 ? (
                  <option>No employees</option>
                ) : (
                  getAllEmployees?.employees?.map((member: any) => (
                    <option
                      key={member._id}
                      value={member._id}
                      className="px-3 py-1 h-10 text-sky-900">
                      {member.employeeName} → {member.email}
                    </option>
                  ))
                )}
              </select>
            </div>

            {/* Select scrum master */}
            {/* <div className="mb-5 w-full px-4">
                            <select
                                id="scrumMaster"
                                name="scrumMaster"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.scrumMaster}
                                className="border border-sky-600 h-10 w-full outline-0 text-sky-900 ps-5 rounded-lg mb-1"
                            >
                                <option value="" disabled hidden className="py-5 ps-3 h-10">
                                    Select Scrum Master
                                </option>
                                {getAll?.employee?.length === 0
                                    ? "Orgnization have no Scrum masters"
                                    : getAll?.employee
                                        ?.filter((scrum: any) => scrum.role === "scrumMaster")
                                        ?.map((scrum: any) => (
                                            <option
                                                key={scrum._id}
                                                value={scrum._id}
                                                className="py-5 ps-3 h-10 text-sky-900"
                                            >
                                                {scrum.employeeName} → {scrum.email}
                                            </option>
                                        ))}
                            </select>
            </div> */}

            <DialogActions>
              <button
                type="submit"
                className="block mx-auto border bg-sky-700 hover:bg-sky-900 px-4
                                rounded-lg text-white h-10 font-bold">
                {addLoading ? (
                  <i className="fa-solid fa-spinner fa-spin-pulse"></i>
                ) : (
                  <>
                    <i className="fa-solid fa-user-plus me-3"></i>
                    Add collaborator
                  </>
                )}
              </button>

              <button
                type="button"
                className="block mx-auto border bg-sky-700 hover:bg-sky-900 px-4
                rounded-lg text-white h-10 font-bold"
                onClick={() => {
                  props.setAddDialog();
                }}>
                Close
              </button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
