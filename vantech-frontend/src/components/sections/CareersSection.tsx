'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ArrowRight, Briefcase, MapPin, Clock } from 'lucide-react';
import JobApplicationForm from '@/components/forms/JobApplicationForm';
import { jobsApi } from '@/lib/api/client';
import { Modal } from '@/components/ui/Modal';

export default function CareersSection() {
  const [selectedJob, setSelectedJob] = useState<any | null>(null);

  const { data: jobs = [], isLoading } = useQuery({
    queryKey: ['open-positions'],
    queryFn: () => jobsApi.getOpenPositions().then(res => res.data.data || []),
  });

  return (
    <section className="section-atmosphere py-20">
      <div className="section-shell relative z-10">
        <div className="mb-14 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-blue-600 dark:text-amber-200">
            Join the Team
          </p>
          <h2 className="mt-4 text-3xl font-semibold text-slate-950 dark:text-white sm:text-4xl">
            Build the future of digital products with us.
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-300">
            We are always looking for talented engineers, designers, and strategists to join our growing team. Check out our open roles below.
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent dark:border-amber-400 dark:border-t-transparent"></div>
          </div>
        ) : jobs.length > 0 ? (
          <div className="grid gap-6">
            {jobs.map((job: any) => (
              <div key={job.id} className="glass-panel p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 rounded-xl hover:-translate-y-1 transition-transform duration-300">
                <div>
                  <h3 className="text-xl font-semibold text-slate-950 dark:text-white mb-3">
                    {job.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <Briefcase className="h-4 w-4" />
                      {job.department}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-4 w-4" />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-4 w-4" />
                      {job.type}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedJob(job)}
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-stone-950"
                >
                  Apply Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="glass-panel rounded-xl p-10 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-stone-900 dark:text-amber-200">
              <Briefcase className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold text-slate-950 dark:text-white mb-2">No open positions right now</h3>
            <p className="text-slate-600 dark:text-slate-400">
              We're not actively hiring at the moment, but we're always happy to hear from talented people. Feel free to send your resume to careers@vantechsoftwares.com.
            </p>
          </div>
        )}

        <Modal
          isOpen={!!selectedJob}
          onClose={() => setSelectedJob(null)}
          title="Apply for Position"
        >
          {selectedJob && (
            <JobApplicationForm 
              jobId={selectedJob.id} 
              jobTitle={selectedJob.title}
            />
          )}
        </Modal>
      </div>
    </section>
  );
}
