'use client';

import { motion } from 'framer-motion';
import { Globe, TreePalm, Heart, Sun, Waves, Mountain, Camera, MapPin } from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import dynamic from 'next/dynamic';
import Link from 'next/link';

const ParticleField = dynamic(() => import('@/components/three/ParticleField'), {
  ssr: false,
});

const timeline = [
  { year: '543 BC', title: 'Arrival of Vijaya', desc: 'Prince Vijaya arrives from India, founding the Sinhalese civilization.' },
  { year: '377 BC', title: 'Anuradhapura Kingdom', desc: 'The ancient city of Anuradhapura becomes the first established kingdom.' },
  { year: '1st C', title: 'Ruwanwelisaya Stupa', desc: 'King Dutugamunu builds one of the tallest ancient structures in the world.' },
  { year: '5th C', title: 'Sigiriya Fortress', desc: 'King Kasyapa builds his magnificent rock fortress, now a UNESCO site.' },
  { year: '1815', title: 'British Colonial Era', desc: 'The entire island comes under British rule, leading to tea plantation culture.' },
  { year: '1948', title: 'Independence', desc: 'Sri Lanka (then Ceylon) gains independence from British colonial rule.' },
  { year: '1982', title: 'UNESCO Recognition', desc: 'First sites designated as UNESCO World Heritage Sites.' },
  { year: 'Today', title: 'Modern Paradise', desc: 'A thriving tourism destination welcoming millions of visitors annually.' },
];

export default function AboutPageClient() {
  return (
    <div className="relative min-h-screen">
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1586613835341-48e6796da4da?w=1920&q=80)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />
        <ParticleField />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 w-full pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
              <Globe className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-300 text-sm font-medium">
                Pearl of the Indian Ocean
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              About{' '}
              <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
                Sri Lanka
              </span>
            </h1>
            <p className="text-white/60 text-xl leading-relaxed">
              A compact island of staggering diversity — where ancient civilizations
              meet tropical paradise, and every journey reveals something extraordinary.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative -mt-12 z-10 max-w-5xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { end: 65610, suffix: '', label: 'Sq km Area' },
            { end: 22, suffix: 'M', label: 'Population' },
            { end: 8, suffix: '', label: 'UNESCO Sites' },
            { end: 1340, suffix: '', label: 'Km Coastline' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 text-center"
            >
              <AnimatedCounter end={stat.end} suffix={stat.suffix} label={stat.label} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Description */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              An Island Like No Other
            </h2>
            <div className="space-y-4 text-white/50 leading-relaxed text-lg">
              <p>
                Sri Lanka, formerly known as Ceylon, is a tear-drop shaped island nation in
                the Indian Ocean, just south of India. Despite its small size, this island packs
                an incredible punch of diversity.
              </p>
              <p>
                From the misty highlands draped in emerald tea plantations to sun-drenched
                golden beaches, from ancient cities dating back over two millennia to wild
                jungles roamed by elephants and leopards — Sri Lanka is a microcosm of the
                world&apos;s wonders.
              </p>
              <p>
                The island boasts 8 UNESCO World Heritage Sites, over 500 species of birds,
                some of the world&apos;s finest teas, and a rich tapestry of cultures shaped by
                Buddhist, Hindu, Muslim, and Christian traditions living in harmony.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Mountain, label: 'Mountains', color: 'text-emerald-400' },
                { icon: Waves, label: 'Beaches', color: 'text-cyan-400' },
                { icon: Camera, label: 'Heritage', color: 'text-amber-400' },
                { icon: TreePalm, label: 'Tropics', color: 'text-green-400' },
                { icon: Heart, label: 'Culture', color: 'text-rose-400' },
                { icon: Sun, label: 'Weather', color: 'text-orange-400' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05, y: -4 }}
                  className="p-6 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-all text-center"
                >
                  <item.icon className={`w-8 h-8 ${item.color} mx-auto mb-3`} />
                  <span className="text-white/60 text-sm">{item.label}</span>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Timeline */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-emerald-950/10 to-black" />
        <div className="relative max-w-4xl mx-auto px-6 lg:px-8">
          <ScrollReveal className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              A Journey Through Time
            </h2>
            <p className="text-white/40 text-lg">
              Over 2,500 years of rich history and civilization
            </p>
          </ScrollReveal>

          <div className="relative">
            {/* Center line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-emerald-500/50 via-teal-500/30 to-transparent" />

            {timeline.map((item, i) => (
              <ScrollReveal
                key={i}
                delay={i * 0.1}
                direction={i % 2 === 0 ? 'left' : 'right'}
              >
                <div
                  className={`relative flex items-start gap-8 mb-12 ${
                    i % 2 === 0
                      ? 'md:flex-row'
                      : 'md:flex-row-reverse md:text-right'
                  }`}
                >
                  {/* Dot */}
                  <div className="absolute left-4 md:left-1/2 w-3 h-3 -translate-x-1/2 rounded-full bg-emerald-400 border-2 border-black shadow-lg shadow-emerald-500/30 z-10" />

                  {/* Content */}
                  <div className={`ml-12 md:ml-0 md:w-1/2 ${i % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                    <span className="text-emerald-400 text-sm font-mono font-bold">
                      {item.year}
                    </span>
                    <h3 className="text-white text-xl font-semibold mt-1 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-white/40 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-6 lg:px-8 py-24 text-center">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Experience Sri Lanka?
          </h2>
          <p className="text-white/40 text-lg mb-10 max-w-2xl mx-auto">
            Start exploring our curated collection of destinations and plan your
            unforgettable journey to the Pearl of the Indian Ocean.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/destinations"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-full hover:shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300 hover:-translate-y-1"
            >
              <MapPin className="w-5 h-5" />
              Explore Destinations
            </Link>
            <Link
              href="/categories"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-medium rounded-full border border-white/10 hover:border-white/20 transition-all"
            >
              Browse Categories
            </Link>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
