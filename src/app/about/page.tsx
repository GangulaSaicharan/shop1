import { ShoppingBag, Heart, Shield, Zap, Users, Star, ArrowRight } from "lucide-react";
import Link from "next/link";
import { site } from "@/lib/site";

const stats = [
  { value: "500+", label: "Products", color: "text-indigo-600" },
  { value: "1K+", label: "Customers", color: "text-violet-600" },
  { value: "50+", label: "Brands", color: "text-pink-500" },
  { value: "5★", label: "Rating", color: "text-amber-500" },
];

const values = [
  {
    icon: Heart,
    title: "Passion for Quality",
    description: "Every product is hand-picked to meet our strict standards. If it's on our shelves, we stand behind it.",
    iconBg: "bg-pink-50",
    iconColor: "text-pink-500",
  },
  {
    icon: Shield,
    title: "Honest & Transparent",
    description: "Fair pricing, no hidden fees. We build long-term relationships, not one-time transactions.",
    iconBg: "bg-indigo-50",
    iconColor: "text-indigo-600",
  },
  {
    icon: Zap,
    title: "Always Up to Date",
    description: "Stock is updated in real time so you know exactly what's available before you visit us.",
    iconBg: "bg-amber-50",
    iconColor: "text-amber-500",
  },
];

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <div className="relative bg-gradient-to-br from-slate-900 via-indigo-950 to-violet-950 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute -top-20 -left-20 w-96 h-96 bg-indigo-500 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-violet-500 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-sm mb-6">
            <ShoppingBag className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-5 leading-tight">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-violet-300">{site.name}</span>
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto leading-relaxed">
            We are a passionate team dedicated to bringing you the best products at fair prices — serving our community with integrity and care since day one.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 mb-16">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {stats.map(({ value, label, color }) => (
            <div key={label} className="bg-white rounded-2xl border border-slate-100 shadow-lg p-6 text-center">
              <p className={`text-4xl font-extrabold ${color} mb-1`}>{value}</p>
              <p className="text-sm text-slate-500 font-medium">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Story */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-3">Our Story</p>
            <h2 className="text-3xl font-extrabold text-slate-900 mb-6 leading-tight">
              Started with a simple idea, built with purpose
            </h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              {site.name} was born out of a simple idea: give customers access to great products without the hassle.
              We started small, with a passion for quality and a commitment to honest service.
            </p>
            <p className="text-slate-600 leading-relaxed mb-8">
              Today, we carry products across multiple categories — carefully chosen, fairly priced, and always in stock.
              Every item on our shelves is selected with care, and every customer interaction matters to us.
            </p>
            <Link href="/contact"
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl transition group shadow-lg shadow-indigo-200">
              Get in Touch
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {/* Decorative card */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 to-violet-100 rounded-3xl rotate-3" />
            <div className="relative bg-white rounded-3xl border border-slate-100 shadow-xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-sm">{site.name}</p>
                  <p className="text-xs text-slate-400">Quality you can trust</p>
                </div>
              </div>
              <div className="space-y-3">
                {[
                  "Hand-picked products only",
                  "Real-time stock updates",
                  "Honest, transparent pricing",
                  "Friendly in-store experience",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-indigo-50 flex items-center justify-center flex-shrink-0">
                      <Star className="w-2.5 h-2.5 text-indigo-600 fill-indigo-600" />
                    </div>
                    <span className="text-sm text-slate-600">{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-5 border-t border-slate-50">
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                  <span className="text-xs text-slate-500 ml-1">Loved by 1000+ customers</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="bg-slate-50 border-y border-slate-100 py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-3">Our Values</p>
            <h2 className="text-3xl font-extrabold text-slate-900">What We Stand For</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {values.map(({ icon: Icon, title, description, iconBg, iconColor }) => (
              <div key={title} className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg transition-shadow p-7 text-center">
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl ${iconBg} mb-5`}>
                  <Icon className={`w-7 h-7 ${iconColor}`} />
                </div>
                <h3 className="font-bold text-slate-900 text-lg mb-3">{title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="relative bg-gradient-to-br from-indigo-600 to-violet-600 rounded-3xl p-10 text-center overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-white rounded-full blur-3xl" />
          </div>
          <div className="relative">
            <Users className="w-10 h-10 text-white/60 mx-auto mb-4" />
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">Come Visit Us Today</h2>
            <p className="text-indigo-200 mb-7 max-w-md mx-auto">
              We&apos;re open Mon–Sat, 9 AM to 7 PM. Drop by or reach out — we&apos;d love to help you find exactly what you need.
            </p>
            <Link href="/contact"
              className="inline-flex items-center gap-2 bg-white text-indigo-700 font-bold px-7 py-3.5 rounded-xl hover:bg-indigo-50 transition shadow-xl group">
              Contact Us
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
