"use client";

import { workspaceSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { $Enums, Workspace } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { CreateWorkspaceDataType } from "./workspaceForm";
import { toast } from "sonner";
import {
  deleteWorkspace,
  resetWorkspaceInviteCode,
  updateWorkspace,
} from "@/app/actions/workspace";
import { Link, UserPlus } from "lucide-react";
import { useConfirmation } from "@/hooks/use-delete";
import { ConfirmationDialog } from "./confirmation-dialog";

export interface DataProps extends Workspace {
  members: {
    userId: string;
    accessLevel: $Enums.AccessLevel;
  }[];
}

const WorkspceSettingsForm = ({ data }: { data: DataProps[] }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [pending, setPending] = useState(false);
  const { isOpen, confirm, handleConfirm, handleCancel, confirmationOptions } =
    useConfirmation();

  const [inviteEmail, setInviteEmail] = useState("");

  // Support both array and object for data
  const DATA = Array.isArray(data) ? data[0] : data;

  const form = useForm<CreateWorkspaceDataType>({
    resolver: zodResolver(workspaceSchema),
    defaultValues: {
      name: DATA?.name,
      description: DATA?.description || "",
    },
  });

  const inviteLink = `${process.env.NEXT_PUBLIC_BASE_URL}/workspace-invite/${DATA.id}/join/${DATA.inviteCode}`;

  const handleonSubmit = async (values: CreateWorkspaceDataType) => {
    try {
      setPending(true);
      await updateWorkspace(DATA.id, values);

      toast.success("Your workspace has been updated.");
      router.refresh();
    } catch (error) {
      if (error instanceof Error && error.message !== "NEXT_REDIRECT") {
        toast.error(
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again."
        );
      }
    } finally {
      setPending(false);
    }
  };

  const handleInvitation = async () => {};

  const copyInviteLink = () => {
    navigator.clipboard.writeText(inviteLink);
    toast.message("Invite link has been copied to clipboard");
  };

  const handleReset = async () => {
    try {
      setPending(true);
      await resetWorkspaceInviteCode(DATA.id);

      router.refresh();
      toast.success("Invite code reset successfully.");
    } catch (error) {
      if (error instanceof Error && error.message !== "NEXT_REDIRECT") {
        toast.error(
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again."
        );
      }
    } finally {
      setPending(false);
    }
  };

  const handleDelete = () => {
    confirm({
      title: "Delete Workspace",
      message: "Are you sure you want to delete this workspace?",
      onConfirm: async () => {
        try {
          setPending(true);
          await deleteWorkspace(DATA.id);
          router.refresh();
          toast.success("Workspace deleted successfully.");
        } catch (error) {
          console.log(error);
          if (error instanceof Error && error.message !== "NEXT_REDIRECT") {
            toast.error(
              error instanceof Error
                ? error.message
                : "Something went wrong. Please try again."
            );
          }
        } finally {
          setPending(false);
        }
      },
    });
  };

  return (
    <div className="p-3 md:p-6 max-w-6xl w-full mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Workspace Settings</CardTitle>
          <CardDescription>
            Manage your workspace setting from here
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleonSubmit)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="name">Workspace Name</FormLabel>
                    <FormControl>
                      <Input
                        id="name"
                        placeholder="Enter workspace name"
                        {...field}
                        disabled={pending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="description">Description</FormLabel>
                    <FormControl>
                      <Textarea
                        id="description"
                        placeholder="workspace description"
                        {...field}
                        disabled={pending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <CardFooter className="flex items-center justify-end gap-4">
                <Button type="submit" disabled={pending}>
                  {pending ? "Save..." : "Save"}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Invite Members</CardTitle>
          <CardDescription>
            Invite people to join your workspace
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="flex gap-4">
            <Input
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              placeholder="Enter email address"
            />
            <Button
              onClick={() => handleInvitation()}
              type="button"
              disabled={pending}
            >
              <UserPlus className="mr-2 h-4 w-4" />
              Invite
            </Button>
          </div>

          <div className="space-y-2">
            <Input
              value={inviteLink}
              placeholder="Invite Link"
              readOnly
              disabled
            />

            <div className="flex items-center justify-end mt-4 gap-2">
              <Button
                variant={"outline"}
                onClick={() => copyInviteLink()}
                type="button"
              >
                <Link className="mr-2 h-4 w-4" />
                Copy
              </Button>

              <Button
                variant={"destructive"}
                onClick={() => handleReset()}
                type="button"
                disabled={pending}
              >
                <UserPlus className="mr-2 h-4 w-4" />
                Reset
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-destructive">Danger Zone</CardTitle>
          <CardDescription>Delete your entire workspace</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <Button
            variant={"destructive"}
            onClick={() => handleDelete()}
            type="button"
            disabled={pending}
            className="cursor-pointer"
          >
            Delete Workspace
          </Button>
        </CardContent>
      </Card>

      <ConfirmationDialog
        isOpen={isOpen}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        title={confirmationOptions?.title}
        message={confirmationOptions?.message}
      />
    </div>
  );
};

export default WorkspceSettingsForm;
