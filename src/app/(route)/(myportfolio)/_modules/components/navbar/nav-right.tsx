import { Button } from "@/components/ui/button";
import ThemeSelection from "./nav-right/theme-selection";
import UserMenu from "./nav-right/user-menu";
import Login from "@/components/global-ui/login";

export default function NavRight() {
  return (
    <div className="flex flex-row gap-4">
      <div className="flex gap-2">
        <Button>Resume</Button>
        <ThemeSelection /> 
        <Login />
      </div>
      <div>
        <UserMenu />
      </div>
    </div>
  );
}
