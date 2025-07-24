"use client"

import * as React from "react"
import { Bell, Home, Info, LogIn, UserPlus, Menu, Search, DollarSign, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"

const navigationItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Features", href: "#features", icon: Info },
  { name: "Pricing", href: "#pricing", icon: DollarSign },
  { name: "About", href: "/about", icon: MessageSquare },
]

export function Navigation() {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-xl border-b border-slate-200 shadow-sm">
      <div className="container mx-auto px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <a href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-300">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">N</span>
              </div>
              <span className="text-xl font-bold text-slate-900">NexaUI</span>
            </a>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search..."
                className="pl-10 bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navigationItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="flex items-center space-x-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-slate-50"
              >
                <item.icon className="h-4 w-4" />
                <span>{item.name}</span>
              </a>
            ))}

            <Button
              variant="ghost"
              size="sm"
              className="text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all duration-200"
            >
              <Bell className="h-4 w-4" />
            </Button>

            <div className="flex items-center space-x-2 ml-4 pl-4 border-l border-slate-200">
              <Button
                variant="outline"
                size="sm"
                className="text-slate-700 border-slate-300 hover:bg-slate-50 hover:text-slate-900 hover:border-slate-400 transition-all duration-200 px-4 py-2 rounded-lg font-medium bg-white"
                asChild
              >
                <a
                  href="/login"
                  className="flex items-center space-x-1.5 bg-white hover:bg-slate-100 text-slate-700 hover:text-slate-900 rounded-lg px-2.5 py-1.5 sm:px-3 sm:py-2 transition-all duration-200 border border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-md whitespace-nowrap min-w-fit"
                >
                  <LogIn className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" />
                  <span className="text-xs sm:text-sm font-medium">Login</span>
                </a>
              </Button>
              <Button
                size="sm"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium px-4 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-0"
                asChild
              >
                <a
                  href="/signup"
                  className="flex items-center space-x-1.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white hover:text-white rounded-lg px-2.5 py-1.5 sm:px-3 sm:py-2 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 whitespace-nowrap min-w-fit"
                >
                  <UserPlus className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" />
                  <span className="text-xs sm:text-sm font-medium">Sign Up</span>
                </a>
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-white border-l border-slate-200">
              <div className="flex flex-col space-y-6 mt-6">
                <div className="flex flex-col space-y-4">
                  {navigationItems.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="flex items-center space-x-3 text-lg font-medium text-slate-600 hover:text-slate-900 px-4 py-3 rounded-lg hover:bg-slate-50 transition-all duration-200"
                      onClick={() => setIsOpen(false)}
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.name}</span>
                    </a>
                  ))}
                </div>
                <div className="pt-4 space-y-3 border-t border-slate-200">
                  <Button
                    variant="outline"
                    className="w-full justify-start text-slate-700 border-slate-300 hover:bg-slate-50 hover:text-slate-900 hover:border-slate-400 px-4 py-3 rounded-lg font-medium bg-white"
                    asChild
                  >
                    <a
                      href="/login"
                      className="flex items-center space-x-3 bg-white hover:bg-slate-100 text-slate-700 hover:text-slate-900 rounded-lg px-4 py-3 transition-all duration-200 border border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-md w-full whitespace-nowrap"
                    >
                      <LogIn className="h-4 w-4 flex-shrink-0" />
                      <span>Login</span>
                    </a>
                  </Button>
                  <Button
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium px-4 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border-0"
                    asChild
                  >
                    <a
                      href="/signup"
                      className="flex items-center space-x-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white hover:text-white rounded-lg px-4 py-3 transition-all duration-300 shadow-lg hover:shadow-xl w-full whitespace-nowrap"
                    >
                      <UserPlus className="h-4 w-4 flex-shrink-0" />
                      <span>Sign Up</span>
                    </a>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}
