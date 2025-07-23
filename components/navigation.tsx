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
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-xl border-b border-slate-200">
      <div className="container mx-auto px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">N</span>
            </div>
            <span className="text-xl font-bold text-slate-900">NexaUI</span>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search..."
                className="pl-10 bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navigationItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="flex items-center space-x-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors duration-200"
              >
                <item.icon className="h-4 w-4" />
                <span>{item.name}</span>
              </a>
            ))}

            <Button variant="ghost" size="sm" className="text-slate-600 hover:text-slate-900">
              <Bell className="h-4 w-4" />
            </Button>

            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" className="text-slate-600 hover:text-slate-900" asChild>
                <a href="/login">
                  <LogIn className="h-4 w-4 mr-2" />
                  Login
                </a>
              </Button>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white" asChild>
                <a href="/signup">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Sign Up
                </a>
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="md:hidden text-slate-600">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-white">
              <div className="flex flex-col space-y-6 mt-6">
                <div className="flex flex-col space-y-4">
                  {navigationItems.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="flex items-center space-x-3 text-lg font-medium text-slate-600 hover:text-slate-900"
                      onClick={() => setIsOpen(false)}
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.name}</span>
                    </a>
                  ))}
                </div>
                <div className="pt-4 space-y-3">
                  <Button variant="ghost" className="w-full justify-start text-slate-600" asChild>
                    <a href="/login">
                      <LogIn className="h-4 w-4 mr-2" />
                      Login
                    </a>
                  </Button>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700" asChild>
                    <a href="/signup">
                      <UserPlus className="h-4 w-4 mr-2" />
                      Sign Up
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
