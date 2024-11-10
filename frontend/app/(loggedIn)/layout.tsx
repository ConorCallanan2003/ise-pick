import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("pbAuthToken");
  if (!authToken) {
    redirect("/sign-in");
  }
  const base64Url = authToken.value.split(".")[1];
  const base64 = base64Url.replace("-", "+").replace("_", "/");
  const jwt = JSON.parse(atob(base64));
  const userId = jwt["id"];
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_PB_URL}api/collections/users/records/${userId}`,
    { headers: { Authorization: authToken.value } }
  );
  const userData = await response.json();
  if (!userData.verified) {
    redirect("/unverified-account");
  }
  return <div className="">{children}</div>;
}
