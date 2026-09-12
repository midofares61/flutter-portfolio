"use client";

import { motion } from "framer-motion";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { MdWork } from "react-icons/md";
import { data } from "../../constants";
import { FloatingShapes } from "../../components/legacy/3d";

const Experience = () => {
  return (
    <section className="relative pb-12 md:pb-24 overflow-hidden">
      <FloatingShapes preset="code" />

      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="main-heading">
            Work <span>Experience</span>
          </h2>
        </motion.div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <VerticalTimeline lineColor="rgba(200, 162, 90, 0.2)">
            {data.experiences.map((exp, index) => (
              <VerticalTimelineElement
                key={index}
                className="vertical-timeline-element--work"
                contentStyle={{
                  background: "var(--glassBg)",
                  backdropFilter: "var(--glassBlur)",
                  border: "var(--glassBorder)",
                  borderRadius: "24px",
                  boxShadow: "var(--shadow)",
                  color: "inherit",
                }}
                contentArrowStyle={{
                  borderRight: "8px solid rgba(255, 255, 255, 0.1)",
                }}
                date={exp.date}
                dateClassName="text-neutral-500 dark:text-neutral-400 font-bold px-4"
                iconStyle={{
                  background: "var(--gradient)",
                  color: "#fff",
                  boxShadow: "0 0 0 4px rgba(200, 162, 90, 0.2), 0 0 20px rgba(200, 162, 90, 0.4)",
                }}
                icon={<MdWork />}
              >
                <div className="mb-4">
                  <h3 className="text-xl font-bold mb-1" style={{ color: 'var(--textColor)' }}>
                    {exp.title}
                  </h3>
                  <h4 className="font-bold mb-2" style={{ color: 'var(--mainColor)' }}>
                    {exp.company}
                  </h4>
                  <div className="flex flex-wrap gap-3 mt-2">
                    <span className="text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest" style={{ background: 'var(--mainColorLight)', color: 'var(--bgColor)', opacity: 0.8 }}>
                      {exp.type}
                    </span>
                    <span className="text-[10px] font-bold px-3 py-1 rounded-full border uppercase tracking-widest" style={{ borderColor: 'var(--borderColor)', color: 'var(--textMuted)' }}>
                      {exp.location}
                    </span>
                  </div>
                </div>
                
                <ul className="space-y-3">
                  {exp.points.map((point, i) => (
                    <li key={i} className="text-sm flex items-start gap-3" style={{ color: 'var(--textMuted)' }}>
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: 'var(--mainColor)' }} />
                      {point}
                    </li>
                  ))}
                </ul>

                {exp.link && (
                  <a
                    href={exp.link}
                    target="_blank"
                    rel="noreferrer"
                    className="flex justify-start items-center mt-6 text-sm font-bold transition-colors"
                    style={{ color: 'var(--mainColor)' }}
                  >
                    Visit Project <span className="ml-1 text-lg">→</span>
                  </a>
                )}
              </VerticalTimelineElement>
            ))}
          </VerticalTimeline>
        </div>
      </div>
    </section>
  );
};

export default Experience;
