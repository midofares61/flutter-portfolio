"use client";

import { motion } from "framer-motion";
import { FaGraduationCap, FaDownload, FaExternalLinkAlt, FaCalendarAlt, FaLinkedinIn } from "react-icons/fa";
import { MdLocationOn, MdPhone, MdEmail, MdLanguage, MdWork, MdStar } from "react-icons/md";
import { data } from "../../constants";
import dynamic from "next/dynamic";

const ParticleField = dynamic(() => import("../../components/legacy/3d/ParticleField"), { ssr: false });
const CV = data.personalInfo.cv;

const getAge = (birthdate) => {
  const birth = new Date(birthdate);
  if (Number.isNaN(birth.getTime())) return null;
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
  return age;
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const { personalInfo, education } = data;
const age = getAge(personalInfo.birthdate);

const About = () => {
  return (
    <section className="relative py-24 overflow-hidden min-h-screen">
      <ParticleField intensity="light" showRings showStars={false} />

      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="main-heading">
            About <span>Me</span>
          </h2>
        </motion.div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            className="p-5 sm:p-8 md:p-10 glass-card text-center sm:text-left mb-10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="mb-6 sm:mb-8 text-center">
              <h3 className="text-[26px] sm:text-[32px] font-extrabold mb-1" style={{ fontFamily: 'var(--fontDisplay)', color: 'var(--textColor)' }}>{personalInfo.name}</h3>
              <p className="text-[16px] sm:text-[18px] font-semibold" style={{ color: 'var(--mainColor)' }}>{personalInfo.title}</p>
            </div>
            <p className="text-[14.5px] sm:text-[16px] leading-[1.7] mb-8 max-w-3xl mx-auto text-left sm:text-center" style={{ color: 'var(--textMuted)' }}>
              {personalInfo.bio}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {personalInfo.cvViewUrl && (
                <a
                  href={personalInfo.cvViewUrl}
                  className="custom-button w-full sm:w-auto flex justify-center !text-white !border-none !shadow-[0_8px_30px_rgba(200,162,90,0.3)] gap-2 text-[15px]"
                  style={{ background: 'var(--gradient)' }}
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaExternalLinkAlt size={14} /> View CV
                </a>
              )}
              <a 
                href={CV} 
                className="custom-button w-full sm:w-auto flex justify-center !text-[var(--textColor)] hover:!bg-[var(--glassBg)] hover:!border-[var(--mainColor)] hover:!text-[var(--mainColor)] gap-2 text-[15px]" 
                rel="noreferrer" 
                download
              >
                <FaDownload size={14} /> Download CV
              </a>
            </div>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { icon: MdLocationOn, label: "Location", value: personalInfo.location },
              { icon: FaCalendarAlt, label: "Age", value: age ? `${age} years old` : null },
              { icon: MdPhone, label: "Phone", value: personalInfo.phone, href: `tel:${personalInfo.phone}` },
              { icon: MdEmail, label: "Email", value: personalInfo.email, href: `mailto:${personalInfo.email}` },
              { icon: FaLinkedinIn, label: "LinkedIn", value: personalInfo.linkedin ? "View Profile" : null, href: personalInfo.linkedin },
              { icon: MdWork, label: "Experience", value: `${personalInfo.yearsOfExperience} Years` },
            ].filter((info) => info.value).map((info, idx) => (
              <motion.div key={idx} className="p-6 rounded-2xl glass-card flex items-center gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(200,162,90,0.08)] group overflow-hidden" variants={itemVariants}>
                <div className="w-11 h-11 min-w-[44px] flex items-center justify-center rounded-xl bg-[rgba(200,162,90,0.08)] text-[22px] transition-transform group-hover:scale-110" style={{ color: 'var(--mainColor)' }}>
                  <info.icon />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] font-bold text-[var(--textMuted)] uppercase tracking-wider mb-0.5">{info.label}</p>
                  {info.href ? (
                    <a href={info.href} target={info.label === "LinkedIn" ? "_blank" : undefined} rel={info.label === "LinkedIn" ? "noreferrer" : undefined} className="block text-[14px] sm:text-[15px] font-semibold hover:!text-[var(--mainColor)] transition-colors break-all" style={{ color: 'var(--textColor)' }}>
                      {info.value}
                    </a>
                  ) : (
                    <p className="text-[14px] sm:text-[15px] font-semibold break-words" style={{ color: 'var(--textColor)' }}>{info.value}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <motion.div
              className="lg:col-span-7"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-8 flex items-center gap-3" style={{ fontFamily: 'var(--fontDisplay)', color: 'var(--textColor)' }}>
                <FaGraduationCap size={24} style={{ color: 'var(--mainColor)' }} /> Education
              </h3>
              <div className="space-y-4">
                {education.map((edu, index) => (
                  <motion.div
                    key={index}
                    className="p-6 glass-card flex items-start gap-4 transition-all duration-300 hover:translate-x-1"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="w-3 h-3 min-w-[12px] rounded-full mt-1.5" style={{ background: 'var(--gradient)' }} />
                    <div>
                      <h4 className="text-[17px] font-bold mb-1" style={{ color: 'var(--textColor)' }}>{edu.title}</h4>
                      <p className="text-[14px] font-medium mb-3" style={{ color: 'var(--mainColor)' }}>{edu.institution}</p>
                      <div className="flex gap-3">
                        {edu.year && (
                          <span className="text-[13px] px-3 py-0.5 rounded bg-[rgba(200,162,90,0.08)] font-medium" style={{ color: 'var(--textMuted)' }}>
                            {edu.year}
                          </span>
                        )}
                        {edu.grade && (
                          <span className="text-[13px] px-3 py-0.5 rounded bg-[rgba(200,162,90,0.08)] font-medium" style={{ color: 'var(--textMuted)' }}>
                            {edu.grade}
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="lg:col-span-5 space-y-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div>
                <h3 className="text-2xl font-bold mb-8 flex items-center gap-3" style={{ fontFamily: 'var(--fontDisplay)', color: 'var(--textColor)' }}>
                  <MdLanguage size={24} style={{ color: 'var(--mainColor)' }} /> Languages
                </h3>
                <div className="space-y-3">
                  {personalInfo.languages.map((lang, index) => (
                    <div key={index} className="p-4 px-6 glass-card flex justify-between items-center">
                      <span className="text-[16px] font-bold" style={{ color: 'var(--textColor)' }}>{lang.name}</span>
                      <span className="text-[14px] font-medium px-4 py-1 rounded-full bg-[rgba(200, 162, 90, 0.08)]" style={{ color: 'var(--mainColor)' }}>{lang.level}</span>
                    </div>
                  ))}
                </div>
              </div>

              {personalInfo.strengths?.length > 0 && (
                <div>
                  <h3 className="text-2xl font-bold mb-8 flex items-center gap-3" style={{ fontFamily: 'var(--fontDisplay)', color: 'var(--textColor)' }}>
                    <MdStar size={24} style={{ color: 'var(--mainColor)' }} /> Core Strengths
                  </h3>
                  <div className="flex flex-wrap gap-2.5">
                    {personalInfo.strengths.map((strength) => (
                      <span
                        key={strength}
                        className="px-4 py-2 rounded-full text-[13px] font-semibold border"
                        style={{
                          background: 'rgba(200, 162, 90, 0.08)',
                          borderColor: 'var(--borderColor)',
                          color: 'var(--textMuted)',
                        }}
                      >
                        {strength}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="p-8 glass-card bg-amber-600/5">
                <p className="text-[15px] leading-[1.7] italic" style={{ color: 'var(--textMuted)' }}>
                  &ldquo;I care about shipping things that actually reach users &mdash; clean,
                  maintainable Flutter code that holds up once it is live in the store.&rdquo;
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
