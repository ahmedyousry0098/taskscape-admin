/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useAppSelector } from "../../../App/hooks";

export default function ScrumTable() {
  interface DataType {
    key: string;
    Project: string;
    Scrum: string;
    Collaborators: number;
    Sprint: number;
    Todo: number;
    Doing: number;
    Done: number;
    Performance: string;
  }

  let { getAllProjects } = useAppSelector((state) => state.allProjects);

  const [table, setTable] = useState<DataType[]>([]);

  useEffect(() => {
    tableData();
  }, []);

  const tableData = function () {
    let datass: any = [];
    getAllProjects?.projects?.map((data: any) => {
      let Key = data?._id;
      let Project = data?.projectName;
      let Scrum = data?.scrumMaster?.employeeName;
      let Collaborators = data?.employees?.length;
      let Sprint = data?.sprints?.length;
      let Todo = 0;
      let Doing = 0;
      let Done = 0;
      data?.sprints?.map((task: any) =>
        task.tasks?.filter(
          (status: any) =>
            status.status === "todo"
              ? Todo++
              : status.status === "doing"
              ? Doing++
              : status.status === "done"
              ? Done++
              : Todo,
          Done,
          Doing
        )
      );

      let Performance = 0 + " %";
      if (Todo !== 0) {
        Performance = (Done * 100) / Todo + " %";
      }

      datass.push({
        Key,
        Project,
        Scrum,
        Collaborators,
        Sprint,
        Todo,
        Doing,
        Done,
        Performance,
      });
      return setTable(datass);
    });
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "Project",
      dataIndex: "Project",
      align: "center",
    },
    {
      title: "Scrum Master",
      dataIndex: "Scrum",
      align: "center",
    },
    {
      title: "Collaborators",
      dataIndex: "Collaborators",
      sorter: (a, b) => a.Collaborators - b.Collaborators,
      align: "center",
    },
    {
      title: "Sprint",
      dataIndex: "Sprint",
      sorter: (a, b) => a.Sprint - b.Sprint,
      align: "center",
    },
    {
      title: "Todo",
      dataIndex: "Todo",
      sorter: (a, b) => a.Todo - b.Todo,
      align: "center",
    },
    {
      title: "Doing",
      dataIndex: "Doing",
      sorter: (a, b) => a.Doing - b.Doing,
      align: "center",
    },
    {
      title: "Done",
      dataIndex: "Done",
      sorter: (a, b) => a.Done - b.Done,
      align: "center",
    },
    {
      title: "Performance",
      dataIndex: "Performance",
      align: "center",
    },
  ];

  const data: DataType[] = table;

  return (
    <div className="mx-auto">
      <Table pagination={false} columns={columns} dataSource={data} />
    </div>
  );
}
