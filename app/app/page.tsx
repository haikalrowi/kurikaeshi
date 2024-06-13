import { Dashboard } from "@/components/Dashboard";
import { Login } from "@/components/Login";
import { appContext } from "@/lib/action";

export default async function App2() {
  try {
    const app = await appContext();
    return <Dashboard appContext={app} />;
  } catch (error) {
    console.log(error);
    return <Login />;
  }
}
