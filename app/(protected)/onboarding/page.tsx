import React from "react";
import { getUserWorkspace } from "../data/workspace/get-user-workspace";
import { redirect } from "next/navigation";
import OnboardingForm from "@/components/onboading-components/OnboadingForm";
import { userRequired } from "../data/user/is-user-authenticated";

const page = async () => {
  const { data } = await getUserWorkspace();
  const { user } = await userRequired();

  if (data?.onboardingCompleted && data?.workspaces?.length > 0) {
    redirect("/workspace");
  } else if (data?.onboardingCompleted) {
    redirect("/create-workspace");
  }

  const name = `${user?.given_name || ""} ${user?.family_name || ""}`;

  return (
    <>
      <OnboardingForm
        name={name}
        email={user?.email as string}
        image={user?.picture || ""}
      />
    </>
  );
};

export default page;
