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
    phone: "+1 (555) 000-0000",
    phoneHref: "tel:+15550000000",
    email: "contact@shopname.com",
    emailHref: "mailto:contact@shopname.com",
    whatsappHref: "https://wa.me/15550000000",
    hours: "Mon – Sat · 9:00 AM – 8:00 PM",
    hoursSub: "Closed on Sundays & public holidays",
  },

  social: {
    whatsapp: "https://wa.me/15550000000",
    instagram: "https://instagram.com/shopname",
    facebook: "https://facebook.com/shopname",
    twitter: "https://twitter.com/shopname",
    youtube: "https://youtube.com/@shopname",
  },
};
