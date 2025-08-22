// import React, { useState } from "react";
// import { useRouter } from "next/router";

// import CircularText from "./CircularText";
// import { on } from "events";
// type Props={
//   onClick: () => void;
// }
// const NavigationDial = ({ onClick }: Props) => {
//   const router = useRouter();
//   const [triggerSpin, setTriggerSpin] = useState(false);
//   const [spinDuration, setSpinDuration] = useState(20);

//   const handleClick = () => {
//     // Trigger quick spin
    
//     setSpinDuration(1);
//     setTriggerSpin((prev) => !prev);

//     // Navigate after spin
//     setTimeout(() => {
//       router.push("/next"); // Change to your actual next page
//     }, 1000); // matches spinDuration
//   };

//   return (
//     <div className="relative w-[150px] h-[150px] flex items-center justify-center">
//       {/* Rotating Circular Text */}
//       {/* <CircularText
//         key={triggerSpin ? "spin-1" : "spin-0"} // Force re-render to restart animation
//         text="LISTEN TO THE NEXT PROJECT • NEXT •"
//         spinDuration={spinDuration}
//         onHover="pause"
//         className="text-orange-500 "
//       /> */}

//       {/* Center Button */}
//       <button
//         onClick={onClick}
//         className="absolute z-100  text-white  rounded-full hover:scale-110 transition duration-300"
//       >
//         <img src="./arrow_orange.png" alt="arrow_right" height={15} width={80} />
//       </button>
//     </div>
//   );
// };

// export default NavigationDial;



import React, { useState } from "react";
import CircularText from "./CircularText";

type Props = {
  onClick: () => void;
  
};

const NavigationDial = ({ onClick  }: Props) => {
  const [triggerSpin, setTriggerSpin] = useState(false);
  const [spinDuration, setSpinDuration] = useState(10); // in seconds
  
  const handleClick = () => {
    // 1. Trigger the spin
    setTriggerSpin(false);

    // 2. Trigger the passed in logic (e.g., vaporize nextText)
    onClick();

    // 3. Set spin duration to 20 seconds for the full spin
    

    // 4. Reset spin after duration to allow repeat clicking
    setTimeout(() => setTriggerSpin(false), spinDuration * 1000);
  };

  return (
    <div className="relative z-10 w-[150px] h-[150px] flex items-center justify-center">
      
      {/* Optional: Circular text spinner */}
      {/* <CircularText
        key={triggerSpin ? "spin-1" : "spin-0"} // re-renders to trigger CSS spin
        text="LISTEN TO THE NEXT PROJECT • NEXT •"
        spinDuration={spinDuration}
        onHover="pause"
        className="text-orange-500"
      /> */}

      {/* Spinning Button with Image */}
      <button
        
        onClick={handleClick}
        className={`absolute z-10 rounded-full transition duration-300 hover:scale-110  
          ${triggerSpin ? "animate-spin-snap" : ""}
        `}
      >
        <img src="/arrow_orange.png" alt="arrow_right" height={50} width={50} />
      </button>
    </div>
  );
};

export default NavigationDial;
