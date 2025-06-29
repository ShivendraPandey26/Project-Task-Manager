import {
  MyTasksTable,
  TaskProps,
} from "@/app/(protected)/data/project/project-table";
import { getMyTasks } from "@/app/(protected)/data/task/getMyTasks";
import { userRequired } from "@/app/(protected)/data/user/is-user-authenticated";
import React from "react";

const MyTaskPage = async () => {
  await userRequired();

  const tasks = await getMyTasks();
  return (
    <div>
      <MyTasksTable tasks={tasks as unknown as TaskProps[]} />
    </div>
  );
};

export default MyTaskPage;
