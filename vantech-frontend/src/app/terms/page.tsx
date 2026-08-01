import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | Vantech Software Solutions',
  description: 'Terms of Service for Vantech Software Solutions.',
  alternates: {
    canonical: '/terms',
  },
};

export default function TermsPage() {
  return (
    <div className="pt-32 pb-24 min-h-screen section-atmosphere">
      <div className="section-shell relative z-10 max-w-4xl mx-auto">
        <h1 className="text-4xl font-semibold text-slate-950 dark:text-white sm:text-5xl mb-8">
          Terms of Service
        </h1>
        
        <div className="prose prose-lg prose-slate dark:prose-invert max-w-none text-slate-700 dark:text-slate-300">
          <p>Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          
          <h2>1. Agreement to Terms</h2>
          <p>
            By accessing or using our website and services, you agree to be bound by these Terms of Service. 
            If you disagree with any part of the terms, you may not access the service.
          </p>

          <h2>2. Intellectual Property</h2>
          <p>
            The Service and its original content, features, and functionality are and will remain the exclusive 
            property of Vantech Software Solutions and its licensors. The Service is protected by copyright, trademark, 
            and other laws of both the local and foreign countries. Our trademarks and trade dress may not be used in 
            connection with any product or service without the prior written consent of Vantech Software Solutions.
          </p>

          <h2>3. Links To Other Web Sites</h2>
          <p>
            Our Service may contain links to third-party web sites or services that are not owned or controlled 
            by Vantech Software Solutions.
          </p>
          <p>
            Vantech Software Solutions has no control over, and assumes no responsibility for, the content, 
            privacy policies, or practices of any third party web sites or services. You further acknowledge and 
            agree that Vantech Software Solutions shall not be responsible or liable, directly or indirectly, for any 
            damage or loss caused or alleged to be caused by or in connection with use of or reliance on any such 
            content, goods or services available on or through any such web sites or services.
          </p>

          <h2>4. Changes</h2>
          <p>
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. 
            If a revision is material we will try to provide at least 30 days notice prior to any new terms taking effect. 
            What constitutes a material change will be determined at our sole discretion.
          </p>

          <h2>5. Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us at:
            <br />
            Email: contact@vantechsoftwares.com
          </p>
        </div>
      </div>
    </div>
  );
}
