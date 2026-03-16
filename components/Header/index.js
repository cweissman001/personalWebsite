import { Popover } from "@headlessui/react";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Button from "../Button";
// Local Data
import data from "../../data/portfolio.json";

const Header = ({ handleWorkScroll, handleAboutScroll, isBlog }) => {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const { name, showBlog, showResume } = data;

  useEffect(() => {
    setMounted(true);
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = !isBlog ? [
    { label: "Work", onClick: handleWorkScroll },
    { label: "About", onClick: handleAboutScroll },
    ...(showBlog ? [{ label: "Blog", onClick: () => router.push("/blog") }] : []),
    ...(showResume ? [{ label: "Resume", onClick: () => router.push("/resume") }] : []),
    { label: "Contact", onClick: () => window.open("mailto:claire.weissman@gmail.com") }
  ] : [
    { label: "Home", onClick: () => router.push("/") },
    ...(showBlog ? [{ label: "Blog", onClick: () => router.push("/blog") }] : []),
    ...(showResume ? [{ label: "Resume", onClick: () => router.push("/resume") }] : []),
    { label: "Contact", onClick: () => window.open("mailto:claire.weissman@gmail.com") }
  ];

  return (
    <>
      {/* Mobile Header */}
      <Popover className="block tablet:hidden mt-5">
        {({ open }) => (
          <>
            <div className="flex items-center justify-between p-4 laptop:p-0">
              <h1
                onClick={() => router.push("/")}
                className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent cursor-pointer"
              >
                {name}
              </h1>

              <div className="flex items-center gap-3">
                {mounted && theme && data.darkMode && (
                  <Button
                    onClick={() =>
                      setTheme(theme === "dark" ? "light" : "dark")
                    }
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                  >
                    <img
                      className="h-5 w-5"
                      src={`/images/${
                        theme === "dark" ? "moon.svg" : "sun.svg"
                      }`}
                      alt="Theme toggle"
                    />
                  </Button>
                )}

                <Popover.Button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors">
                  <img
                    className="h-5 w-5"
                    src={`/images/${
                      !open
                        ? theme === "dark"
                          ? "menu-white.svg"
                          : "menu.svg"
                        : theme === "light"
                        ? "cancel.svg"
                        : "cancel-white.svg"
                    }`}
                    alt="Menu"
                  />
                </Popover.Button>
              </div>
            </div>
            <Popover.Panel
              className={`absolute right-4 left-4 top-20 z-50 p-6 rounded-2xl shadow-2xl border backdrop-blur-sm transition-all duration-300 ${
                theme === "dark" 
                  ? "bg-slate-900/95 border-slate-700" 
                  : "bg-white/95 border-gray-200"
              }`}
            >
              <div className="space-y-3">
                {navItems.map((item, index) => (
                  <Button
                    key={index}
                    onClick={item.onClick}
                    className="w-full justify-start text-left p-3 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                  >
                    {item.label}
                  </Button>
                ))}
              </div>
            </Popover.Panel>
          </>
        )}
      </Popover>

      {/* Desktop Header */}
      <header
        className={`hidden tablet:flex sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? theme === "dark" 
              ? "bg-slate-900/95 backdrop-blur-sm border-b border-slate-800 shadow-lg"
              : "bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1
              onClick={() => router.push("/")}
              className="font-bold text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent cursor-pointer hover:scale-105 transition-transform"
            >
              {name}
            </h1>
            
            <nav className="flex items-center gap-2">
              {navItems.map((item, index) => (
                <Button
                  key={index}
                  onClick={item.onClick}
                  className="px-4 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 font-medium"
                >
                  {item.label}
                </Button>
              ))}
              
              {mounted && theme && data.darkMode && (
                <Button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-all duration-200"
                >
                  <img
                    className="h-5 w-5"
                    src={`/images/${theme === "dark" ? "moon.svg" : "sun.svg"}`}
                    alt="Theme toggle"
                  />
                </Button>
              )}
            </nav>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
