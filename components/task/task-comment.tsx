"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Comment, User } from "@prisma/client";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { useProjectId } from "@/hooks/use-project-id";
import { useRouter } from "next/navigation";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import CommentList from "../project/comment-list";
import { toast } from "sonner";
import { postComments } from "@/app/actions/project";

type CommentWithUser = Comment & {
  user: User;
};

interface TaskCommentsProps {
  taskId: string;
  comments: CommentWithUser[];
}

const TaskComment = ({ taskId, comments }: TaskCommentsProps) => {
  const workspaceId = useWorkspaceId();
  const projectId = useProjectId();
  const router = useRouter();

  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      await postComments(workspaceId as string, projectId, newComment);
      toast.success("Comment posted successfully");
      setNewComment("");
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  console.log({ comments });

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Comment</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="space-y-4">
          <Textarea
            placeholder="Add a comment..."
            className="min-h-[100px]"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />

          <Button
            disabled={isSubmitting || !newComment.trim()}
            onClick={handleSubmit}
          >
            Add Comment
          </Button>
        </div>

        <CommentList comments={comments as any} />
      </CardContent>
    </Card>
  );
};

export default TaskComment;
