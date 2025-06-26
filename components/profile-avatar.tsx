import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { cn } from "@/lib/utils";

const ProfileAvatar = ({
  url,
  name,
  size = "md",
  className,
  numOfchars = 1,
}: {
  url?: string;
  name: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  numOfchars?: number;
}) => {
  return (
    <Avatar
      className={cn(
        "h-8 w-8 rounded-md",
        size === "sm" && "h-6 w-6",
        size === "md" && "h-8 w-8",
        size === "lg" && "h-10 w-10",
        className
      )}
    >
      <AvatarImage src={url || undefined} alt={name} />
      <AvatarFallback className="bg-blue-500 text-white rounded-md">
        {name.substring(0, numOfchars).toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
};

export default ProfileAvatar;
