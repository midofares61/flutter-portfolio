"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FloatingShapes } from "../../components/legacy/3d";

const Qualification = () => {
  const router = useRouter();
  return (
    <section id="qualification" className="relative pt-4 md:pt-16 pb-24 overflow-hidden" style={{ background: 'var(--bgSecondary)' }}>
      <FloatingShapes preset="sparse" />

      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="main-heading !mt-0">
            <span>Qualification</span>
          </h2>
        </motion.div>
        
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <motion.article
            className="p-6 sm:p-8 md:p-12 glass-card text-left"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <p className="text-[14px] sm:text-[16px] md:text-[17px] leading-[1.7] mb-5 font-medium" style={{ color: 'var(--textMuted)' }}>
              A <span className="font-bold" style={{ color: 'var(--textColor)' }}>Flutter Developer</span> with 4+ years of
              professional experience building and deploying cross-platform mobile applications for Android and iOS.
              Strong expertise in <span className="font-bold" style={{ color: 'var(--textColor)' }}>Flutter, Dart, BLoC/Cubit, REST and GraphQL APIs</span>,
              with a solid focus on clean scalable structure, reusable widgets, and performance.
              Comfortable working inside existing codebases, wiring up backend services, and shipping
              maintainable features that reach real users.
            </p>

            <p className="text-[14px] sm:text-[16px] md:text-[17px] leading-[1.7] mb-8 sm:mb-10 font-medium" style={{ color: 'var(--textMuted)' }}>
              I have taken apps all the way to production &mdash; integrating local payment gateways,
              Firebase auth and offline storage, then shipping signed releases to Google Play and the
              App Store through GitHub Actions and Fastlane. Particularly interested in real-time, AI-powered and SaaS products.
            </p>
            <button 
              className="custom-button w-full sm:w-auto flex justify-center !text-white !border-none mx-auto shadow-lg shadow-amber-600/20" 
              style={{ background: 'var(--gradient)' }}
              onClick={() => router.push("/About")}
            >
              Learn More About Me
            </button>
          </motion.article>
        </div>
      </div>
    </section>
  );
};

export default Qualification;
