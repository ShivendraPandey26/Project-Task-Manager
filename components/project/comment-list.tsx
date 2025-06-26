import React from "react";
import ProfileAvatar from "../profile-avatar";
import { formatDistanceToNow } from "date-fns";
import { Comment } from "@prisma/client";

export interface CommentProps extends Comment {
  user: {
    id: string;
    name: string;
    image: string;
  };
}

const CommentList = ({ comments }: { comments: CommentProps[] }) => {
  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <div key={comment.id} className="flex items-start gap-4">
          <ProfileAvatar
            url={comment.user.image || undefined}
            name={comment.user.name}
            numOfchars={2}
            size="lg"
          />

          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="font-medium">{comment.user.name}</span>{" "}
              <span className="text-xs text-muted-foreground">
                {formatDistanceToNow(new Date(comment.createdAt), {
                  addSuffix: true,
                })}
              </span>
            </div>
            <p className="text-sm">{comment.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentList;
