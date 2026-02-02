import { redirect } from "next/navigation";

export default function Page() {
  // Redirect to dashboard (middleware will handle auth check)
  redirect("/dashboard");
}
