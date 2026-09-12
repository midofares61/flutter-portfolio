"use client";

import { Canvas } from "@react-three/fiber";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { Suspense} from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
const Scene = dynamic(() => import("./Scene"), { ssr: false });
import { data } from "../../constants";
import images from "../../constants/images";

const { personalInfo } = data;
const prof = images.profile;

const Landing = () => {
  return (
    <section className="relative w-full min-h-[100dvh] overflow-hidden flex flex-col justify-between">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Canvas
          camera={{ position: [0, 0, 8], fov: 60 }}
          gl={{ antialias: false, alpha: true }}
          dpr={[1, 1.5]}
        >
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
      </div>

      <div className="relative z-10 w-full flex-1 flex items-center pt-24 pb-8 lg:pt-32 lg:pb-12">
        <div className="w-full max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex flex-col gap-4 items-center lg:items-start text-center lg:text-start order-2 lg:order-1"
            >
              <motion.p
                className="text-lg font-medium tracking-[2px] uppercase mb-0"
                style={{ color: 'var(--mainColor)' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                Hello, I'm
              </motion.p>

              <motion.h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.15] mb-0 gradient-text"
                style={{ fontFamily: 'var(--fontDisplay)' }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                {personalInfo.name}
              </motion.h1>

              <motion.div
                className="text-xl sm:text-2xl md:text-3xl font-semibold min-h-[36px] gradient-text"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                <TypeAnimation
                  sequence={[
                    "Flutter Developer",
                    2000,
                    "Flutter & Dart",
                    2000,
                    `${personalInfo.yearsOfExperience} Years of Experience`,
                    2000,
                    "Android & iOS from One Codebase",
                    2000,
                  ]}
                  wrapper="span"
                  speed={50}
                  repeat={Infinity}
                />
              </motion.div>

              <motion.p
                className="text-sm sm:text-base leading-[1.7] max-w-[500px] my-2 font-medium"
                style={{ color: 'var(--textMuted)' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.6 }}
              >
                Building cross-platform mobile apps that feel native on both
                Android and iOS &mdash; smooth, fast, and built to scale.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 mt-4 w-full sm:w-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.6 }}
              >
                <Link 
                  href="/Contact" 
                  className="custom-button w-full sm:w-auto flex justify-center !text-white !border-none !shadow-[0_8px_30px_rgba(200,162,90,0.3)]"
                  style={{ background: 'var(--gradient)' }}
                >
                  Get In Touch
                </Link>
                <Link href="/Projects" className="custom-button w-full sm:w-auto flex justify-center !border-[var(--borderColor)] !text-[var(--textColor)] hover:!bg-[var(--glassBg)] hover:!border-[var(--mainColor)] hover:!text-[var(--mainColor)]">
                  View Projects
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              className="flex justify-center order-1 lg:order-2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
            >
              <div className="relative w-[220px] h-[220px] sm:w-[280px] sm:h-[280px] md:w-[380px] md:h-[380px]">
                <div className="profile_ring" />
                <div className="profile_ring profile_ring_2" />
                <div className="profile_glow" />
                <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                  <svg
                    viewBox="0 0 480 480"
                    className="w-full h-full drop-shadow-[0_0_30px_rgba(200,162,90,0.2)]"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      <clipPath id="blob">
                        <path
                          fill="#474bff"
                          d="M453,295.5Q451,351,398.5,372Q346,393,303,400.5Q260,408,210.5,428.5Q161,449,112.5,422.5Q64,396,42,345Q20,294,20.5,240Q21,186,43.5,136Q66,86,112.5,56Q159,26,211,36.5Q263,47,301,72Q339,97,374,124Q409,151,432,195.5Q455,240,453,295.5Z"
                        />
                      </clipPath>
                    </defs>
                    <image
                      style={{
                        filter: "opacity(0.95)",
                        transform: "rotate(7deg)",
                        transformOrigin: "center",
                      }}
                      x="0"
                      y="0"
                      width="100%"
                      height="100%"
                      clipPath="url(#blob)"
                      href={prof}
                      preserveAspectRatio="xMidYMid slice"
                    />
                  </svg>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <motion.div
        className="relative z-20 flex flex-col items-center gap-2 cursor-pointer opacity-60 hover:opacity-100 transition-all duration-300 pb-8 pt-4 group mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        onClick={() => document.getElementById('qualification')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <div className="w-[26px] h-[40px] rounded-full border-2 border-[var(--mainColor)] flex justify-center p-2">
          <div className="w-1 h-2 rounded-full bg-[var(--mainColor)] animate-[scrollWheel_1.5s_ease-in-out_infinite]" />
        </div>
        <span className="text-[10px] font-bold text-[var(--mainColor)] uppercase tracking-[2px]">Scroll Down</span>
      </motion.div>
    </section>
  );
};

export default Landing;
