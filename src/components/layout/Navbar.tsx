import { useAuth } from "@/hooks/useAuth";
import { FC } from "react";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";

export const Navbar: FC = () => {
  const navigate = useNavigate();
  const { handleLogout } = useAuth(navigate);

  return (
    <div>
      <header className="flex h-16 w-full shrink-0 items-center px-4 md:px-6 border-b">
        <a className="flex items-center gap-2 text-lg font-semibold" href="#">
          <MountainIcon className="w-6 h-6" />
          <span className="sr-only">Acme Inc</span>
        </a>
        <nav className="ml-auto flex items-center gap-4">
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            to="/dashboard"
          >
            Dashboard
          </Link>
          <a
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            Templates
          </a>
          <a
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            Groups
          </a>
          <a
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            Credentials
          </a>
          <a
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            Analytics
          </a>
          <a
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            Profile
          </a>
          <Button onClick={handleLogout} size="sm" variant="ghost">
            Logout
          </Button>{" "}
        </nav>
      </header>
    </div>
  );
};
export const MountainIcon: FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
};
export default Navbar;
