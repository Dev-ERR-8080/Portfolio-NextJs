import { useEffect, useState } from "react";
import SplitText from "../ui/SplitText";
type SkillItem = {
  id: number;
  category: string;
  skills: string[];
};

const SkillsSection = () => {
  const [skillsData, setSkillsData] = useState<SkillItem[]>([]);

  useEffect(() => {
    fetch("/api/skills") // Adjust the endpoint as needed
      .then((response) => response.json())
      .then((data) => setSkillsData(data))
      .catch((error) => console.error("Error fetching skills:", error));
  }, []);

  return (
    <>
    <SplitText
      text="Technical Skills"
      className="text-left text-[#45FF17] text-[clamp(2vw,4vw,8vw)] leading-[1.5] font-extrabold tracking-tight mix-blend-difference z-1"
      delay={100}
      animationFrom={{ opacity: 0, transform: "translate3d(0,50px,0)" }}
      animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
      textAlign="start"
      threshold={0.2}
      rootMargin="-50px" />
      
    <div className="text-white space-y-8 px-4 sm:px-12 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 ">
          {skillsData.map((item) => (
            <div
              key={item.id}
              className="backdrop-blur-md bg-[#848884]/10 border border-white/20 rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.4)] p-6 space-y-4 hover:scale-[1.02] transition-transform duration-300 flex justify-left flex-col"
            >
              <SplitText
                text={item.category}
                className="text-2xl sm:text-2xl font-semibold text-white "
                delay={100}
                animationFrom={{ opacity: 0, transform: "translate3d(0,50px,0)" }}
                animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
                textAlign="start"
                threshold={0.2}
                rootMargin="-50px" />
              <SplitText
                text={item.skills.join(', ')}
                className="text-base sm:text-lg font-medium text-zinc-400 leading-relaxed"
                delay={50}
                animationFrom={{ opacity: 0, transform: "translate3d(0,50px,0)" }}
                animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
                textAlign="start"
                threshold={0.2}
                rootMargin="-50px" />
            </div>
          ))}
        </div>
      </div></>
);

};

export default SkillsSection;
