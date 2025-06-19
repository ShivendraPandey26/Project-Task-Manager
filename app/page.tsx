import { Button } from "@/components/ui/button";
import {
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/dist/client/link";

export default async function Home() {
  const { isAuthenticated } = getKindeServerSession();
  const isUserAuthenticated = await isAuthenticated();

  return (
    <main className="w-full h-screen flex flex-col items-center justify-center px-6 text-center bg-gradient-to-br from-slate-100 to-white dark:from-gray-900 dark:to-gray-800 transition-colors">
      <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-4">
        Welcome to the Project Task Manager
      </h1>

      <div className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 space-y-2 mb-6">
        <p>Your one-stop solution</p>
        <p>
          for{" "}
          <span className="font-semibold text-indigo-600 dark:text-indigo-400">
            managing tasks and projects efficiently.
          </span>
        </p>
      </div>

      <p className="max-w-xl text-sm sm:text-base text-gray-500 dark:text-gray-400 mb-8">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga
        consequuntur optio est quam veniam provident ipsa reprehenderit at
        reiciendis nulla?
      </p>

      {isUserAuthenticated ? (
        <>
          <Button asChild className="px-6 py-2 text-base">
            <Link href="/workspace">Go to Workspace</Link>
          </Button>
        </>
      ) : (
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild className="px-6 py-2 text-base">
            <LoginLink>Login</LoginLink>
          </Button>
          <Button asChild variant="outline" className="px-6 py-2 text-base">
            <RegisterLink>Register</RegisterLink>
          </Button>
        </div>
      )}
    </main>
  );
}
