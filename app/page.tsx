import { RedirectType, redirect } from "next/navigation";

export default function App() {
  redirect("/app", RedirectType.replace);
}
