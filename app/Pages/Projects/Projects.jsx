"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { FaExternalLinkAlt, FaGithub, FaGooglePlay, FaAppStoreIos } from "react-icons/fa";
import { MdPhoneIphone } from "react-icons/md";
import { data } from "../../constants";
import images from "../../constants/images";
import { ParticleField } from "../../components/legacy/3d";

const allProjects = data.projects;
const categories = data.projectCategories;

/** Store / repo / site links rendered as round buttons on card hover. */
const projectLinks = (project) =>
  [
    { href: project.playStore, icon: FaGooglePlay, label: "Google Play" },
    { href: project.appStore, icon: FaAppStoreIos, label: "App Store" },
    { href: project.github, icon: FaGithub, label: "Source code" },
    { href: project.website, icon: FaExternalLinkAlt, label: "Website" },
  ].filter((link) => link.href);

const Projects = () => {
  const [active, setActive] = useState("all");

  // Only offer a filter chip when at least one project actually uses it.
  const availableCategories = useMemo(
    () =>
      categories.filter(
        (cat) => cat.id === "all" || allProjects.some((p) => p.category === cat.id)
      ),
    []
  );

  const visible = useMemo(
    () =>
      active === "all"
        ? allProjects
        : allProjects.filter((project) => project.category === active),
    [active]
  );

  return (
    <section className="relative pb-24 pt-40 overflow-hidden min-h-screen">
      <ParticleField />

      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="main-heading">
            My <span>Projects</span>
          </h2>
        </motion.div>

        <div className="max-w-7xl mx-auto px-6">
          {availableCategories.length > 1 && (
            <motion.div
              className="flex flex-wrap justify-center gap-3 mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              {availableCategories.map((cat) => {
                const isActive = active === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActive(cat.id)}
                    aria-pressed={isActive}
                    className="px-5 py-2 rounded-full text-[13px] font-bold uppercase tracking-wider border transition-all duration-300 hover:-translate-y-0.5"
                    style={{
                      background: isActive ? "var(--gradient)" : "var(--glassBg)",
                      borderColor: isActive ? "transparent" : "var(--borderColor)",
                      color: isActive ? "#fff" : "var(--textMuted)",
                      backdropFilter: "var(--glassBlur)",
                    }}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </motion.div>
          )}

          {visible.length === 0 ? (
            <motion.div
              className="glass-card max-w-xl mx-auto text-center px-8 py-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <MdPhoneIphone size={56} className="mx-auto mb-5" style={{ color: "var(--mainColor)" }} />
              <h3
                className="text-xl font-bold mb-2"
                style={{ fontFamily: "var(--fontDisplay)", color: "var(--textColor)" }}
              >
                Apps on the way
              </h3>
              <p className="text-[15px] leading-[1.7]" style={{ color: "var(--textMuted)" }}>
                New Flutter builds are being polished for release. Get in touch and
                I&apos;ll happily walk you through the work in progress.
              </p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {visible.map((project) => (
                  <motion.div
                    key={project.name}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                    className={`glass-card project-card overflow-hidden group cursor-pointer ${
                      project.featured ? "border-[var(--mainColor)] border-opacity-30" : ""
                    }`}
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      {project.featured && (
                        <div
                          className="absolute top-3 right-3 z-10 px-3.5 py-1.5 rounded-full text-[10px] font-bold tracking-wider uppercase text-white shadow-lg flex items-center gap-1.5"
                          style={{ background: "var(--gradient)" }}
                        >
                          <FaExternalLinkAlt size={10} /> Featured
                        </div>
                      )}
                      <div className="w-full h-full relative">
                        <Image
                          src={project.img || images.placeholder}
                          alt={project.name}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover object-top transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-center justify-center gap-3">
                        {projectLinks(project).map((link) => (
                          <a
                            key={link.label}
                            href={link.href}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={`${project.name} - ${link.label}`}
                            className="w-12 h-12 rounded-full flex items-center justify-center text-white transition-all hover:scale-110 shadow-xl"
                            style={{
                              background: "var(--glassBg)",
                              backdropFilter: "var(--glassBlur)",
                              border: "var(--glassBorder)",
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.background = "var(--mainColor)")}
                            onMouseLeave={(e) => (e.currentTarget.style.background = "var(--glassBg)")}
                          >
                            <link.icon size={20} />
                          </a>
                        ))}
                      </div>
                    </div>

                    <div className="p-6">
                      <h3
                        className="text-lg font-bold mb-2"
                        style={{ fontFamily: "var(--fontDisplay)", color: "var(--textColor)" }}
                      >
                        {project.name}
                      </h3>
                      {project.description && (
                        <p className="text-[14px] leading-[1.6] mb-4" style={{ color: "var(--textMuted)" }}>
                          {project.description}
                        </p>
                      )}
                      <div className="flex flex-wrap gap-2">
                        {project.tech &&
                          project.tech.map((tag) => (
                            <span
                              key={tag}
                              className="px-3 py-1 rounded-md text-[10px] font-bold tracking-wider uppercase border"
                              style={{
                                background: "rgba(200, 162, 90, 0.08)",
                                borderColor: "var(--borderColor)",
                                color: "var(--textMuted)",
                              }}
                            >
                              {tag}
                            </span>
                          ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Projects;
