import { Button } from "@/components/ui/button";
import ThemeSelection from "./nav-right/theme-selection";
import UserMenu from "./nav-right/user-menu";
import Logout from "./nav-right/logout";

export default function NavRight() {
  return (
    <div className="flex flex-row gap-4">
      <div className="flex gap-2">
        <Button>Resume</Button>
        <ThemeSelection />
      </div>
      <div className="flex items-center gap-2">
        <Logout />
        <UserMenu />
      </div>
    </div>
  );
}
