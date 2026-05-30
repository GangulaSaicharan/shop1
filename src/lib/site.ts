export const site = {
  name: "Padmalaya Electronics",
  tagline: "Quality Products",
  description: "Browse our collection of quality products",
  footerTagline: "Your trusted destination for quality products at the best prices. Shop with confidence.",
  freeDeliveryThreshold: "₹999",
  get announcement() {
    return `🎉 Free delivery on orders over ${this.freeDeliveryThreshold} · Shop the latest collection now`;
  },

  contact: {
    address: "Main Road, Metpally",
    phone: "+91 85558 06943",
    phoneHref: "tel:+918555806943",
    email: "padmalayaelectronics9@gmail.com",
    emailHref: "mailto:padmalayaelectronics9@gmail.com",
    whatsappHref: "https://wa.me/918555806943",
    hours: "Mon – Sat · 9:00 AM – 8:00 PM",
    hoursSub: "Closed on Sundays & public holidays",
  },

  social: {
    whatsapp: "https://wa.me/918555806943",
    instagram: "https://instagram.com/padmalaya_electronics",
    facebook: "https://facebook.com/padmalaya_electronics",
    twitter: "https://twitter.com/padmalaya_electronics",
    youtube: "https://youtube.com/@padmalaya_electronics",
  },
};
