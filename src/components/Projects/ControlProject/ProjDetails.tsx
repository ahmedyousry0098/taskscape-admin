/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../App/hooks";
import {
  allProjects,
  delEmployeeFromProject,
} from "../../../App/Api/AllProjSlice";
import { Button, Collapse, Tooltip } from "antd";
import { Popconfirm } from "antd";
import { allEmployees, allScrums } from "../../../App/Api/AllEmpSlice";
import { DeleteEmpOfProj } from "../../../shared/Interfaces/authentication.interface";
import AddEmpToProj from "./AddEmpToProj";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { Slide } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ProjDetails(props: any) {
  const [projectId, setProjectId] = useState<string>("");
  const [openAddEmp, setOpenAddEmp] = useState(false);
  const dispatch = useAppDispatch();
  const { getAllEmployees, getScrums } = useAppSelector(
    (state) => state.allEmployees
  );
  const { isLoading, getAllProjects, delLoading } = useAppSelector(
    (state) => state.allProjects
  );

  function handleDeleteEmployee(body: DeleteEmpOfProj) {
    dispatch(delEmployeeFromProject(body)).then((result) => {
      if (result.payload) {
        dispatch(allProjects());
      }
    });
  }

  useEffect(() => {
    dispatch(allEmployees());
    dispatch(allScrums());
  }, []);

  return (
    <>
      <Dialog
        open={props.openDetails}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => props.setOpenDetails()}
        fullScreen
      >
        <DialogContent>
          <h1 className="text-center md:text-3xl sm:text-xl text-sky-900 mb-3 mt-4">
            Create New Project
          </h1>
          <h1 className="md:text-lg sm:text-base mb-6 text-sky-900 text-center">
            Projects make orgnaization grow faster
          </h1>

          {/* Add Project PopOver */}
          <AddEmpToProj
            projectId={projectId}
            openAddEmp={openAddEmp}
            setAddDialog={() => setOpenAddEmp(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Add Project PopOver */}
      <AddEmpToProj
        projectId={projectId}
        openAddEmp={openAddEmp}
        setAddDialog={() => setOpenAddEmp(false)}
      />
    </>
  );
}
