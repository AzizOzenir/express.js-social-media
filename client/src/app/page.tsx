import Image from "next/image";
import Login from "./(pages)/(auth)/login/page";
import Stories from "@/components/stories";

export default function Home() {
  return (
    <main className="flex h-screen flex-col items-center justify-between ">
      <Stories/>
    </main>
  );
}
