import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-center">Admin</h1>
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <Button size={"lg"} asChild>
            <Link href={"/login"}>Login</Link>
          </Button>
          <Button variant={"outline"} size={"lg"} asChild>
            <Link href={"/register"}>Register</Link>
          </Button>
        </div>
      </main>
    </div>
  );
}
