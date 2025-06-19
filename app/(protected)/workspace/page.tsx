import React from "react";
import { getUserWorkspace } from "../data/workspace/get-user-workspace";
import { redirect } from "next/navigation";

async function page() {
  const { data } = await getUserWorkspace();

  // if (!data) {
  //   return null;
  // }

  if (data?.onboardingCompleted && data?.workspaces?.length == 0) {
    redirect("/create-workspace");
  } else if (!data?.onboardingCompleted) {
    redirect("/onboarding");
  } else {
    redirect(`/workspace/${data?.workspaces[0]?.workspaceId}`);
  }
}

export default page;
