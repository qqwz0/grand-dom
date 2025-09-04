"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Linkedin,
  Twitter,
  Instagram,
  Building2,
  Sparkles,
  ArrowRight,
  Copy,
  Check,
  Users,
  TrendingUp,
  Target,
  Lightbulb,
  Shield,
  Eye,
  Heart,
  Zap,
} from "lucide-react"
import Image from "next/image"

export default function GrandDomVisitCard() {
  const [copiedEmail, setCopiedEmail] = useState(false)
  const [copiedPhone, setCopiedPhone] = useState(false)
  const router = useRouter()

  const copyToClipboard = async (text: string, type: "email" | "phone") => {
    try {
      await navigator.clipboard.writeText(text)
      if (type === "email") {
        setCopiedEmail(true)
        setTimeout(() => setCopiedEmail(false), 2000)
      } else {
        setCopiedPhone(true)
        setTimeout(() => setCopiedPhone(false), 2000)
      }
    } catch (err) {
      console.error("Failed to copy: ", err)
    }
  }

  const values = [
    {
      icon: Target,
      title: "Excellence",
      description: "We strive for perfection in every project, delivering results that exceed expectations.",
    },
    {
      icon: Shield,
      title: "Integrity",
      description: "Trust and transparency form the foundation of all our client relationships.",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "We embrace cutting-edge technologies and creative solutions to solve complex challenges.",
    },
    {
      icon: Users,
      title: "Collaboration",
      description: "Success comes through partnership, teamwork, and understanding our clients' unique needs.",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-emerald-100 to-teal-100">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-4xl">
          <Card className="relative overflow-hidden bg-white/70 backdrop-blur-lg border-green-200 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-teal-500/10" />
            <CardContent className="relative p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                {/* Left Side - Company Info */}
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12">
                        <Image src="/logo.png" alt="GrandDom Logo" fill className="object-contain" />
                      </div>
                      <Badge variant="secondary" className="bg-green-100 text-green-700 border-green-300">
                        New & Innovative
                      </Badge>
                    </div>

                    <div>
                      <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                        GrandDom
                      </h1>
                      <p className="text-xl text-gray-600 mt-2">Excellence in Every Domain</p>
                    </div>

                    <p className="text-gray-700 leading-relaxed">
                      A fresh approach to business transformation. We're here to revolutionize how companies grow and
                      succeed in the modern world.
                    </p>
                  </div>

                  {/* Services */}
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-green-500" />
                      Our Expertise
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "Consulting",
                        "Development",
                        "Strategy",
                        "Innovation",
                        "Digital Transformation",
                        "AI Solutions",
                      ].map((service) => (
                        <Badge
                          key={service}
                          variant="outline"
                          className="border-green-300 text-green-700 hover:bg-green-50 transition-colors"
                        >
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Side - Contact Info */}
                <div className="space-y-6">
                  <Card className="bg-green-50/80 border-green-200 backdrop-blur-sm">
                    <CardContent className="p-6 space-y-4">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Get In Touch</h3>

                      {/* Email */}
                      <div className="flex items-center justify-between group">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-green-100 rounded-lg">
                            <Mail className="h-4 w-4 text-green-600" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Email</p>
                            <p className="text-gray-800">contact@granddom.com</p>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="opacity-0 group-hover:opacity-100 transition-opacity text-green-400 hover:text-green-300"
                          onClick={() => copyToClipboard("contact@granddom.com", "email")}
                        >
                          {copiedEmail ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        </Button>
                      </div>

                      {/* Phone */}
                      <div className="flex items-center justify-between group">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-teal-100 rounded-lg">
                            <Phone className="h-4 w-4 text-teal-600" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Phone</p>
                            <p className="text-gray-800">+1 (555) 123-4567</p>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="opacity-0 group-hover:opacity-100 transition-opacity text-teal-400 hover:text-teal-300"
                          onClick={() => copyToClipboard("+1 (555) 123-4567", "phone")}
                        >
                          {copiedPhone ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        </Button>
                      </div>

                      {/* Location */}
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-emerald-100 rounded-lg">
                          <MapPin className="h-4 w-4 text-emerald-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Location</p>
                          <p className="text-gray-800">New York, NY</p>
                        </div>
                      </div>

                      {/* Website */}
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-lime-100 rounded-lg">
                          <Globe className="h-4 w-4 text-lime-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Website</p>
                          <p className="text-gray-800">www.granddom.com</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Social Links */}
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-gray-800">Connect With Us</h3>
                    <div className="flex gap-3">
                      {[
                        { icon: Linkedin, color: "hover:bg-blue-600", label: "LinkedIn" },
                        { icon: Twitter, color: "hover:bg-sky-500", label: "Twitter" },
                        { icon: Instagram, color: "hover:bg-pink-600", label: "Instagram" },
                      ].map(({ icon: Icon, color, label }) => (
                        <Button
                          key={label}
                          size="sm"
                          variant="outline"
                          className={`border-gray-300 text-gray-700 hover:text-white ${color} transition-colors`}
                        >
                          <Icon className="h-4 w-4" />
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Button
                    onClick={() => router.push("/contact")}
                    className="w-full bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-semibold py-3 transition-all duration-300 transform hover:scale-105"
                  >
                    Start Your Project
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Eye className="h-8 w-8 text-green-500" />
              <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Our Vision & Mission
              </h2>
            </div>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              As a new company, we're driven by ambitious goals and a clear vision for the future.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="bg-white/60 border-green-200 backdrop-blur-sm hover:bg-white/80 transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg">
                    <Eye className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">Our Vision</h3>
                </div>
                <p className="text-gray-700 leading-relaxed text-lg">
                  To become the leading catalyst for business transformation, empowering companies to thrive in an
                  ever-evolving digital landscape through innovative solutions and strategic excellence.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/60 border-green-200 backdrop-blur-sm hover:bg-white/80 transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-lg">
                    <Heart className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">Our Mission</h3>
                </div>
                <p className="text-gray-700 leading-relaxed text-lg">
                  To deliver exceptional consulting and development services that drive measurable results, foster
                  innovation, and create lasting partnerships with our clients on their journey to success.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Future Goals */}
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Zap,
                title: "Rapid Growth",
                description: "Establish ourselves as a trusted partner for 100+ businesses within our first two years.",
              },
              {
                icon: Globe,
                title: "Global Expansion",
                description: "Extend our services internationally and build a diverse, worldwide client portfolio.",
              },
              {
                icon: Lightbulb,
                title: "Innovation Leadership",
                description: "Pioneer new methodologies and technologies that set industry standards.",
              },
            ].map((goal) => (
              <Card
                key={goal.title}
                className="bg-white/60 border-green-200 backdrop-blur-sm hover:bg-white/80 transition-all duration-300 group text-center"
              >
                <CardContent className="p-6">
                  <div className="p-3 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg w-fit mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <goal.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">{goal.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{goal.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Sparkles className="h-8 w-8 text-green-500" />
              <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Our Services
              </h2>
            </div>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Comprehensive solutions tailored to transform your business and drive sustainable growth.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Building2,
                title: "Business Consulting",
                description: "Strategic guidance to optimize operations, improve efficiency, and accelerate growth.",
                features: ["Strategic Planning", "Process Optimization", "Market Analysis"],
              },
              {
                icon: Lightbulb,
                title: "Digital Innovation",
                description: "Cutting-edge technology solutions to modernize your business infrastructure.",
                features: ["AI Integration", "Cloud Solutions", "Digital Transformation"],
              },
              {
                icon: Users,
                title: "Team Development",
                description: "Empower your workforce with training and development programs.",
                features: ["Leadership Training", "Skill Development", "Team Building"],
              },
              {
                icon: TrendingUp,
                title: "Growth Strategy",
                description: "Data-driven strategies to scale your business and enter new markets.",
                features: ["Market Expansion", "Revenue Growth", "Performance Analytics"],
              },
              {
                icon: Shield,
                title: "Risk Management",
                description: "Comprehensive risk assessment and mitigation strategies for your business.",
                features: ["Security Audits", "Compliance", "Risk Assessment"],
              },
              {
                icon: Target,
                title: "Project Management",
                description: "End-to-end project delivery with proven methodologies and best practices.",
                features: ["Agile Methodology", "Quality Assurance", "Timeline Management"],
              },
            ].map((service, index) => (
              <Card
                key={service.title}
                className="bg-white/60 border-green-200 backdrop-blur-sm hover:bg-white/80 transition-all duration-300 group"
              >
                <CardContent className="p-6">
                  <div className="p-3 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg w-fit mb-4 group-hover:scale-110 transition-transform">
                    <service.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do and define who we are as a company.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card
                key={value.title}
                className="bg-white/60 border-green-200 backdrop-blur-sm hover:bg-white/80 transition-all duration-300 group"
              >
                <CardContent className="p-6 text-center">
                  <div className="p-3 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg w-fit mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <value.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">{value.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-white/60 border-green-200 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent mb-2">
                    2024
                  </div>
                  <p className="text-gray-600 text-sm">Founded</p>
                </div>
                <div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent mb-2">
                    100%
                  </div>
                  <p className="text-gray-600 text-sm">Client Satisfaction</p>
                </div>
                <div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent mb-2">
                    24/7
                  </div>
                  <p className="text-gray-600 text-sm">Support Available</p>
                </div>
                <div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent mb-2">
                    ∞
                  </div>
                  <p className="text-gray-600 text-sm">Possibilities</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-green-200">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="relative w-8 h-8">
              <Image src="/logo.png" alt="GrandDom Logo" fill className="object-contain" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              GrandDom
            </span>
          </div>
          <p className="text-gray-600">© 2024 GrandDom. Ready to make a difference.</p>
          <p className="text-gray-500 text-sm">Transforming businesses through innovation, starting today.</p>
        </div>
      </footer>
    </div>
  )
}
