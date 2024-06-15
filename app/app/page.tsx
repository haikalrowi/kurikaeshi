import { Dashboard } from "@/components/Dashboard";
import { Login } from "@/components/Login";
import { context } from "@/lib/action/app";
import { login } from "@/lib/action/user";
import { cookies } from "next/headers";

export default async function App2() {
  const token = cookies().get(login.name)?.value;
  try {
    const appContext = await context(token);
    return <Dashboard appContext={appContext} />;
  } catch (error) {
    console.log(error);
    return <Login />;
  }
}
