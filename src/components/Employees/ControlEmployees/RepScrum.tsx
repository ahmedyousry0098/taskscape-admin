import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { IReplaceScrum } from "../../../shared/Interfaces/authentication.interface";
import { useAppDispatch, useAppSelector } from "../../../App/hooks";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { Slide } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { deleteAndReplaceScrum } from "../../../Redux/EmployeesSlice";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function RepScrum(props: any) {
  const { decoded } = useAppSelector((state) => state.login);
  const { getScrums, assignToLoading } = useAppSelector(
    (state) => state.allEmployees
  );

  const dispatch = useAppDispatch();

  const validationSchema = Yup.object({});

  let formik = useFormik<IReplaceScrum>({
    initialValues: {
      orgId: "",
      altScrumId: "",
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(
        deleteAndReplaceScrum({ values, scrumId: props.scrumDelegateId })
      ).then((result) => {
        if (result.payload) {
          formik.resetForm();
          props.setDialogSConfirmation();
        }
      });
    },
  });

  return (
    <div>
      <Dialog
        open={props.openSConfirmation}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => props.setDialogSConfirmation()}
        fullWidth>
        <DialogContent>
          <h1 className="text-center md:text-3xl sm:text-xl text-slate-950 mb-3 mt-4">
            Replace Scrum
          </h1>
          <h1 className="md:text-lg sm:text-base mb-6 text-slate-950 text-center">
            Scrum works delegated to ?
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
                name="altScrumId"
                id="altScrumId"
                value={formik.values.altScrumId}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="border border-slate-950 h-10 w-full focus:placeholder:opacity-0 outline-0
                 text-slate-950 ps-5 rounded-lg mb-1">
                <option value="">Select other member</option>
                {getScrums?.scrums?.map((scrum: any) => (
                  <option value={scrum._id}>{scrum.employeeName}</option>
                ))}
              </select>

              {formik.errors.altScrumId && formik.touched.altScrumId ? (
                <p className=" text-red-700 text-sm ps-4 font-semibold text-left">
                  {formik.errors.altScrumId}
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
                onClick={() => props.setDialogSConfirmation()}>
                Close
              </button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
