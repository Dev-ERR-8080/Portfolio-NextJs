// import React from "react";
// import BackgroundZoom from "../components/animation/backgroundAnimate/backgroundZoonOut";
// import DarkOverlay from "../components/animation/backgroundAnimate/darkOverlay";
// import TimeComponent from "@/components/time/timeComponent";
// import { TextEffectWithCustomDelay } from "@/components/TextAnimate/textAnimate";
// import { InfiniteSliderBasic } from "@/components/slider/sliderHome";
// import './Landingpage.module.css';
// import { Floating } from "@/components/floating/floating";
// import { RetroGrid } from "@/components/RetroGrid/retroGrid";

// const Landingpage: React.FC = () => {
//   return (
//     <div className="relative w-full h-screen overflow-hidden">
//       {/* Background Animation */}
//       <BackgroundZoom />
//       <RetroGrid />
//       <DarkOverlay />

//       {/* Main Content - Grid layout that divides the height equally */}
//       <div className="absolute top-0 left-0 right-0 bottom-0 z-5   h-full">
//         {/* Time Component */}
//         <div className="flex justify-center items-center "> {/* Flex for centering */}
//           <TimeComponent />
//         </div>

//         {/* Text Animation */}
//         <div className="flex justify-center items-center "> {/* Flex for centering */}
//           <TextEffectWithCustomDelay />
//         </div>

//         {/* Infinite Slider */}
//         <div className="flex justify-center items-center ">
//           <InfiniteSliderBasic />
//         </div>
//         <div className="flex justify-center items-center ">
//             <Floating />
//         </div>
       
//       </div>
//     </div>
//   );
// };

// export default Landingpage;
//responsive
import React from "react";
import BackgroundZoom from "../components/animation/backgroundAnimate/backgroundZoonOut";
import DarkOverlay from "../components/animation/backgroundAnimate/darkOverlay";
import TimeComponent from "@/components/time/timeComponent";
import { TextEffectWithCustomDelay } from "@/components/TextAnimate/textAnimate";
import { InfiniteSliderBasic } from "@/components/slider/sliderHome";
import "./Landingpage.module.css";
import { Floating } from "@/components/floating/floating";
import { RetroGrid } from "@/components/RetroGrid/retroGrid";

const Landingpage: React.FC = () => {
  return (
    <div className="relative w-full min-h-screen overflow-x-hidden overflow-y-auto">
      {/* Background Animation */}
      <BackgroundZoom />
      <RetroGrid />
      <DarkOverlay />

      {/* Main Content */}
      <div className="absolute top-0 left-0 right-0 bottom-0 z-5 flex flex-col items-center justify-start px-4 sm:px-8 md:px-16 gap-10 py-10">
        
        {/* Time Component */}
        <div className="w-full max-w-4xl flex justify-center items-center">
          <TimeComponent />
        </div>
        
        {/* Theme Toggle Button */}
        {/* <div className="absolute right-5 top-5 flex justify-end items-center mb-4">
          <ThemeToggleButton />
        </div> */}
        
        {/* Text Animation */}
        <div className="w-full max-w-4xl flex justify-center items-center text-center">
          <TextEffectWithCustomDelay />
        </div>

        {/* Infinite Slider */}
        <div className="w-full max-w-4xl flex justify-center items-center">
          <InfiniteSliderBasic />
        </div>

        {/* Floating Items */}
        <div className="w-full max-w-4xl flex justify-center items-center">
          <Floating />
        </div>
        
      </div>
    </div>
  );
};

export default Landingpage;
