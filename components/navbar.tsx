import React from "react";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import { Bell } from "lucide-react";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import ProfileAvatar from "./profile-avatar";
import { Separator } from "./ui/separator";

interface Props {
  id: string;
  name: string;
  email: string;
  image: string;
}

const Navbar = ({ id, email, name, image }: Props) => {
  return (
    <nav className="w-full flex items-center justify-between p-4">
      <div>
        <h1 className="text-2xl font-bold">Home</h1>
        <span className="text-sm text-muted-foreground">
          Manage all your task in one place.
        </span>
      </div>

      <div className="flex items-center gap-2">
        <Button variant={"ghost"} className="cursor-pointer">
          <Bell />
        </Button>

        <ModeToggle />

        <Popover>
          <PopoverTrigger asChild>
            <ProfileAvatar url={image || undefined} name={name} />
          </PopoverTrigger>

          <PopoverContent>
            <div className="flex items-center justify-start mb-2">
              <div className="m-2">
                <ProfileAvatar url={image || undefined} name={name} />
              </div>
              <div>
                <h2 className="text-lg font-semibold">{name}</h2>
                <p className="text-sm text-muted-foreground">{email}</p>
              </div>
            </div>

            <Separator />

            <Button variant={"ghost"} className="w-full mt-3">
              <LogoutLink>Sign Out</LogoutLink>
            </Button>
          </PopoverContent>
        </Popover>
      </div>
    </nav>
  );
};

export default Navbar;
