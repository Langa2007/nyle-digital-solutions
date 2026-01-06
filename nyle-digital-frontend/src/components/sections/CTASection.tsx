// src/components/sections/CTASection.tsx
'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Mail, Phone } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Business?
          </h2>
          
          <p className="text-xl text-blue-100 mb-10 max-w-3xl mx-auto">
            Let's discuss your project and create a custom solution that drives results.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <button className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 hover:bg-blue-50 font-semibold rounded-lg transition-all duration-200 transform hover:scale-105">
              Start Free Consultation
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            
            <button className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white hover:bg-white/10 font-semibold rounded-lg transition-all duration-200">
              View Pricing Plans
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-4 text-white">
              <Mail className="h-6 w-6" />
              <div>
                <p className="text-sm text-blue-200">Email us at</p>
                <p className="font-semibold">contact@nyledigital.com</p>
              </div>
            </div>
            
            <div className="flex items-center justify-center gap-4 text-white">
              <Phone className="h-6 w-6" />
              <div>
                <p className="text-sm text-blue-200">Call us</p>
                <p className="font-semibold">+1 (555) 123-4567</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}