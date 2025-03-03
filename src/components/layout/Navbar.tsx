import clsx from "clsx";
import { Link, useLocation } from "react-router";
import Logo from "../../assets/Logo.svg";
const Navbar = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path
      ? "tex-blue font-semibold"
      : "font-medium text-muted-foreground";
  };

  return (
    <header className="border-b border-gray-200 bg-white text-blue">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold">
          <img src={Logo} alt="Neos" />
        </Link>
        <nav className="flex items-center space-x-8">
          <Link
            to="/"
            className={clsx("text-small leading-normal", isActive("/"))}
          >
            Dashboard
          </Link>
          <Link
            to="/territories"
            className={clsx(
              "text-small leading-normal",
              isActive("/territories")
            )}
          >
            Territories
          </Link>
          <Link
            to="/classifications"
            className={clsx(
              "text-small leading-normal",
              isActive("/classifications")
            )}
          >
            Classifications
          </Link>
          <Link
            to="/data"
            className={clsx("text-small leading-normal", isActive("/data"))}
          >
            Data
          </Link>
          <Link
            to="/reports"
            className={clsx("text-small leading-normal", isActive("/reports"))}
          >
            Reports
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
