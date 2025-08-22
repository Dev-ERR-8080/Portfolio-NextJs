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

"use client";

import { BoxReveal } from "../ui/boxRevel";
import Image from "next/image";
import packYourBags from "../../../public/pack_your_bags2.png";
import kanishkaDhaba from "../../../public/kanishka_dhaba.png";
import { useRouter } from "next/router";

const ProjectBasic = () => {
  const router = useRouter();
  const handleExploreClick = () => router.push("/work");

  // Common paragraph style for cleaner reuse
  const paragraphStyle = "text-zinc-400 sm:text-sm md:text-lg lg:text-xl mb-2";

  return (
      <>
      {/* Heading */}
        <BoxReveal boxColor={"#5046e6"} duration={0.5}>
          <h1 className="text-[clamp(2vw,4vw,8vw)] leading-[1.5] text-[#45FF17] font-extrabold tracking-tight mix-blend-difference z-1">
            Projects
          </h1>
        </BoxReveal>
    <div className="space-y-8 px-4 sm:px-12 ">
        {/* Project 1: Kanishka Dhaba */}
        <div className="max-w-screen-2xl pt-8">
          <BoxReveal boxColor={"#5046e6"} duration={0.5}>
            <div className="flex flex-col md:flex-row items-center gap-[50px]">
              <Image
                src={kanishkaDhaba}
                alt="Kanishka Dhaba"
                width={520}
                loading="lazy"
                className="rounded-lg object-cover mx-auto" />

              <div className="mt-6 text-white leading-relaxed border-b-[0.5px] border-gray-500 pb-4">
                <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4">
                  Kanishka Dhaba – Automated Restaurant Website (MERN Stack)
                </h2>
                <p className={paragraphStyle}>
                  ➤ Developed a restaurant booking & ordering system with a smooth, responsive UI.
                </p>
                <p className={paragraphStyle}>
                  ➤ Integrated <span className="font-semibold text-[#45ff17d0]">Dialogflow</span> chatbot for automated queries and
                  <span className="font-semibold text-[#45ff17d0]"> Razorpay</span> for secure payment processing.
                </p>
                <p className={paragraphStyle}>
                  ➤ Optimized for seamless restaurant operations and enhanced customer interaction.
                </p>
              </div>
            </div>
          </BoxReveal>
        </div>

        {/* Project 2: PackYourBags */}
        <div className="max-w-screen-2xl pt-8 border-b-[0.5px] border-gray-500 pb-4">
          <BoxReveal boxColor={"#5046e6"} duration={0.5}>
            <div className="flex flex-col-reverse md:flex-row items-center gap-[50px]">
              <div className="mt-6 text-white leading-relaxed">
                <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4 ">
                  PackYourBags – Virtual Trip Assistant
                </h2>
                <p className={paragraphStyle}>
                  ➤ Designed a travel assistant website to help users discover top destinations.
                </p>
                <p className={paragraphStyle}>
                  ➤ Integrated <span className="font-semibold text-[#45ff17d0]">OpenWeatherMap</span> API for real-time weather updates and
                  <span className="font-semibold text-[#45ff17d0]"> AI </span> for enhanced recommendations.
                </p>
                <p className={paragraphStyle}>
                  ➤ Provides emergency contacts, transport details, and travel tips for a seamless experience.
                </p>
              </div>

              <Image
                src={packYourBags}
                alt="Pack Your Bags"
                width={520}
                loading="lazy"
                className="rounded-lg object-cover mx-auto" />
            </div>
          </BoxReveal>
        </div>

        {/* Explore Button */}
        <BoxReveal boxColor={"#5046e6"} duration={0.5}>
          <div className="text-center mt-10">
            <button
              onClick={handleExploreClick}
              className="bg-[#5046e6] px-6 py-2 text-white font-medium rounded hover:bg-[#3f3bd4] transition duration-300"
            >
              Explore Projects
            </button>
          </div>
        </BoxReveal>
      </div></>
  );
};

export default ProjectBasic;
