import { ReactNode } from "react";
import NavAuth from "./_modules/components/navbar";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="container mx-auto p-4 h-screen">
      <div className="grid grid-rows-[min-content_1fr] gap-y-4 h-full">
        <NavAuth />

        <main className="grid place-items-center">
          {children}
        </main>
      </div>
    </div>
  );
}
