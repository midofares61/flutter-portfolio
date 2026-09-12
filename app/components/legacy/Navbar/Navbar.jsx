"use client";

import { FaGithub, FaLinkedinIn, FaSun, FaMoon, FaBars, FaTimes } from "react-icons/fa";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { personalInfo } from "../../../constants/data";

const navLinks = [
  { path: "/", label: "Home" },
  { path: "/Projects", label: "Projects" },
  { path: "/About", label: "About" },
  { path: "/Contact", label: "Contact" },
];

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => setMounted(true), []);

  const handleDarkMode = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const isLight = theme === "light";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [mobileOpen]);

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-400 ${
        scrolled 
          ? "py-3 shadow-lg" 
          : "py-4 bg-transparent"
      }`}
      style={{
        background: scrolled ? 'var(--glassBg)' : 'transparent',
        backdropFilter: scrolled ? 'var(--glassBlur)' : 'none',
        WebkitBackdropFilter: scrolled ? 'var(--glassBlur)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link 
          href="/" 
          className="relative w-12 h-12 md:w-16 md:h-16 transition-all duration-300 hover:scale-105" 
          onClick={() => setMobileOpen(false)}
        >
          {mounted && (
            <Image
              src={isLight ? "/logo-light.svg" : "/logo-dark.svg"}
              alt="Logo"
              fill
              sizes="(max-width: 768px) 48px, 64px"
              className="object-contain"
              priority
            />
          )}
        </Link>

        <nav className="flex items-center gap-2">
          <div className="hidden lg:flex items-center gap-1 mr-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`relative text-[15px] font-bold px-4 py-2 transition-all duration-300`}
                  style={{
                    color: isActive ? 'var(--mainColor)' : 'var(--textMuted)',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) e.currentTarget.style.color = 'var(--textColor)';
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.color = 'var(--textMuted)';
                  }}
                >
                  {link.label}
                  {isActive && (
                    <motion.span 
                      layoutId="nav_active"
                      className="absolute bottom-1 left-1/2 -translate-x-1/2 w-5 h-[3px] rounded-full"
                      style={{ background: 'var(--gradient)' }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            {mounted && (
              <button
                className="w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-300 hover:scale-105"
                style={{
                  background: 'rgba(200, 162, 90, 0.08)',
                  color: 'var(--mainColor)',
                }}
                onClick={handleDarkMode}
                aria-label="Toggle theme"
              >
                <motion.div
                  key={isLight ? "sun" : "moon"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {isLight ? <FaMoon /> : <FaSun />}
                </motion.div>
              </button>
            )}

            <a
              href={personalInfo.github}
              className="w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-300"
              style={{ color: 'var(--textMuted)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--mainColor)';
                e.currentTarget.style.background = 'rgba(200, 162, 90, 0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--textMuted)';
                e.currentTarget.style.background = 'transparent';
              }}
              target="_blank"
              rel="noreferrer"
              aria-label="Github"
            >
              <FaGithub size={18} />
            </a>
            <a
              href={personalInfo.linkedin}
              className="w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-300"
              style={{ color: 'var(--textMuted)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--mainColor)';
                e.currentTarget.style.background = 'rgba(200, 162, 90, 0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--textMuted)';
                e.currentTarget.style.background = 'transparent';
              }}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn size={18} />
            </a>

            <button
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-300 ml-1"
              style={{
                background: 'rgba(200, 162, 90, 0.08)',
                color: 'var(--textColor)',
              }}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed top-[80px] left-0 w-full p-4 flex flex-col gap-1 z-[999] shadow-2xl"
            style={{
              background: 'var(--glassBg)',
              backdropFilter: 'var(--glassBlur)',
              WebkitBackdropFilter: 'var(--glassBlur)',
              borderBottom: 'var(--glassBorder)',
            }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {navLinks.map((link, index) => {
               const isActive = pathname === link.path;
               return (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={link.path}
                    className={`block px-5 py-4 text-base font-bold rounded-xl transition-all duration-300`}
                    style={{
                      color: isActive ? 'var(--mainColor)' : 'var(--textMuted)',
                      background: isActive ? 'rgba(200, 162, 90, 0.08)' : 'transparent',
                    }}
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
               );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
