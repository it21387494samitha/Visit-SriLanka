'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Compass, MapPin, Mail, Phone, Instagram, Facebook, Youtube } from 'lucide-react';

const footerLinks = {
  explore: [
    { label: 'Destinations', href: '/destinations' },
    { label: 'Categories', href: '/categories' },
    { label: 'Featured', href: '/destinations?featured=true' },
    { label: 'About Sri Lanka', href: '/about' },
  ],
  categories: [
    { label: 'Ancient Ruins', href: '/categories/ancient-ruins' },
    { label: 'Beaches', href: '/categories/beaches' },
    { label: 'Wildlife', href: '/categories/wildlife' },
    { label: 'Hill Country', href: '/categories/hill-country' },
    { label: 'Temples', href: '/categories/temples' },
  ],
};

export default function Footer() {
  return (
    <footer className="relative bg-black border-t border-white/5">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/20 to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center">
                <Compass className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">
                Visit
                <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
                  SriLanka
                </span>
              </span>
            </Link>
            <p className="text-white/40 text-sm leading-relaxed mb-6">
              Discover the pearl of the Indian Ocean. From ancient ruins to pristine beaches,
              Sri Lanka offers a world of wonder waiting to be explored.
            </p>
            <div className="flex gap-3">
              {[Instagram, Facebook, Youtube].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/40 hover:text-emerald-400 transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-white font-semibold mb-6 text-sm tracking-wider uppercase">
              Explore
            </h3>
            <ul className="space-y-3">
              {footerLinks.explore.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/40 hover:text-emerald-400 text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-semibold mb-6 text-sm tracking-wider uppercase">
              Categories
            </h3>
            <ul className="space-y-3">
              {footerLinks.categories.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/40 hover:text-emerald-400 text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-6 text-sm tracking-wider uppercase">
              Contact
            </h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-white/40 text-sm">
                <MapPin className="w-4 h-4 text-emerald-500 shrink-0" />
                Colombo, Sri Lanka
              </li>
              <li className="flex items-center gap-3 text-white/40 text-sm">
                <Mail className="w-4 h-4 text-emerald-500 shrink-0" />
                hello@visitsrilanka.com
              </li>
              <li className="flex items-center gap-3 text-white/40 text-sm">
                <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
                +94 11 234 5678
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs">
            &copy; {new Date().getFullYear()} VisitSriLanka. All rights reserved.
          </p>
          <p className="text-white/20 text-xs">
            Made with ❤️ for Sri Lanka Tourism
          </p>
        </div>
      </div>
    </footer>
  );
}
