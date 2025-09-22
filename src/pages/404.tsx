import React from "react";
import FuzzyText from "@/components/404/FuzzyText"; // Adjust the path as needed
import { Floating } from "@/components/floating/floating";
const NotFoundPage = () => {
    return (
      <div className="w-screen h-screen flex flex-col item-center justify-center gap-y-4 bg-[#18181b] text-white  ">
        <div className="flex items-center justify-center h-25 ">
            <FuzzyText baseIntensity={0.2} hoverIntensity={0.25} enableHover={true}>
                404
            </FuzzyText>
        </div>
        <div  className="flex items-center justify-center h-25 ">
          <FuzzyText baseIntensity={0.1} hoverIntensity={0.25} enableHover={true} fontSize={35} fontWeight={400}>
              NOT FOUND
          </FuzzyText>
        </div>
        <div className="fixed bottom-6 left-0 right-0 flex justify-center items-center z-50">
            <Floating />
        </div>
      </div>
    );
};

export default NotFoundPage;
