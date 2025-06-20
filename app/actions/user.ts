"use server"

import { userDataType } from "@/components/onboading-components/OnboadingForm"
import { userRequired } from "../(protected)/data/user/is-user-authenticated";
import { userSchema } from "@/lib/schema";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";


export const createUser = async (data: userDataType) => {
    const { user } = await userRequired();

    const validatedData = userSchema.parse(data);

    const userData = await db.user.create({
        data: {
            id: user?.id as string,
            email: user?.email as string,
            name: validatedData.name,
            image: user?.picture || null,
            about: validatedData.about || null,
            country: validatedData.country,
            industryType: validatedData.industryType,
            role: validatedData.role,
            onboardingCompleted: true,
            subscription: {
                create: {
                    plan: "FREE",
                    status: "ACTIVE",
                    currentPeriodEnd: new Date(),
                    cancelAtPeriodEnd: false,
                }
            }
        },

        select: {
            id: true,
            email: true,
            name: true,
            workspaces: true
        }
    });

    // TODO: send user welcome email

    if(userData.workspaces.length === 0) {
        redirect('/create-workspace');
    }
    redirect('/workspace');
}