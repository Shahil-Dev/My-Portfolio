"use client";

import React, { useState, useEffect } from "react";
import { Menu, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

interface MenuItem {
  title: string;
  url: string; 
}

interface NavbarProps {
  className?: string;
  name?: string;
  menu?: MenuItem[];
}

const Navbar = ({
  name = "Yemtehan Shahil",
  menu = [
    { title: "Home", url: "#home" },
    { title: "About", url: "#about" },
    { title: "Projects", url: "#projects" },
    { title: "Contact", url: "#contact" },
  ],
  className,
}: NavbarProps) => {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, url: string) => {
    e.preventDefault();
    const targetId = url.replace("#", "");
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
      document.documentElement.classList.remove("dark");
    } else {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    }
  };

  return (
    <section className={cn("fixed top-4 left-0 right-0 z-50 px-4", className)}>
      <div className="max-w-6xl mx-auto bg-background/80 backdrop-blur-md border rounded-full px-6 py-3 shadow-sm">
        
        {/* Desktop Menu */}
        <nav className="hidden items-center justify-between lg:flex">
          {/* Brand Name */}
          <a 
            href="#home" 
            onClick={(e) => handleScroll(e, "#home")}
            className="text-lg font-bold tracking-tight hover:opacity-80 transition-opacity"
          >
            {name}
          </a>

          {/* Centered Routes */}
          <div className="flex items-center gap-6">
            {menu.map((item) => (
              <a
                key={item.title}
                href={item.url}
                onClick={(e) => handleScroll(e, item.url)}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.title}
              </a>
            ))}
          </div>

          {/* Right Side: Theme Toggle */}
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleTheme} 
              className="rounded-full"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="size-5" /> : <Moon className="size-5" />}
            </Button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className="flex items-center justify-between lg:hidden">
          {/* Brand Name */}
          <a 
            href="#home" 
            onClick={(e) => handleScroll(e, "#home")}
            className="text-md font-bold tracking-tight"
          >
            {name}
          </a>
          
          <div className="flex items-center gap-2">
            {/* Theme Toggle for Mobile */}
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleTheme} 
              className="rounded-full"
            >
              {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
            </Button>

            {/* Mobile Sheet Trigger */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-full">
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[250px] sm:w-[300px]">
                <SheetHeader>
                  <SheetTitle className="text-left">{name}</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-5 mt-8">
                  {menu.map((item) => (
                    <a
                      key={item.title}
                      href={item.url}
                      onClick={(e) => handleScroll(e, item.url)}
                      className="text-base font-medium text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {item.title}
                    </a>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

      </div>
    </section>
  );
};

export { Navbar };