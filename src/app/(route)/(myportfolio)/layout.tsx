import { ReactNode } from "react";
import Footer from "./_modules/components/footer";
import Navbar from "./_modules/components/navbar";
import { Separator } from "@/components/ui/separator";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-rows-[min-content_1fr_min-content] 
    min-h-screen space-y-4 max-w-[600px] w-full mx-auto"
    >
      <header className="px-3">
        <nav>
          <Navbar />
        </nav>
      </header>

      <main className="px-3">
        {children}
      </main>

      <Separator />

      <footer className="px-3">
        <Footer />
      </footer>
    </div>
  );
}
