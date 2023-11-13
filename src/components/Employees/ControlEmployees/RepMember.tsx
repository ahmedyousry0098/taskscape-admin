import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { IReplaceEmp } from "../../../shared/Interfaces/authentication.interface";
import { useAppDispatch, useAppSelector } from "../../../App/hooks";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { Slide } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { deleteAndReplaceEmployee } from "../../../Redux/EmployeesSlice";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function RepMember(props: any) {
  const { decoded } = useAppSelector((state) => state.login);
  const { getAllEmployees, assignToLoading } = useAppSelector(
    (state) => state.allEmployees
  );

  const dispatch = useAppDispatch();

  const validationSchema = Yup.object({});

  let formik = useFormik<IReplaceEmp>({
    initialValues: {
      orgId: "",
      altEmpId: "",
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(
        deleteAndReplaceEmployee({ values, memberId: props.memberDelegateId })
      ).then((result) => {
        if (result.payload) {
          formik.resetForm();
          props.setDialogConfirmation();
        }
      });
    },
  });

  return (
    <div>
      <Dialog
        open={props.openConfirmation}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => props.setDialogConfirmation()}
        fullWidth>
        <DialogContent>
          <h1 className="text-center md:text-3xl sm:text-xl text-slate-950 mb-3 mt-4">
            Replace Member
          </h1>
          <h1 className="md:text-lg sm:text-base mb-6 text-slate-950 text-center">
            Member works delegated to ?
          </h1>

          <form
            onSubmit={formik.handleSubmit}
            className="md:w-5/6  sm:w-full mx-auto">
            {/* Organization */}
            <input
              type="hidden"
              name="orgId"
              value={(formik.values.orgId = decoded.orgId)}
            />

            {/* Assign To */}
            <div className="mb-5 max-w-[600px] mx-auto px-4">
              <select
                name="altEmpId"
                id="altEmpId"
                value={formik.values.altEmpId}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="border border-slate-950 h-10 w-full focus:placeholder:opacity-0 outline-0
                 text-slate-950 ps-5 rounded-lg mb-1">
                <option value="">Select other member</option>
                {getAllEmployees?.employees
                  ?.filter((e: any) => e._id !== props.memberDelegateId)
                  ?.map((member: any) => (
                    <option value={member._id}>{member.employeeName}</option>
                  ))}
              </select>

              {formik.errors.altEmpId && formik.touched.altEmpId ? (
                <p className=" text-red-700 text-sm ps-4 font-semibold text-left">
                  {formik.errors.altEmpId}
                </p>
              ) : (
                ""
              )}
            </div>

            <DialogActions>
              <button
                type="submit"
                className="block mx-auto border bg-slate-950 duration-300 hover:text-amber-500
                 px-4 rounded-lg text-white h-10 font-bold">
                {assignToLoading ? (
                  <i className="fa-solid fa-spinner fa-spin-pulse"></i>
                ) : (
                  <>
                    <i className="fa-solid fa-people-arrows md:me-3 sm:me-0"></i>
                    <span className="md:inline-block sm:hidden">Confirm</span>
                  </>
                )}
              </button>

              <button
                type="button"
                className="block mx-auto border bg-slate-950 duration-300 px-4
                rounded-lg text-white hover:text-amber-500 h-10 font-bold"
                onClick={() => props.setDialogConfirmation()}>
                Close
              </button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
