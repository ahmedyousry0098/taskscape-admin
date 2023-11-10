import React from "react";
import { Result } from "antd";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div>
      <Result
        className="mt-24"
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Link to={"/"}>
            <button
              className="block mx-auto border duration-300  bg-slate-950
              hover:scale-110 w-40 rounded-lg hover:text-amber-500 text-white h-10 font-bold">
              {" "}
              Back Home
            </button>
          </Link>
        }
      />
    </div>
  );
}
