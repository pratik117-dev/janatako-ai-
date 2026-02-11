"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { to: "/", label: "गृहपृष्ठ" },
  { to: "/about", label: "JAI को बारेमा" },
  { to: "/vision", label: "भिजन" },
  { to: "/blogs", label: "विश्लेषण" },
  { to: "/contact", label: "सोध्नुहोस्" },
];

const Navbar = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-semibold tracking-tight text-foreground">
          जनताको <span className="text-primary">AI</span>
        </Link>

        {/* Desktop */}
        <ul className="hidden gap-8 md:flex">
          {navItems.map((item) => (
            <li key={item.to}>
              <Link
                href={item.to}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === item.to ? "text-primary" : "text-muted-foreground"
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-border/60 bg-background px-6 pb-4 md:hidden">
          <ul className="flex flex-col gap-3 pt-2">
            {navItems.map((item) => (
              <li key={item.to}>
                <Link
                  href={item.to}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "block text-sm font-medium py-1 transition-colors hover:text-primary",
                    pathname === item.to ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;