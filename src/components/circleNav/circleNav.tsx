// import { useRouter } from "next/router";
// import { useEffect, useState } from "react";
// import { FaForward } from "react-icons/fa"; // Forward icon
// import CircularText from "./CircularText";

// export default function RotatingDial() {
//   const router = useRouter();
//   const [rotation, setRotation] = useState(0);

//   const handleClick = () => {
//     // Rotate on click
//     setRotation((prev) => prev + 90); // 90 deg per click
//     // Navigate to the next page (replace with your logic)
//     setTimeout(() => {
//       router.push("/"); // Change this to your actual route
//     }, 300); // small delay for animation
//   };

//   return (
//     <div className="relative w-[200px] h-[200px] flex items-center justify-center">
//       {/* Rotating ring */}
//         <div 
//             className="absolute w-full h-full transition-transform duration-500 ease-in-out"
//         >
//             <CircularText
//                 text=" HOME * ABOUT * WORK * PLAY *" 
//                 onHover="pause"
//                 spinDuration={20}
//                 className="custom-class"
                
//             />
//         </div>
//       {/* Center Forward Icon */}
//       <button
//         className="z-10 bg-black text-white p-4 rounded-full hover:scale-105 transition-transform duration-300"
//         onClick={handleClick}
//       >
//         <FaForward size={20} />
//       </button>
//     </div>
//   );
// }

// components/NavigationDial.tsx
import React, { useState } from "react";
import { useRouter } from "next/router";

import CircularText from "./CircularText";

const NavigationDial = () => {
  const router = useRouter();
  const [triggerSpin, setTriggerSpin] = useState(false);
  const [spinDuration, setSpinDuration] = useState(20);

  const handleClick = () => {
    // Trigger quick spin
    setSpinDuration(1);
    setTriggerSpin((prev) => !prev);

    // Navigate after spin
    setTimeout(() => {
      router.push("/next"); // Change to your actual next page
    }, 1000); // matches spinDuration
  };

  return (
    <div className="relative w-[150px] h-[150px] flex items-center justify-center">
      {/* Rotating Circular Text */}
      <CircularText
        key={triggerSpin ? "spin-1" : "spin-0"} // Force re-render to restart animation
        text="LISTEN TO THE NEXT PROJECT • NEXT •"
        spinDuration={spinDuration}
        onHover="pause"
        className="text-orange-500 "
      />

      {/* Center Button */}
      <button
        onClick={handleClick}
        className="absolute z-10  text-white p-4 rounded-full hover:scale-110 transition duration-300"
      >
        <img src="./arrow_orange.png" alt="arrow_right" height={15} width={80} />
      </button>
    </div>
  );
};

export default NavigationDial;
