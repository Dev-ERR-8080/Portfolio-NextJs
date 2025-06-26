import React from "react";
import ScrollFloat from "@/components/scrollrevel/scrollfloat";
import SkillsSection from "@/components/aboutContent/skills";
import ProjectBasic from "@/components/aboutContent/projects";
import AboutMain from "@/components/aboutContent/aboutMain";
import { Floating } from "@/components/floating/floating";
import BlurText from "@/components/TextAnimate/BlurText/BlurText";
import RotatingText from "@/components/TextAnimate/RotatingText/RotatingText";


export default function About() {
  return (
    //min-h-screen removed from the below div to remove the effect on lenis
    
    <div className="dark dark:bg-[#18181B] w-full relative z-10">
      {/* Global background texture overlay */}
     
      <div>
        <AboutMain />
      </div>

      {/* About Me Section */}
      <div className="px-4 md:px-8 lg:px-[80px] pb-[50px] flex flex-col gap-6 max-w-screen-xl mx-auto bg-[url('/car2.png')] sm:bg-[length:400px_auto] md:bg-[length:400px_auto] lg:bg-[length:600px_auto] bg-no-repeat bg-right-bottom">
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
        {/* <ScrollFloat>
          👋 Hi, I am <b>Preetham Reddy Yelamancha</b>, a passionate Full-Stack Developer and a B.Tech CSE student at
            Lovely Professional University (LPU), Punjab, graduating in 2026.
            
            I specialize in building scalable, user-friendly web applications using modern technologies.
            
            With a strong foundation in <b>Java, C, C++, JavaScript, PHP, and TypeScript</b>, I have experience in both
            frontend and backend development. I enjoy creating seamless user experiences and optimizing system performance
            for efficiency
        </ScrollFloat>
         */}
        <h1 className="font-[] text-left  text-[clamp(0.6rem,1vw,1.2rem)] leading-[1.5] font-light tracking-wider  mix-blend-difference z-1">
          👋 Hi, I am <b>Preetham Reddy Yelamancha</b>, a passionate Full-Stack Developer and a B.Tech CSE student at
          Lovely Professional University (LPU), Punjab, graduating in 2026.
          <br /><br />
          I specialize in building scalable, user-friendly web applications using modern technologies.
          <br /><br />
          With a strong foundation in <b>Java, C, C++, JavaScript, PHP, and TypeScript</b>, I have experience in both
          frontend and backend development. I enjoy creating seamless user experiences and optimizing system performance
          for efficiency.
        </h1>
      </div>

      {/* Skills Section */}
      <div className="px-4 md:px-8 lg:px-[80px] pb-[50px] flex flex-col max-w-screen-xl mx-auto bg-[url('/skills_background2.png')] sm:bg-[length:400px_auto] md:bg-[length:400px_auto] lg:bg-[length:800px_auto] bg-[-50px_30px] bg-no-repeat " >
        <SkillsSection />
        
      </div>

      {/* Projects Section */}
      <div className="px-4 md:px-8 lg:px-[80px] pb-[50px] flex flex-col max-w-screen-xl mx-auto">
        <ProjectBasic />
       
      </div>
      {/* carrer goals */}
      <div className="px-4 md:px-8 lg:px-[80px] pb-[50px] flex flex-col max-w-screen-xl mx-auto">
      <BlurText
        text="Career Goals"
        delay={150}
        animateBy="words"
        direction="top"
        className="text-left text-[#45FF17] text-[clamp(2vw,4vw,8vw)] leading-[1.5] pb-8  font-extrabold tracking-tight  mix-blend-difference z-1"
      />
      <BlurText
        text="I am actively seeking opportunities as a Full-Stack Developer or Frontend Developer to contribute my skills in modern web technologies. My goal is to build efficient, scalable, and user-centric applications that enhance real-world experiences."
        delay={50}
        animateBy="words"
        direction="top"
        className="text-2xl mb-8"
      />
      
      <h1 className=" flex flex-row gap-4 text-2xl leading-[1.5] pb-8  font-medium tracking-tight  mix-blend-difference z-1">Outside of development, I enjoy  
        
          <RotatingText
            texts={['Photogrphy', 'Music', 'Badmintion', 'Cool!']}
            mainClassName="px-2 w-fit sm:px-2 md:px-3 bg-cyan-300  text-black font-bold overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
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
      
      
     
      

      {/* Floating Element */}
      <div className="fixed bottom-6 left-0 right-0 flex justify-center items-center z-50">
        <Floating />
      </div>
      <div className="fixed bottom-0 left-0 w-full h-40 z-40 pointer-events-none bg-gradient-to-t from-[#18181B] via-transparent to-transparent"></div>

    </div>
    
  );
}
