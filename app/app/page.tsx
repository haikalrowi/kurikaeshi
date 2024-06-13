import { Dashboard } from "@/components/Dashboard";
import { Login } from "@/components/Login";
import { appContext, userLogin } from "@/lib/action";
import { cookies } from "next/headers";

export default async function App2() {
  const token = cookies().get(userLogin.name)?.value;
  try {
    const app = await appContext(token);
    return <Dashboard appContext={app} />;
  } catch (error) {
    console.log(error);
    return <Login />;
  }
}
