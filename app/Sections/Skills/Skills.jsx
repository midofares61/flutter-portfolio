"use client";

import { motion } from "framer-motion";
import { data } from "../../constants";
import dynamic from "next/dynamic";
const SkillsSphere = dynamic(() => import("../../components/legacy/3d/SkillsSphere"), { ssr: false });
const ParticleField = dynamic(() => import("../../components/legacy/3d/ParticleField"), { ssr: false });

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Skills = () => {
  return (
    <section className="relative pt-4 md:pt-16 pb-12 md:pb-24 overflow-hidden">
      <ParticleField intensity="light" showRings={false} />

      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="-mt-4 md:mt-0"
        >
          <h2 className="main-heading !mt-0">
            Skills & <span>Technologies</span>
          </h2>
        </motion.div>

        <div className="max-w-7xl mx-auto px-6">
          {/* 3D Interactive Globe */}
          <motion.div
            className="mb-12 md:mb-20 text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="h-[280px] sm:h-[320px] md:h-[400px] w-full flex items-center justify-center">
               <SkillsSphere />
            </div>
            <p className="text-[13px] mt-4 italic opacity-60 tracking-wide" style={{ color: 'var(--textMuted)' }}>Drag to rotate the skills globe</p>
          </motion.div>

          {/* Categorized Cards */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {data.skillCategories.map((category, index) => (
              <motion.div
                key={index}
                className="p-8 glass-card"
                variants={itemVariants}
                whileHover={{ y: -4 }}
              >
                <h3 className="text-lg font-bold mb-6 pb-3 border-b" style={{ fontFamily: 'var(--fontDisplay)', color: 'var(--mainColor)', borderColor: 'var(--borderColor)' }}>
                  {category.title}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {category.skills.map((skill, i) => (
                    <motion.div
                      key={i}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl border transition-all cursor-default"
                      style={{ 
                        background: 'rgba(200, 162, 90, 0.06)',
                        borderColor: 'var(--borderColor)',
                      }}
                      whileHover={{ 
                        scale: 1.05, 
                        background: 'rgba(200, 162, 90, 0.12)',
                        borderColor: 'var(--mainColor)',
                        boxShadow: '0 2px 12px rgba(200, 162, 90, 0.15)'
                      }}
                    >
                      <div className="text-base" style={{ color: 'var(--mainColor)' }}>
                        {skill.icon && <skill.icon />}
                      </div>
                      <span className="text-sm font-medium" style={{ color: 'var(--textColor)' }}>
                        {skill.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
