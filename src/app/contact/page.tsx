import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import { site } from "@/lib/site";

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

const contactCards = [
  {
    icon: MapPin,
    label: "Visit Us",
    value: site.contact.address,
    sub: "Come see us in store",
    href: null,
    iconBg: "bg-indigo-100",
    iconColor: "text-indigo-600",
    accentBar: "bg-indigo-500",
  },
  {
    icon: Phone,
    label: "Call Us",
    value: site.contact.phone,
    sub: site.contact.hours,
    href: site.contact.phoneHref,
    iconBg: "bg-violet-100",
    iconColor: "text-violet-600",
    accentBar: "bg-violet-500",
  },
  {
    icon: Mail,
    label: "Email Us",
    value: site.contact.email,
    sub: "We reply within 24 hours",
    href: site.contact.emailHref,
    iconBg: "bg-sky-100",
    iconColor: "text-sky-600",
    accentBar: "bg-sky-500",
  },
  {
    icon: WhatsAppIcon,
    label: "WhatsApp",
    value: "Chat with us instantly",
    sub: "Fastest way to reach us",
    href: site.contact.whatsappHref,
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
    accentBar: "bg-green-500",
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-[70vh]">
      {/* Hero */}
      <div className="relative bg-gradient-to-br from-indigo-900 via-indigo-800 to-violet-900 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-violet-300 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-indigo-200 text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-6 backdrop-blur-sm">
            <MessageCircle className="w-3.5 h-3.5" /> We&apos;re here to help
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 leading-tight">
            Get in Touch
          </h1>
          <p className="text-indigo-200 text-lg max-w-xl mx-auto leading-relaxed">
            Have a question about a product or want to know if something&apos;s in stock? Reach out — we&apos;re happy to help.
          </p>
        </div>
      </div>

      {/* Cards */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {contactCards.map(({ icon: Icon, label, value, sub, href, iconBg, iconColor, accentBar }) => {
            const inner = (
              <>
                <div className={`w-12 h-12 rounded-2xl ${iconBg} flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`w-6 h-6 ${iconColor}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{label}</p>
                  <p className="font-bold text-slate-900 text-base truncate">{value}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{sub}</p>
                </div>
                <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl ${accentBar}`} />
              </>
            );

            return href ? (
              <a key={label} href={href}
                target={href.startsWith("https") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="relative flex items-center gap-4 bg-white rounded-2xl border border-slate-100 shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 p-5 overflow-hidden group">
                {inner}
              </a>
            ) : (
              <div key={label}
                className="relative flex items-center gap-4 bg-white rounded-2xl border border-slate-100 shadow-md p-5 overflow-hidden">
                {inner}
              </div>
            );
          })}
        </div>

        {/* Hours strip */}
        <div className="mt-6 bg-gradient-to-r from-indigo-50 to-violet-50 border border-indigo-100 rounded-2xl p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white border border-indigo-100 shadow-sm flex items-center justify-center flex-shrink-0">
            <Clock className="w-6 h-6 text-indigo-600" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Business Hours</p>
            <p className="font-bold text-slate-900">{site.contact.hours}</p>
            <p className="text-xs text-slate-400 mt-0.5">{site.contact.hoursSub}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
