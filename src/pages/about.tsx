import React from "react";
import ScrollFloat from "@/components/scrollrevel/scrollfloat";
import SkillsSection from "@/components/aboutContent/skills";
import ProjectBasic from "@/components/aboutContent/projects";
import AboutMain from "@/components/aboutContent/aboutMain";
import { Floating } from "@/components/floating/floating";
import BlurText from "@/components/TextAnimate/BlurText/BlurText";
import RotatingText from "@/components/TextAnimate/RotatingText/RotatingText";
import Image from "next/image";

export default function About() {
  return (
    
    <div className="dark dark:bg-[#18181B] w-full relative z-10">
      {/* Global background texture overlay */}
      <div className="relative">
      <div >
        <AboutMain />
      </div>

      {/*skills Background Image */}
      <div className="absolute top-[20%] left-[55%] w-[820px] pointer-events-none z-0 ">
        <Image
          src="/car2.png"
          alt="Music Illustration"
          className="w-full h-full object-contain "
          loading="lazy"
          width={400}
          height={400}
          objectFit="contain"
        />
      </div>

      {/* About Me Section */}
      <div className="px-4 md:px-8 lg:px-[80px] pb-[50px] flex flex-col gap-6 max-w-screen-xl mx-auto ">
        <ScrollFloat
          animationDuration={1}
          ease="back.inOut(2)"
          scrollStart="center bottom+=50%"
          scrollEnd="bottom bottom-=40%"
          stagger={0.03}
          textClassName="text-left text-[#45FF17] text-[clamp(2vw,4vw,8vw)] leading-[1.5]   font-extrabold tracking-tight  mix-blend-difference z-1"
        >
          About Me
        </ScrollFloat>
        
        <h1 className=" text-left sm:text-sm md:text-lg lg:text-xlleading-[1.5] font-light tracking-wider  mix-blend-difference z-1 space-y-8 px-4 sm:px-12 ">
          👋 Hi, I am <b>Preetham Reddy Yelamancha</b>, a passionate Full-Stack Developer and a B.Tech CSE student at
          Lovely Professional University (LPU), Punjab, graduating in 2026.
          <br /><br />
          I specialize in building scalable, user-friendly web applications using modern technologies.
          <br /><br />
          With a strong foundation in <b>Java, Python, JavaScript, ReactJS, and NodeJS</b>, I have experience in both
          frontend and backend development. I enjoy creating seamless user experiences and optimizing system performance
          for efficiency.
        </h1>
      </div>
      {/*skills Background Image */}
      <div className="absolute top-[40%] left-[3%] w-[820px] pointer-events-none z-0 ">
        <Image
          src="/skills_background2.png"
          alt="Music Illustration"
          className="w-full h-full object-contain"
          loading="lazy"
          width={400} 
          height={400}
          objectFit="contain"
        />
      </div>
   
      {/* Skills Section */}
      <div className="px-4 md:px-8 lg:px-[80px] pb-[50px] flex flex-col max-w-screen-xl mx-auto" >
        <SkillsSection />
      </div>
      {/*music Background Image */}
      <div className="absolute top-[55%] left-[55%]  pointer-events-none z-0 ">
        <Image
          src="/music.png"
          alt="Music Illustration"
          className="w-full h-full object-contain rotate-[20deg] ml-4 mt-8"
          loading="lazy"
          width={400}
          height={400}
          objectFit="contain"
        />
      </div>
        
      {/* Projects Section */}
      <div className="px-4 md:px-8 lg:px-[80px] pb-[50px] flex flex-col max-w-screen-xl mx-auto">
        <ProjectBasic />
       
      </div>

    </div> 
      {/* carrer goals */}
      <div className="px-4 md:px-8 lg:px-[80px] pb-[50px] flex flex-col max-w-screen-xl mx-auto space-y-8  sm:px-12">
      <BlurText
        text="Career Goals"
        delay={150}
        animateBy="words"
        direction="top"
        className="text-left text-[#45FF17] text-[clamp(2vw,4vw,8vw)] leading-[1.5] pb-8  font-extrabold tracking-tight  mix-blend-difference z-1"
      />
      <BlurText
        text="I am actively seeking opportunities as a Software Developer or Full Stack Developer to contribute my skills in modern web technologies. My goal is to build efficient, scalable, and user-centric applications that enhance real-world experiences."
        delay={50}
        animateBy="words"
        direction="top"
        className="sm:text-sm md:text-lg lg:text-xl mb-2 pb-4 border-b-[0.5px] border-gray-500 px-4 sm:px-12 "
      />
      {/* badminton Background Image */}
      <div className="absolute top-[83%] left-[68%]  pointer-events-none z-0 ">
        <Image
          src="/badminton.png"
          alt="Badminton Illustration"
          className="w-full h-full object-contain scale-x-[-1]"
          loading="lazy"
          width={400}
          height={400}
          objectFit="contain"
        />
      </div>
      <h1 className=" flex flex-row gap-4 sm:text-sm md:text-lg lg:text-xl mb-2 leading-[1.5] pb-8  font-medium tracking-tight  mix-blend-difference z-1">Outside of development, I enjoy

          <RotatingText
            texts={['Photography', 'Music', 'Badminton', 'Cool!']}
            mainClassName="px-2 w-fit sm:px-2 md:px-3 bg-cyan-300  text-black font-bold overflow-hidden py-0.5 sm:py-1 md:py-2 rounded-lg"
            staggerFrom={"last"}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-120%" }}
            staggerDuration={0.025}
            splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
            rotationInterval={2000}
          />
        
      </h1>
      </div>
      
      
    {/* <div className="absolute inset-0 bg-gradient-to-br from-transparent via-black/40 to-black/30 pointer-events-none z-0" /> */}
   
    

      

      {/* Floating Element */}
      <div className="fixed bottom-6 left-0 right-0 flex justify-center items-center z-50">
        <Floating />
      </div>
      <div className="fixed bottom-0 left-0 w-full h-40 z-40 pointer-events-none bg-gradient-to-t from-[#18181B] via-transparent to-transparent"></div>

    </div>
    
  );
}
