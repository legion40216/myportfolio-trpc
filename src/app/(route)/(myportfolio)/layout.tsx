import { ReactNode } from "react";
import Footer from "./_modules/components/footer";
import Navbar from "./_modules/components/navbar";
import { Separator } from "@/components/ui/separator";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-rows-[min-content_1fr_min-content] 
    min-h-full space-y-4 max-w-[600px] w-full mx-auto px-4"
    >
      <header>
        <nav>
          <Navbar />
        </nav>
      </header>

      <main>{children}</main>

      <Separator />

      <footer>
        <Footer />
      </footer>
    </div>
  );
}
