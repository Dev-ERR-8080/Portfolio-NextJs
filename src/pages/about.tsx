import React from "react";
import Image from "next/image";
import Portrait from '../../public/lucas-clarysse-GFoFEoE900A-unsplash.jpg'
import { AuroraBackground } from "@/components/ui/aurora-background";
import { motion } from "framer-motion";
import ShinyText from "@/components/shinytext/shinytext";
import ScrollReveal from "@/components/scrollrevel/scrollrevel";
import ScrollFloat from "@/components/scrollrevel/scrollfloat";

export default function About() {
    return (
      <div className="dark dark:bg-[#18181B] w-full min-h-screen  ">
      <div >
        <AuroraBackground>
          <motion.div
            initial={{ opacity: 0.0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="flex flex-row gap-[45px] justify-center items-center m-[15px]"
          >
            {/* Left Content */}
            
            <div className="relative flex flex-col gap-y-4 justify-center px-4 self-start ml-30">      
              {/* Heading */}
              <div className="text-lg md:text-4xl font-light dark:text-[#565449]">
                <ShinyText text="//Who Am I?" disabled={false} speed={3} />
              </div>
      
              <div className="flex flex-col items-start text-[#b4b4b4] gap-y-3">
                <div className="text-6xl font-bold uppercase tracking-[0.85em] leading-[3rem]">
                Building 
                </div>
      
                <div className="flex items-center ">
                  <div className="text-6xl font-bold uppercase leading-tight flex flex-col gap-y-2">
                    <span className="tracking-[0.4em] leading-[3rem]">Impactful</span>
                    <span className="tracking-[0.45em] leading-[3rem]">Seamless </span>
                  </div>
                  <div className="text-[8rem] leading-none font-extrabold text-[#45FF17]">&</div>
                </div>
      
                <div className="text-6xl  font-bold uppercase tracking-[0.01em] leading-[3rem]">
                  <h1 className="inline-block transform origin-bottom-right">Digital Experiences</h1>
                </div>
              </div>
      
              {/* Subheading */}
              <h1 className="text-xl font-medium tracking-[0.1em] text-gray-700 uppercase text-left">
                Crafting Engaging & Intelligent Web Interfaces
              </h1>
            </div>
      
            {/* Right Image */}
            <div className="relative opacity-90 justify-center">
              <Image src={Portrait} alt="Portrait" width={640} height={348} className="rounded-lg" priority={true} />
            </div>
          </motion.div>
        </AuroraBackground>
      </div>
      <div className="mb-40 px-[180px] pb-[150px] top-0 max-w-screen-lg mx-auto">
        <ScrollFloat 
          animationDuration={1} 
          ease="back.inOut(2)" 
          scrollStart="center bottom+=50%" 
          scrollEnd="bottom bottom-=40%" 
          stagger={0.03} 
          textClassName="text-4xl font-bold text-left"
        >
          <span>About Me</span>
        </ScrollFloat>

        <ScrollReveal 
          baseOpacity={0.1} 
          enableBlur={true} 
          baseRotation={5} 
          blurStrength={4} 
          textClassName="text-2xl font-medium tracking-[0.1em] text-left"
        >
          👋 Hi, I am Preetham Reddy Yelamancha, a passionate Full-Stack Developer and a B.Tech CSE student at Lovely Professional University (LPU), Punjab, graduating in 2026.  
          I specialize in building scalable, user-friendly web applications using modern technologies.  

          With a strong foundation in Java, C, C++, JavaScript, PHP, and TypeScript, I have experience in both frontend and backend development.  
          I enjoy creating seamless user experiences and optimizing system performance for efficiency.
        </ScrollReveal>
      </div>

    </div>
    
    );
}
