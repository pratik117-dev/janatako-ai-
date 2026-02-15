"use client";

import Link from "next/link";
import { Mail, Twitter, Facebook, Instagram, Youtube, MapPin, Phone, Globe } from "lucide-react";

/**
 * Footer Component - Purple Theme
 * Uses dynamic CSS classes from globals-purple-theme.css
 * Fully responsive and themed
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    platform: [
      { label: "गृह पृष्ठ", href: "/" },
      { label: "परिचय", href: "/about" },
      { label: "भिजन", href: "/vision" },
      { label: "विश्लेषण", href: "/blogs" },
    ],
    resources: [
      { label: "नीति कागजात", href: "/policies" },
      { label: "प्रगति रिपोर्ट", href: "/reports" },
      { label: "मिडिया", href: "/media" },
      { label: "सामान्य प्रश्नहरू", href: "/faq" },
    ],
    legal: [
      { label: "गोपनीयता नीति", href: "/privacy" },
      { label: "सेवा सर्तहरू", href: "/terms" },
      { label: "कुकी नीति", href: "/cookies" },
      { label: "अस्वीकरण", href: "/disclaimer" },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
    { icon: Youtube, href: "https://youtube.com", label: "YouTube" },
  ];

  return (
    <footer className="bg-white w-full border-t border-gray-200">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Logo - Using text-primary-color class */}
            <Link href="/" className="inline-block">
              <h3 className="text-2xl font-bold text-gray-900">
                जनताको <span className="text-primary-color">AI</span>
              </h3>
              <p className="text-sm text-gray-600 mt-1">नेपालको लागि स्मार्ट शासन</p>
            </Link>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed max-w-sm">
              नयाँ नेपालको लागि पारदर्शी, जवाफदेही र डाटा-संचालित शासन। 
              प्रत्येक नागरिकका लागि समान अवसर र न्याय।
            </p>

            {/* Contact Info - Using text-primary-color for icons */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-600">
                <MapPin size={18} className="text-primary-color flex-shrink-0" />
                <span className="text-sm">काठमाडौं, नेपाल</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <Phone size={18} className="text-primary-color flex-shrink-0" />
                <span className="text-sm">+977 01-1234567</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <Mail size={18} className="text-primary-color flex-shrink-0" />
                <span className="text-sm">info@janatakoai.np</span>
              </div>
            </div>

            {/* Social Links - Using hover-bg-primary-color */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center 
                           text-gray-600 hover-bg-primary-color hover:text-white transition-all duration-300 
                           hover:scale-110"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="font-bold text-gray-900 mb-4">प्लेटफर्म</h4>
            <ul className="space-y-3">
              {footerLinks.platform.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover-primary-color transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="font-bold text-gray-900 mb-4">स्रोतहरू</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover-primary-color transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-bold text-gray-900 mb-4">कानूनी</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover-primary-color transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Section - Using input-civic class */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="max-w-2xl">
            <h4 className="font-bold text-gray-900 mb-2">न्यूजलेटर सदस्यता लिनुहोस्</h4>
            <p className="text-sm text-gray-600 mb-4">
              नवीनतम अपडेट, नीति विश्लेषण र समुदाय समाचार प्राप्त गर्नुहोस्
            </p>
            <form className="flex gap-3 max-w-md">
              <input
                type="email"
                placeholder="तपाईंको इमेल"
                className="input-civic flex-1"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-primary-color text-white font-semibold rounded-lg 
                         hover:bg-[#4A148C] transition-all duration-300 hover:scale-105 
                         active:scale-95 whitespace-nowrap"
              >
                सदस्यता लिनुहोस्
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <p className="text-sm text-gray-600 text-center md:text-left">
              © {currentYear} जनताको AI. सर्वाधिकार सुरक्षित।
            </p>

            {/* Language & Quick Links */}
            <div className="flex items-center gap-6">
              <button className="flex items-center gap-2 text-sm text-gray-600 hover-primary-color transition-colors">
                <Globe size={16} />
                <span>नेपाली</span>
              </button>
              <Link href="/sitemap" className="text-sm text-gray-600 hover-primary-color transition-colors">
                साइट म्याप
              </Link>
              <Link href="/accessibility" className="text-sm text-gray-600 hover-primary-color transition-colors">
                पहुँचयोग्यता
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Bottom Border - Purple Gradient */}
      <div className="h-1 bg-gradient-to-r from-[#800080] via-[#4A148C] to-[#800080]"></div>
    </footer>
  );
};

export default Footer;