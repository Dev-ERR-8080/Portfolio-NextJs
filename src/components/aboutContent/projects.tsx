// import { BoxReveal } from "../ui/boxRevel";

// const ProjectBasic= () => {
//   return (
//     <div className="size-full max-w-lg items-center justify-center overflow-hidden pt-8 ">
//       <BoxReveal boxColor={"#5046e6"} duration={0.5}>
//         <h1 className="text-[clamp(1.6rem,4vw,3rem)] leading-[1.5] font-bold text-[#45FF17] ">
//           Project
//         </h1>
//       </BoxReveal>

//       <BoxReveal boxColor={"#5046e6"} duration={0.5}>
//         <h2 className="mt-[.5rem] text-[1rem] text-lg sm:text-xl font-semibold text-white underline">
//           Kanishka Dhaba – Automated Restaurant Website (MERN Stack)
//         </h2>
//       </BoxReveal>

//       <BoxReveal boxColor={"#5046e6"} duration={0.5}>
//         <div className="mt-6">
//           <p>
//             -&gt; 20+ free and open-source animated components built with
//             <span className="font-semibold text-[#5046e6]">React</span>,
//             <span className="font-semibold text-[#5046e6]">Typescript</span>,
//             <span className="font-semibold text-[#5046e6]">Tailwind CSS</span>,
//             and
//             <span className="font-semibold text-[#5046e6]">Motion</span>
//             . <br />
//             -&gt; 100% open-source, and customizable. <br />
//           </p>
//         </div>
//       </BoxReveal>

//       <BoxReveal boxColor={"#5046e6"} duration={0.5}>
//         <button className="mt-[1.6rem] bg-[#5046e6]">Explore</button>
//       </BoxReveal>
//     </div>
//   );
// }
// export default ProjectBasic;

import { BoxReveal } from "../ui/boxRevel";
import Image from "next/image";
import packYourBags from "../../../public/pack_your_bags2.png";
import kanishkaDhaba from "../../../public/kanishka_dhaba.png";
import {useRouter} from "next/router";

const ProjectBasic = () => {
  const router=useRouter();
  const handleExploreClick = () => {
    router.push("/work");
  }
  
  return (
    <div className="">
      <BoxReveal boxColor={"#5046e6"} duration={0.5}>
        <h1 className="text-[clamp(2vw,4vw,8vw)] leading-[1.5]  text-[#45FF17] font-extrabold tracking-tight mix-blend-difference z-1">
          Projects
        </h1>
      </BoxReveal>
      <div className="size-full max-w-screen-2xl items-center justify-center overflow-hidden pt-8 ">
        <BoxReveal boxColor={"#5046e6"} duration={0.5}>
          <div className="flex flex-row items-center justify-space-between gap-[50px]">
            <div>
              <Image src={kanishkaDhaba} alt="Portrait" width={520} className="rounded-lg object-cover mx-auto" />  
            </div>
            <div className="mt-6 text-white  leading-relaxed border-b-[0.5px] pb-4">
              <h2 className="mt-[.5rem] text-[1rem] text-2xl sm:text-2xl font-semibold text-white mb-4">
              🍕 Kanishka Dhaba – Automated Restaurant Website (MERN Stack)
              </h2>
              <p className="mb-2 text-zinc-400">
                ➤ Developed a restaurant booking & ordering system with a smooth, responsive UI.
              </p>
              <p className="mb-2 text-zinc-400">
                ➤ Integrated <span className="font-semibold text-[#45ff17d0]">Dialogflow</span> chatbot for automated queries and 
                <span className="font-semibold text-[#45ff17d0]"> Razorpay</span> for secure payment processing.
              </p>
              <p className="text-zinc-400">
                ➤ Optimized for seamless restaurant operations and enhanced customer interaction.
              </p>
            </div>
          </div>
        </BoxReveal>

        
      </div>
      <div className="size-full max-w-screen-2xl items-center justify-center overflow-hidden pt-8 border-b-[0.5px] pb-4">
        {/* Project: Kanishka Dhaba */}

        <BoxReveal boxColor={"#5046e6"} duration={0.5}>
          <div className="flex flex-row items-center justify-space-between gap-[50px]">
            <div className="mt-6 text-white leading-relaxed">
                <h2 className="mt-[.5rem] text-[1rem] text-2xl sm:text-2xl font-semibold text-white mb-4 ">
                🧳 PackYourBags – Virtual Trip Assistant
                </h2>
                <p className="mb-2 text-zinc-400">
                  ➤  Designed a travel assistant website to help users discover top destinations.
                </p>
                <p className="mb-2 text-zinc-400">
                  ➤ Integrated <span className="font-semibold text-[#45ff17d0]">openweathermap </span> api for real-time weether updates and 
                  <span className="font-semibold text-[#45ff17d0]"> artificial intelligence </span> for enhanced recommendations.
                </p>
                <p className="text-zinc-400">
                  ➤ Provides details on emergency contacts, transportation, and travel tips for a seamless experience.
                </p>
            </div>
            <div>
              <Image src={packYourBags} alt="Portrait" width={520} className="rounded-lg object-cover mx-auto" />  
            </div>
          </div>
        </BoxReveal>

        
      </div>
      <BoxReveal boxColor={"#5046e6"} duration={0.5}>
          <button className="mt-[1.6rem] bg-[#5046e6] px-6 py-2 text-white font-medium rounded hover:bg-[#3f3bd4] transition duration-300" onClick={handleExploreClick}>
            Explore Projects
          </button>
        </BoxReveal>
    </div>
    
  );
};

export default ProjectBasic;
