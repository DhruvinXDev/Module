"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft, Eye, EyeOff, LogIn, Mail, Lock, Github, Chrome } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { GradientBackground } from "./gradient-background"
import { AnimatedDots } from "./animated-dots"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

export function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const form = e.target as HTMLFormElement;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;
    try {
      const res = await fetch("http://localhost:5001/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");
      // Store token and user info
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      toast({
        title: `Welcome, ${data.user.full_name}!`,
        description: "You have successfully logged in."
      });
      router.push("/");
    } catch (err: any) {
      toast({
        title: "Login failed",
        description: err.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-background dark:bg-slate-900">
      <GradientBackground />
      <AnimatedDots />

      {/* Back to Home Button */}
      <div className="absolute top-6 left-6 z-20">
        <Button
          variant="ghost"
          size="sm"
          className="text-muted-foreground hover:text-foreground hover:bg-background/80 backdrop-blur-sm transition-all duration-300"
          asChild
        >
          <a href="/" className="flex items-center space-x-2">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </a>
        </Button>
      </div>

      <div className="relative z-10 flex min-h-screen items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8 animate-in fade-in-0 slide-in-from-top-4 duration-1000">
            <div className="flex items-center justify-center mb-6">
              <div className="relative">
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-2xl">
                  <span className="text-white font-bold text-2xl">N</span>
                </div>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 animate-pulse opacity-20"></div>
              </div>
            </div>
            <a
              href="/"
              className="text-3xl font-bold text-foreground dark:text-slate-100 hover:text-blue-600 transition-colors duration-300"
            >
              NexaUI
            </a>
            <p className="text-muted-foreground dark:text-slate-400 mt-2">Welcome back! Please sign in to your account.</p>
          </div>

          {/* Login Form */}
          <div className="bg-background/80 dark:bg-slate-800 backdrop-blur-xl rounded-2xl shadow-2xl border border-border dark:border-slate-700 p-8 animate-in fade-in-0 slide-in-from-bottom-8 duration-1000 delay-300">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="email" className="text-slate-700 dark:text-slate-100 font-medium">
                    Email Address
                  </Label>
                  <div className="relative mt-2">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400 dark:text-slate-500" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      className="pl-10 bg-background dark:bg-slate-800 border-border dark:border-slate-700 text-foreground dark:text-slate-100 placeholder:text-muted-foreground dark:placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="password" className="text-slate-700 dark:text-slate-100 font-medium">
                    Password
                  </Label>
                  <div className="relative mt-2">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400 dark:text-slate-500" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="pl-10 pr-10 bg-background dark:bg-slate-800 border-border dark:border-slate-700 text-foreground dark:text-slate-100 placeholder:text-muted-foreground dark:placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground dark:text-slate-400 hover:text-muted-foreground transition-colors duration-200"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-border text-blue-600 focus:ring-blue-500 focus:ring-2"
                  />
                  <span className="ml-2 text-sm text-muted-foreground dark:text-slate-400">Remember me</span>
                </label>
                <a
                  href="#"
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
                >
                  Forgot password?
                </a>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Signing in...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <LogIn className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                    <span>Sign In</span>
                  </div>
                )}
              </Button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-background dark:bg-slate-800 text-muted-foreground dark:text-slate-400">Or continue with</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  className="bg-background border-border text-foreground dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100 hover:bg-muted hover:border-muted transition-all duration-200 animate-in fade-in-0 slide-in-from-left-4 duration-1000 delay-500"
                >
                  <Github className="h-4 w-4 mr-2" />
                  GitHub
                </Button>
                <Button
                  variant="outline"
                  className="bg-background border-border text-foreground dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100 hover:bg-muted hover:border-muted transition-all duration-200 animate-in fade-in-0 slide-in-from-right-4 duration-1000 delay-500"
                >
                  <Chrome className="h-4 w-4 mr-2" />
                  Google
                </Button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-8 animate-in fade-in-0 slide-in-from-bottom-4 duration-1000 delay-700">
            <p className="text-muted-foreground dark:text-slate-400">
              Don't have an account?{" "}
              <a
                href="/signup"
                className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
              >
                Sign up here
              </a>
            </p>
            <p className="text-xs text-muted-foreground dark:text-slate-400 mt-4">
              By signing in, you agree to our{" "}
              <a href="#" className="text-blue-600 hover:text-blue-700 transition-colors duration-200">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-blue-600 hover:text-blue-700 transition-colors duration-200">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
