import React, { useState } from "react";
import CircularText from "./CircularText";
import Image from "next/image";

type Props = {
  onClick: () => void;
  
};

const NavigationDial = ({ onClick  }: Props) => {
  const [triggerSpin, setTriggerSpin] = useState(false);
  const [spinDuration] = useState(10); 
  // const _spinDuration = 2;
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
    <div className="relative w-[150px] h-[150px] flex items-center justify-center" onClick={handleClick}>
      
      {/* Optional: Circular text spinner */}
      <CircularText
        key={triggerSpin ? "spin-1" : "spin-0"} // re-renders to trigger CSS spin
        text="LISTEN TO THE NEXT PROJECT NEXT • "
        spinDuration={spinDuration}
        onHover="pause"
        className="text-orange-500"
      />

      {/* Spinning Button with Image */}
      <button
        onClick={handleClick}
        className={`absolute z-10 rounded-full transition duration-300 hover:scale-110circularNav 
          ${triggerSpin ? "animate-spin-snap" : ""}
        `}
      >
        <Image src="/arrow_orange.png" alt="arrow_right" height={50} width={50} />
      </button>
    </div>
  );
};

export default NavigationDial;
