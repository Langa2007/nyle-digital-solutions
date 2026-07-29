// src/components/sections/TeamSection.tsx
'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Twitter, Mail } from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  title: string;
  bio?: string;
  imageUrl?: string;
  linkedinUrl?: string;
  twitterUrl?: string;
  email?: string;
  order: number;
}

function Avatar({ member }: { member: TeamMember }) {
  const [imgError, setImgError] = useState(false);

  const initials = member.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  if (member.imageUrl && !imgError) {
    return (
      <img
        src={member.imageUrl}
        alt={member.name}
        onError={() => setImgError(true)}
        className="h-16 w-16 rounded-full object-cover object-center ring-2 ring-white/80 dark:ring-stone-700 shadow-md flex-shrink-0"
      />
    );
  }

  return (
    <div className="h-16 w-16 rounded-full flex-shrink-0 flex items-center justify-center bg-gradient-to-br from-blue-600 to-cyan-400 text-white font-bold text-lg ring-2 ring-white/80 dark:ring-stone-700 shadow-md select-none">
      {initials}
    </div>
  );
}

function MemberCard({ member }: { member: TeamMember }) {
  return (
    <div className="inline-flex items-center gap-4 bg-white dark:bg-stone-900 border border-gray-100 dark:border-stone-800 rounded-2xl px-5 py-4 shadow-sm hover:shadow-md transition-shadow duration-300 min-w-[260px] max-w-[300px] mx-3 flex-shrink-0">
      <Avatar member={member} />
      <div className="min-w-0 flex-1">
        <p className="font-semibold text-gray-900 dark:text-white text-sm leading-tight truncate">
          {member.name}
        </p>
        <p className="text-blue-600 dark:text-amber-400 text-xs font-medium mt-0.5 truncate">
          {member.title}
        </p>
        <div className="flex items-center gap-2 mt-2">
          {member.linkedinUrl && member.linkedinUrl !== '#' && (
            <a
              href={member.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              aria-label={`${member.name} LinkedIn`}
            >
              <Linkedin className="h-3.5 w-3.5" />
            </a>
          )}
          {member.twitterUrl && member.twitterUrl !== '#' && (
            <a
              href={member.twitterUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
              aria-label={`${member.name} Twitter`}
            >
              <Twitter className="h-3.5 w-3.5" />
            </a>
          )}
          {member.email && (
            <a
              href={`mailto:${member.email}`}
              className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              aria-label={`Email ${member.name}`}
            >
              <Mail className="h-3.5 w-3.5" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function TeamSection() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiBase =
      process.env.NEXT_PUBLIC_API_URL ||
      (typeof window !== 'undefined' ? '/api' : '');

    fetch(`${apiBase}/team`)
      .then((r) => r.json())
      .then((json) => {
        if (json.success && Array.isArray(json.data)) {
          setMembers(json.data);
        }
      })
      .catch(() => {
        // Fallback to hardcoded if API unreachable
        setMembers([
          {
            id: '1',
            name: 'Fidel Langa',
            title: 'CEO & Founder',
            bio: 'Software engineer and entrepreneur with a vision for innovative solutions',
            email: 'ceo@vantechsoftwares.com',
            order: 1,
          },
          {
            id: '2',
            name: 'Fidel Muthomi',
            title: 'CTO & Founder',
            bio: 'Visionary leader with a passion for innovative software solutions',
            email: 'cto@vantechsoftwares.com',
            order: 2,
          },
        ]);
      })
      .finally(() => setLoading(false));
  }, []);

  // Duplicate list so the marquee loops seamlessly
  const displayList = [...members, ...members, ...members];

  return (
    <section className="py-16 bg-white dark:bg-stone-950 overflow-hidden">
      <div className="container mx-auto px-4 mb-10">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Meet Our <span className="text-blue-600">Expert Team</span>
          </h2>
          <p className="text-base text-gray-500 dark:text-stone-400 max-w-xl mx-auto">
            Passionate engineers and founders dedicated to delivering excellence.
          </p>
        </motion.div>
      </div>

      {/* Slim sliding strip */}
      {loading ? (
        <div className="flex justify-center py-8">
          <div className="h-8 w-8 rounded-full border-2 border-blue-600 border-t-transparent animate-spin" />
        </div>
      ) : (
        <div className="relative w-full">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-white dark:from-stone-950 to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-white dark:from-stone-950 to-transparent pointer-events-none" />

          <div className="flex overflow-hidden">
            <motion.div
              className="flex"
              animate={{ x: ['0%', '-33.333%'] }}
              transition={{
                duration: members.length * 4,
                repeat: Infinity,
                ease: 'linear',
                repeatType: 'loop',
              }}
              style={{ willChange: 'transform' }}
            >
              {displayList.map((member, i) => (
                <MemberCard key={`${member.id}-${i}`} member={member} />
              ))}
            </motion.div>
          </div>
        </div>
      )}
    </section>
  );
}
