"use client"

import * as React from "react"
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Github, Chrome, Apple, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { HexagonBackground } from "@/components/animate-ui/backgrounds/hexagon"

export function SignupPage() {
  const [showPassword, setShowPassword] = React.useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false)
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [agreeToTerms, setAgreeToTerms] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsLoading(false)
  }

  const socialLogins = [
    {
      name: "Google",
      icon: Chrome,
      color: "hover:bg-red-500/10 hover:text-red-400",
    },
    {
      name: "GitHub",
      icon: Github,
      color: "hover:bg-gray-500/10 hover:text-gray-300",
    },
    {
      name: "Apple",
      icon: Apple,
      color: "hover:bg-gray-500/10 hover:text-gray-300",
    },
  ]

  const passwordStrength = React.useMemo(() => {
    const password = formData.password
    let strength = 0
    if (password.length >= 8) strength++
    if (/[A-Z]/.test(password)) strength++
    if (/[0-9]/.test(password)) strength++
    if (/[^A-Za-z0-9]/.test(password)) strength++
    return strength
  }, [formData.password])

  const getStrengthColor = (strength: number) => {
    if (strength <= 1) return "bg-red-500"
    if (strength <= 2) return "bg-yellow-500"
    if (strength <= 3) return "bg-blue-500"
    return "bg-green-500"
  }

  const getStrengthText = (strength: number) => {
    if (strength <= 1) return "Weak"
    if (strength <= 2) return "Fair"
    if (strength <= 3) return "Good"
    return "Strong"
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <HexagonBackground className="fixed inset-0 opacity-20" />

      {/* Floating elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 right-10 w-4 h-4 bg-cyan-400/30 rounded-full animate-float animation-delay-0" />
        <div className="absolute top-40 left-20 w-6 h-6 bg-purple-500/30 rotate-45 animate-float animation-delay-1000" />
        <div className="absolute bottom-40 right-20 w-3 h-3 bg-blue-500/30 rounded-full animate-float animation-delay-2000" />
        <div className="absolute bottom-60 left-40 w-5 h-5 bg-pink-500/30 rotate-12 animate-float animation-delay-1500" />
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4 py-12">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8 animate-in fade-in-0 slide-in-from-top-4 duration-1000">
            <div className="inline-flex items-center space-x-3 mb-4">
              <div className="relative">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl">N</span>
                </div>
                <div className="absolute inset-0 h-12 w-12 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 animate-ping opacity-20" />
              </div>
              <span className="text-2xl font-bold text-white">NexaUI</span>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
            <p className="text-slate-400">Join thousands of developers building the future</p>
          </div>

          {/* Signup Form */}
          <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-8 shadow-2xl animate-in fade-in-0 slide-in-from-bottom-8 duration-1000 delay-300">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-slate-200 font-medium">
                  Full Name
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="pl-10 bg-slate-700/50 text-white placeholder:text-slate-400 focus:ring-2 focus:ring-cyan-400 transition-all duration-300 h-12"
                    required
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-200 font-medium">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="pl-10 bg-slate-700/50 text-white placeholder:text-slate-400 focus:ring-2 focus:ring-cyan-400 transition-all duration-300 h-12"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-200 font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    className="pl-10 pr-10 bg-slate-700/50 text-white placeholder:text-slate-400 focus:ring-2 focus:ring-cyan-400 transition-all duration-300 h-12"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors duration-200"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {/* Password Strength Indicator */}
                {formData.password && (
                  <div className="space-y-2">
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4].map((level) => (
                        <div
                          key={level}
                          className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                            level <= passwordStrength ? getStrengthColor(passwordStrength) : "bg-slate-600"
                          }`}
                        />
                      ))}
                    </div>
                    <p className={`text-xs ${passwordStrength >= 3 ? "text-green-400" : "text-slate-400"}`}>
                      Password strength: {getStrengthText(passwordStrength)}
                    </p>
                  </div>
                )}
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-slate-200 font-medium">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                    className="pl-10 pr-10 bg-slate-700/50 text-white placeholder:text-slate-400 focus:ring-2 focus:ring-cyan-400 transition-all duration-300 h-12"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors duration-200"
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                  <p className="text-xs text-red-400">Passwords do not match</p>
                )}
                {formData.confirmPassword && formData.password === formData.confirmPassword && (
                  <p className="text-xs text-green-400 flex items-center space-x-1">
                    <Check className="h-3 w-3" />
                    <span>Passwords match</span>
                  </p>
                )}
              </div>

              {/* Terms Agreement */}
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="terms"
                  checked={agreeToTerms}
                  onCheckedChange={setAgreeToTerms}
                  className="data-[state=checked]:bg-cyan-500 data-[state=checked]:border-cyan-500 mt-1"
                />
                <Label htmlFor="terms" className="text-slate-300 text-sm cursor-pointer leading-relaxed">
                  I agree to the{" "}
                  <a href="#terms" className="text-cyan-400 hover:text-cyan-300 underline">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#privacy" className="text-cyan-400 hover:text-cyan-300 underline">
                    Privacy Policy
                  </a>
                </Label>
              </div>

              {/* Sign Up Button */}
              <Button
                type="submit"
                disabled={isLoading || !agreeToTerms || formData.password !== formData.confirmPassword}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-medium h-12 rounded-xl shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Creating account...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <span>Create Account</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                )}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full h-px bg-slate-600" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-slate-800/50 text-slate-400">Or sign up with</span>
              </div>
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-3 gap-3">
              {socialLogins.map((social, index) => (
                <Button
                  key={social.name}
                  variant="outline"
                  className={`bg-slate-700/30 text-slate-300 hover:scale-105 transition-all duration-300 h-12 ${social.color} animate-in fade-in-0 slide-in-from-bottom-4 duration-1000`}
                  style={{ animationDelay: `${(index + 1) * 200}ms` }}
                >
                  <social.icon className="h-5 w-5" />
                </Button>
              ))}
            </div>

            {/* Sign In Link */}
            <div className="text-center mt-8 animate-in fade-in-0 slide-in-from-bottom-4 duration-1000 delay-700">
              <p className="text-slate-400">
                Already have an account?{" "}
                <a
                  href="#login"
                  className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors duration-200 hover:underline"
                >
                  Sign in here
                </a>
              </p>
            </div>
          </div>

          {/* Security Notice */}
          <div className="text-center mt-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-1000 delay-1000">
            <p className="text-xs text-slate-500">🔒 Your data is protected with enterprise-grade security</p>
          </div>
        </div>
      </div>
    </div>
  )
}
