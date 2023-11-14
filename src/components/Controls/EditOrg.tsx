import React from "react";
import { useAppDispatch, useAppSelector } from "../../App/hooks";
import * as Yup from "yup";
import { useFormik } from "formik";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { Slide } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { UpdateOrgnaization } from "../../shared/Interfaces/authentication.interface";
import { updateOrgnaization } from "../../Redux/OrgnaizationSlice";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function EditOrg(props: any) {
  const dispatch = useAppDispatch();
  const { editLoading, getOrgData } = useAppSelector(
    (state) => state.orgnaization
  );

  const validationSchema = Yup.object({
    organization_name: Yup.string().required("Organization name is required"),
    description: Yup.string()
      .required("Description is required")
      .max(300, "Description cannot exceed 300 characters"),
    headQuarters: Yup.string().required("Head Quarter is required"),
  });

  let formik = useFormik<UpdateOrgnaization>({
    initialValues: {
      organization_name: getOrgData?.organization?.organization_name,
      headQuarters: getOrgData?.organization?.headQuarters,
      description: getOrgData?.organization?.description,
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(updateOrgnaization(values)).then((result) => {
        if (result.payload) {
          props.setopenEditProject();
          formik.resetForm();
        }
      });
    },
  });

  return (
    <div>
      <Dialog
        open={props.openEditProject}
        keepMounted
        TransitionComponent={Transition}
        onClose={() => props.setopenEditProject()}
        fullWidth>
        <DialogContent>
          <h1 className="text-center md:text-3xl sm:text-xl text-slate-950 mb-3 mt-4">
            Create New Project
          </h1>
          <h1 className="md:text-lg sm:text-base mb-6 text-slate-950 text-center">
            Projects make orgnaization grow faster
          </h1>

          <form
            onSubmit={formik.handleSubmit}
            className="md:w-5/6  sm:w-full mx-auto">
            {/* Organization Name */}
            <div className="mb-2 w-full px-4">
              <input
                type="text"
                name="organization_name"
                id="organization_name"
                value={formik.values.organization_name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Organization name"
                autoComplete="off"
                className="border border-slate-950 h-10 w-full focus:placeholder:opacity-0 outline-0 text-slate-950 ps-5 rounded-lg mb-1"
              />
              {formik.errors.organization_name &&
              formik.touched.organization_name ? (
                <p className=" text-red-700 text-sm ps-4 font-semibold text-left">
                  {formik.errors.organization_name}
                </p>
              ) : (
                ""
              )}
            </div>

            {/* Head Quarter*/}
            <div className="mb-2 w-full px-4">
              <input
                type="text"
                name="headQuarters"
                id="headQuarters"
                value={formik.values.headQuarters}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Head Quarter"
                autoComplete="off"
                className="border border-slate-950 h-10 w-full focus:placeholder:opacity-0 outline-0 text-slate-950 ps-5 rounded-lg mb-1"
              />
              {formik.errors.headQuarters && formik.touched.headQuarters ? (
                <p className=" text-red-700 text-sm ps-4 font-semibold text-left">
                  {formik.errors.headQuarters}
                </p>
              ) : (
                ""
              )}
            </div>

            {/* Description */}
            <div className="mb-5 w-full px-4">
              <textarea
                rows={3}
                name="description"
                id="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="description"
                autoComplete="off"
                className="border border-slate-950 w-full focus:placeholder:opacity-0 outline-0 text-slate-950 px-5 py-2 rounded-lg mb-1"
              />
              {formik.errors.description && formik.touched.description ? (
                <p className=" text-red-700 text-sm ps-4 font-semibold text-left">
                  {formik.errors.description}
                </p>
              ) : (
                ""
              )}
            </div>

            <DialogActions>
              <button
                type="submit"
                className="block mx-auto border bg-slate-950 duration-300 px-4 rounded-lg text-white hover:text-amber-500 h-10 font-bold">
                {editLoading ? (
                  <i className="fa-solid fa-spinner fa-spin-pulse"></i>
                ) : (
                  <>
                    <i className="fa-solid fa-plus md:me-3 sm:me-0"></i>
                    <span className="md:inline-block sm:hidden">Submit</span>
                  </>
                )}
              </button>

              <button
                type="button"
                className="block mx-auto border bg-slate-950 duration-300 px-4
                rounded-lg text-white hover:text-amber-500 h-10 font-bold"
                onClick={() => props.setopenEditProject()}>
                Close
              </button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
