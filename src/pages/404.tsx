import React from "react";
import FuzzyText from "@/components/404/FuzzyText"; // Adjust the path as needed

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
      </div>
    );
};

export default NotFoundPage;
