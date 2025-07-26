"use client"

import * as React from "react"
import { Search, LogIn, UserPlus, Menu, Home, Info, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { NotificationDropdown } from "./notification-dropdown"
import { useTheme } from "next-themes";
import { Switch } from "@/components/ui/switch";

export function Navigation() {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-xl border-b border-slate-200/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <a
              href="/"
              className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
            >
              NexaUI
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="/"
              className="text-slate-700 hover:text-slate-900 font-medium transition-colors duration-200 flex items-center space-x-2"
            >
              <Home className="h-4 w-4" />
              <span>Home</span>
            </a>
            <a
              href="/about"
              className="text-slate-700 hover:text-slate-900 font-medium transition-colors duration-200 flex items-center space-x-2"
            >
              <Info className="h-4 w-4" />
              <span>About</span>
            </a>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border-slate-200 focus:bg-white focus:border-blue-300 focus:ring-blue-200 rounded-lg"
              />
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-2">
            {/* Profile Icon */}
            <a href="/profile" className="flex items-center justify-center rounded-full p-2 hover:bg-slate-100 transition-colors" title="Profile">
              <User className="h-5 w-5 text-slate-700 hover:text-blue-600" />
            </a>
            {/* Theme Toggle */}
            <ThemeToggle />
            <NotificationDropdown />

            <div className="h-6 w-px bg-slate-200 mx-2"></div>

            <Button
              variant="outline"
              size="sm"
              className="text-slate-700 border-slate-200 hover:bg-slate-100 hover:text-slate-900 hover:border-slate-300 transition-all duration-200 px-2.5 py-1.5 sm:px-3 sm:py-2 md:px-3 md:py-2 lg:px-4 lg:py-2 rounded-lg font-medium bg-white shadow-sm hover:shadow-md whitespace-nowrap min-w-fit"
              asChild
            >
              <a href="/login" className="flex items-center space-x-1.5">
                <LogIn className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" />
                <span className="text-xs sm:text-sm font-medium">Login</span>
              </a>
            </Button>

            <Button
              size="sm"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium px-2.5 py-1.5 sm:px-3 sm:py-2 md:px-3 md:py-2 lg:px-4 lg:py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-0 whitespace-nowrap min-w-fit"
              asChild
            >
              <a href="/signup" className="flex items-center space-x-1.5">
                <UserPlus className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" />
                <span className="text-xs sm:text-sm font-medium">Sign Up</span>
              </a>
            </Button>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="p-2">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 bg-white/95 backdrop-blur-xl">
                <div className="flex flex-col space-y-6 mt-6">
                  {/* Mobile Search */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      type="search"
                      placeholder="Search..."
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border-slate-200 focus:bg-white focus:border-blue-300 focus:ring-blue-200 rounded-lg"
                    />
                  </div>

                  {/* Mobile Navigation Links */}
                  <div className="flex flex-col space-y-3">
                    <a
                      href="/"
                      className="flex items-center space-x-3 text-slate-700 hover:text-slate-900 font-medium transition-colors duration-200 p-3 rounded-lg hover:bg-slate-50"
                      onClick={() => setIsOpen(false)}
                    >
                      <Home className="h-5 w-5" />
                      <span>Home</span>
                    </a>
                    <a
                      href="/about"
                      className="flex items-center space-x-3 text-slate-700 hover:text-slate-900 font-medium transition-colors duration-200 p-3 rounded-lg hover:bg-slate-50"
                      onClick={() => setIsOpen(false)}
                    >
                      <Info className="h-5 w-5" />
                      <span>About</span>
                    </a>
                  </div>

                  {/* Mobile Notification */}
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <span className="font-medium text-slate-700">Notifications</span>
                    <NotificationDropdown />
                  </div>

                  {/* Mobile Auth Buttons */}
                  <div className="flex flex-col space-y-3 pt-4 border-t border-slate-200">
                    <Button
                      variant="outline"
                      className="w-full text-slate-700 border-slate-200 hover:bg-slate-100 hover:text-slate-900 hover:border-slate-300 transition-all duration-200 px-4 py-3 rounded-lg font-medium bg-white shadow-sm hover:shadow-md"
                      asChild
                    >
                      <a href="/login" className="flex items-center justify-center space-x-3">
                        <LogIn className="h-4 w-4" />
                        <span>Login</span>
                      </a>
                    </Button>

                    <Button
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium px-4 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-0"
                      asChild
                    >
                      <a href="/signup" className="flex items-center justify-center space-x-3">
                        <UserPlus className="h-4 w-4" />
                        <span>Sign Up</span>
                      </a>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return (
    <div className="flex items-center space-x-2">
      <span className="text-xs text-slate-500">🌞</span>
      <Switch
        checked={isDark}
        onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
        aria-label="Toggle dark mode"
      />
      <span className="text-xs text-slate-500">🌙</span>
    </div>
  );
}
