// src/components/layout/Footer.tsx
import Link from 'next/link';
import { Facebook, Twitter, Linkedin, Github, Mail, Phone, MapPin } from 'lucide-react';

const footerLinks = {
  Services: [
    { name: 'Custom Software', href: '/services/custom-software' },
    { name: 'Web Applications', href: '/services/web-apps' },
    { name: 'Mobile Apps', href: '/services/mobile-apps' },
    { name: 'Cloud & Infrastructure', href: '/services/cloud' },
    { name: 'Digital Transformation', href: '/services/digital-transformation' },
  ],
  Company: [
    { name: 'About Us', href: '/about' },
    { name: 'Our Team', href: '/about/team' },
    { name: 'Careers', href: '/careers' },
    { name: 'Blog', href: '/blog' },
    { name: 'Press', href: '/press' },
  ],
  Resources: [
    { name: 'Documentation', href: '/docs' },
    { name: 'Case Studies', href: '/portfolio' },
    { name: 'API Reference', href: '/api-docs' },
    { name: 'Support Center', href: '/support' },
    { name: 'Status', href: '/status' },
  ],
  Legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
    { name: 'Security', href: '/security' },
    { name: 'GDPR', href: '/gdpr' },
  ],
};

const socialLinks = [
  { icon: Facebook, href: 'https://facebook.com/nyledigital', label: 'Facebook' },
  { icon: Twitter, href: 'https://twitter.com/nyledigital', label: 'Twitter' },
  { icon: Linkedin, href: 'https://linkedin.com/company/nyledigital', label: 'LinkedIn' },
  { icon: Github, href: 'https://github.com/nyledigital', label: 'GitHub' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">N</span>
              </div>
              <div>
                <span className="text-xl font-bold text-white">Nyle</span>
                <span className="text-xl font-bold text-blue-400">Digital</span>
              </div>
            </Link>
            
            <p className="mb-6 max-w-md">
              Transforming businesses with cutting-edge software solutions, cloud infrastructure, and digital innovation since 2015.
            </p>
            
            <div className="space-y-3 mb-8">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-400" />
                <span>contact@nyledigital.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-blue-400" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-blue-400" />
                <span>123 Tech Street, San Francisco, CA 94107</span>
              </div>
            </div>
            
            {/* Newsletter */}
            <div className="mb-8">
              <h4 className="text-white font-semibold mb-3">Subscribe to our newsletter</h4>
              <form className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-grow px-4 py-2 bg-gray-800 border border-gray-700 rounded-l-lg focus:outline-none focus:border-blue-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-r-lg transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-white font-semibold mb-4">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="hover:text-blue-400 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social Links & Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p>&copy; {currentYear} Nyle Digital Solutions. All rights reserved.</p>
            </div>
            
            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}