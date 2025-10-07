import { useEffect, useMemo, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/auth.store";
import { useTheme } from "@/components/theme/UseTheme";
import { Home, Image, Compass, User, Sun, Moon } from "lucide-react";
import { gsap } from "gsap";

export function Navbar() {
  const location = useLocation();
  const { isAuthenticated } = useAuthStore();
  const { theme, setTheme } = useTheme();

  const linkRefs = useRef<HTMLAnchorElement[]>([]);
  const mobileRefs = useRef<HTMLAnchorElement[]>([]);
  const underlineRef = useRef<HTMLDivElement>(null);

  const navItems = useMemo(
    () => [
      { path: "/", label: "Accueil", icon: <Home className="w-5 h-5" /> },
      {
        path: "/gallery",
        label: "Galerie",
        icon: <Image className="w-5 h-5" />,
      },
      {
        path: "/explore",
        label: "Explorer",
        icon: <Compass className="w-5 h-5" />,
      },
    ],
    []
  );

  // Underline animation desktop
  useEffect(() => {
    const activeIndex = navItems.findIndex(
      (item) => item.path === location.pathname
    );
    if (
      activeIndex === -1 ||
      !linkRefs.current[activeIndex] ||
      !underlineRef.current
    )
      return;

    const linkEl = linkRefs.current[activeIndex];
    gsap.to(underlineRef.current, {
      width: linkEl.offsetWidth,
      x: linkEl.offsetLeft,
      duration: 0.3,
      ease: "power2.out",
    });
  }, [location.pathname, navItems]);

  // Hover animation mobile icons
  useEffect(() => {
    mobileRefs.current.forEach((el) => {
      gsap.set(el, { scale: 1 });
      el.addEventListener("mouseenter", () =>
        gsap.to(el, { scale: 1.2, y: -3, duration: 0.2, ease: "power2.out" })
      );
      el.addEventListener("mouseleave", () =>
        gsap.to(el, { scale: 1, y: 0, duration: 0.2, ease: "power2.out" })
      );
    });
  }, []);

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  const getTextColor = (isActive: boolean) =>
    isActive
      ? "text-primary"
      : theme === "dark"
      ? "text-white/80"
      : "text-foreground/80";

  const getMobileBg = (isActive: boolean) =>
    isActive
      ? "bg-primary/20 text-primary"
      : theme === "dark"
      ? "text-white/80"
      : "text-foreground/80";

  return (
    <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md z-50 border-b border-border">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-full" />
            <span className="hidden md:inline md:text-lg lg:text-xl font-bold">
              Hackathon
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center space-x-8 relative">
            {navItems.map((item, i) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  ref={(el) => {
                    if (el) linkRefs.current[i] = el;
                  }}
                  to={item.path}
                  className={`relative text-sm font-medium transition-colors hover:text-primary ${getTextColor(
                    isActive
                  )}`}
                >
                  {item.label}
                </Link>
              );
            })}
            <div
              ref={underlineRef}
              className="absolute bottom-0 left-0 h-[2px] bg-primary rounded-full"
            />
          </div>

          {/* Mobile nav */}
          <div className="flex md:hidden items-center space-x-4">
            {navItems.map((item, i) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  ref={(el) => {
                    if (el) mobileRefs.current[i] = el;
                  }}
                  to={item.path}
                  className={`relative p-2 rounded-md transition-colors ${getMobileBg(
                    isActive
                  )}`}
                >
                  {item.icon}
                </Link>
              );
            })}

            {/* Theme toggle */}
            <Button
              variant="ghost"
              onClick={toggleTheme}
              className="p-2 rounded-md"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </Button>

            {/* User / Login icon mobile */}
            <Link
              to={isAuthenticated ? "/admin/dashboard" : "/login"}
              className="p-2 rounded-md text-foreground/80 hover:text-primary transition-colors"
            >
              <User className="w-5 h-5" />
            </Link>
          </div>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center space-x-2">
            <Button
              variant="ghost"
              onClick={toggleTheme}
              className="p-2 rounded-md"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </Button>

            {isAuthenticated ? (
              <Button
                asChild
                variant="ghost"
                className="inline-flex items-center space-x-1"
              >
                <Link to="/admin/dashboard">
                  <User className="w-4 h-4 mr-1" />
                  Dashboard
                </Link>
              </Button>
            ) : (
              <Button
                asChild
                variant="outline"
                className="inline-flex items-center space-x-1"
              >
                <Link to="/login">
                  <User className="w-4 h-4 mr-1" />
                  Espace Admin
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
