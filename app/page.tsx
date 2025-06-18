import { Button } from "@/components/ui/button";
import {
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";

export default function Home() {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">Welcome to the Home Page</h1>
      <div className="flex space-x-4">
        <Button>
          <LoginLink>Login</LoginLink>
        </Button>
        <Button>
          <RegisterLink>Register</RegisterLink>
        </Button>
      </div>
    </div>
  );
}
