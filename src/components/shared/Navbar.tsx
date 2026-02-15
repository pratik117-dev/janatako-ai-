"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Menu, X, Globe } from "lucide-react";

const navItems = [
  { to: "/", label: "गृह पृष्ठ" },
  { to: "/about", label: "परिचय" },
  { to: "/projects", label: "प्रोजेक्ट मार्केट" },
  { to: "/vision", label: "भिजन" },
  { to: "/contact", label: "निर्वाचन अपडेट" },
];

const Navbar = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("NP");

  const toggleLanguage = () => {
    setCurrentLang(currentLang === "NP" ? "EN" : "NP");
  };

  return (
    <header className="sticky  top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <nav className="mx-auto max-w-7xl px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Left Side - Using Global CSS Classes */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              {/* Logo Circle with gradient from global CSS */}
              <div className="w-10 h-10 rounded-full nav-logo-gradient flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                <span className="text-white text-xl font-bold">J</span>
              </div>
              {/* AI Badge using global CSS class */}
              <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 nav-badge rounded-full border-2 border-white flex items-center justify-center">
                <span className="text-white text-[8px] font-bold">AI</span>
              </div>
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900 leading-none">
                जनताको <span className="text-primary-color">AI</span>
              </h1>
              <p className="text-[10px] text-gray-500 uppercase tracking-wider">
                The Citizens' AI
              </p>
            </div>
          </Link>

          {/* Desktop Navigation - Using Global CSS Classes */}
          <div className="hidden md:flex items-center gap-8">
            {/* Nav Links */}
            <div className="flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  href={item.to}
                  className={cn(
                    "nav-link",
                    pathname === item.to
                      ? "nav-link-active"
                      : "nav-link-inactive"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Language Switcher - Using utility classes */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-gray-700 hover-border-primary-color hover-primary-color transition-all duration-300"
              aria-label="Switch language"
            >
              <Globe size={18} strokeWidth={2} />
              <span className="text-sm font-medium">{currentLang}</span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-gray-700 p-2 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu - Using Global CSS Classes */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg animate-slide-down">
          <ul className="flex flex-col px-6 py-4 space-y-1">
            {navItems.map((item) => (
              <li key={item.to}>
                <Link
                  href={item.to}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "block px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                    pathname === item.to
                      ? "bg-primary-color text-white"
                      : "text-gray-700 hover:bg-gray-50"
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="pt-2 border-t border-gray-100">
              <button
                onClick={toggleLanguage}
                className="w-full flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <Globe size={18} />
                <span>{currentLang === "NP" ? "English" : "नेपाली"}</span>
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;