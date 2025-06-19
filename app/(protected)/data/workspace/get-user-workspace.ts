import { db } from "@/lib/db";
import { userRequired } from "../user/is-user-authenticated";

export const getUserWorkspace = async () => {
    try {
        const { user } = await userRequired();

        const workspaces = await db.user?.findUnique({
            where: {
                id: user?.id,
            },
            include: {
                workspaces: {
                    select: {
                        id: true,
                        userId: true,
                        workspaceId: true,
                        accessLevel: true,
                        createdAt: true,
                        updatedAt: true,
                        workspace: {
                            select: {
                                name: true,
                            },
                        },
                    },
                },
            },
        });

        return {
            data: workspaces
        }
    } catch (error) {
        // console.log("Error retrieving user workspace:", error);
        return {
            success: false,
            error: true,
            message: "Failed to fetch workspaces",
            data: null,
            status: 500
        };
    }
};
