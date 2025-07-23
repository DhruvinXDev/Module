"use client"

import { HexagonBackground } from "@/components/animate-ui/backgrounds/hexagon"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Users, Target, Award, Rocket, Heart, Globe } from "lucide-react"

const teamMembers = [
  {
    name: "Alex Chen",
    role: "Founder & CEO",
    avatar: "👨‍💻",
    bio: "Former Google engineer with 10+ years in UI/UX development.",
  },
  {
    name: "Sarah Kim",
    role: "Head of Design",
    avatar: "👩‍🎨",
    bio: "Award-winning designer who previously worked at Apple and Figma.",
  },
  {
    name: "Marcus Johnson",
    role: "Lead Developer",
    avatar: "👨‍💼",
    bio: "Full-stack expert specializing in React and modern web technologies.",
  },
  {
    name: "Emily Rodriguez",
    role: "Product Manager",
    avatar: "👩‍💻",
    bio: "Product strategist with experience at Microsoft and Stripe.",
  },
]

const values = [
  {
    icon: Users,
    title: "Community First",
    description: "We believe in building tools that bring developers together and foster collaboration.",
  },
  {
    icon: Target,
    title: "Quality Focus",
    description: "Every component is crafted with attention to detail, performance, and accessibility.",
  },
  {
    icon: Award,
    title: "Innovation",
    description: "We push the boundaries of what's possible in web development and design.",
  },
  {
    icon: Globe,
    title: "Global Impact",
    description: "Our tools are used by developers worldwide to build amazing experiences.",
  },
]

export function AboutPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <HexagonBackground className="fixed inset-0 opacity-20" />
      <div className="relative z-10">
        <Navigation />

        {/* Hero Section */}
        <section className="py-20 px-6">
          <div className="container mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-cyan-500/10 text-cyan-400 text-sm font-medium mb-6 animate-in fade-in-0 slide-in-from-top-4 duration-1000">
              <Heart className="h-4 w-4 mr-2 animate-pulse" />
              Our Story
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-in fade-in-0 slide-in-from-bottom-8 duration-1000 delay-300">
              Building the{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Future</span>{" "}
              Together
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto animate-in fade-in-0 slide-in-from-bottom-4 duration-1000 delay-500">
              NexaUI was born from a simple idea: make beautiful, accessible web development available to everyone.
              We're a team of passionate developers and designers committed to pushing the boundaries of what's
              possible.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20 px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="animate-in fade-in-0 slide-in-from-left-8 duration-1000">
                <h2 className="text-4xl font-bold text-white mb-6">Our Mission</h2>
                <p className="text-lg text-slate-300 mb-6">
                  We believe that great design should be accessible to everyone. Our mission is to democratize beautiful
                  web development by providing world-class UI components that are easy to use, highly customizable, and
                  built with modern best practices.
                </p>
                <p className="text-lg text-slate-300">
                  Every line of code we write is guided by our commitment to performance, accessibility, and developer
                  experience. We're not just building components – we're building the foundation for the next generation
                  of web applications.
                </p>
              </div>
              <div className="relative animate-in fade-in-0 slide-in-from-right-8 duration-1000 delay-300">
                <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-8">
                  <Rocket className="h-16 w-16 text-cyan-400 mb-6 animate-bounce-slow" />
                  <h3 className="text-2xl font-bold text-white mb-4">50,000+</h3>
                  <p className="text-slate-300">Developers trust NexaUI for their projects worldwide</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4 animate-in fade-in-0 slide-in-from-bottom-4 duration-1000">
                Our Values
              </h2>
              <p className="text-xl text-slate-300 animate-in fade-in-0 slide-in-from-bottom-4 duration-1000 delay-200">
                The principles that guide everything we do
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <div
                  key={value.title}
                  className="group p-6 rounded-2xl bg-slate-800/30 backdrop-blur-sm hover:scale-105 transition-all duration-500 animate-in fade-in-0 slide-in-from-bottom-4 duration-1000"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <value.icon className="h-12 w-12 text-cyan-400 mb-4 group-hover:animate-bounce" />
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors duration-300">
                    {value.title}
                  </h3>
                  <p className="text-slate-300 group-hover:text-slate-200 transition-colors duration-300">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4 animate-in fade-in-0 slide-in-from-bottom-4 duration-1000">
                Meet Our Team
              </h2>
              <p className="text-xl text-slate-300 animate-in fade-in-0 slide-in-from-bottom-4 duration-1000 delay-200">
                The passionate people behind NexaUI
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <div
                  key={member.name}
                  className="group text-center p-6 rounded-2xl bg-slate-800/30 backdrop-blur-sm hover:scale-105 transition-all duration-500 animate-in fade-in-0 slide-in-from-bottom-4 duration-1000"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="text-6xl mb-4 animate-bounce-slow">{member.avatar}</div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors duration-300">
                    {member.name}
                  </h3>
                  <p className="text-cyan-400 font-medium mb-3">{member.role}</p>
                  <p className="text-slate-300 text-sm group-hover:text-slate-200 transition-colors duration-300">
                    {member.bio}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6">
          <div className="container mx-auto max-w-4xl text-center">
            <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-12 animate-in fade-in-0 slide-in-from-bottom-8 duration-1000">
              <h2 className="text-4xl font-bold text-white mb-6">Ready to Build Something Amazing?</h2>
              <p className="text-xl text-slate-300 mb-8">
                Join thousands of developers who are already building the future with NexaUI.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/signup"
                  className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-medium rounded-xl shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 hover:scale-105"
                >
                  Get Started Free
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center px-8 py-3 text-slate-300 hover:text-white hover:bg-white/10 font-medium rounded-xl transition-all duration-300 hover:scale-105"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  )
}
