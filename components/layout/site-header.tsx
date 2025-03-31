"use client";

import React from "react";
import Link from "next/link";
import { Logo } from "@/components/layout/logo";
import { ThemeToggle } from "@/components/providers/theme-toggle";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Features", href: "/features" },
  { label: "Solutions", href: "/solution" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/90 backdrop-blur-lg">
      <div className="container flex h-16 items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-8">
          <Link href="/">
            <Logo className="h-8 w-auto" />
          </Link>
          <nav className="hidden gap-6 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname?.startsWith(item.href)
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <div className="hidden md:flex gap-2">
            <Link href="/sign-in">
              <Button variant="ghost" size="sm">Sign In</Button>
            </Link>
            <Link href="/sign-up">
              <Button size="sm">Get Started</Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
} 