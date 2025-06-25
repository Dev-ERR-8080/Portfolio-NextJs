// pages/selected.tsx
import React from "react";
import CircleNav from "@/components/circleNav/circleNav";
import { Floating } from "@/components/floating/floating";
import ProjectEmbedCard from "@/components/embadedcards/ProjectEmbedCard";
export default function Work() {
 
  return (
    <main className="h-screen overflow-y-scroll snap-y snap-mandatory relative z-10 scroll-m-0">
       {/* Global background texture overlay */}
       <div className="fixed inset-0 bg-[url('/texture.jpg')] bg-repeat opacity-40 pointer-events-none "></div>
       <div className="fixed top-0 left-0 w-full h-20 z-40 pointer-events-none bg-gradient-to-t from-transparent via-transparent to-black"></div>
       <div className="fixed bottom-0 left-0 w-full h-20 z-40 pointer-events-none bg-gradient-to-t from-black via-transparent to-transparent"></div>

        <h1 className="absolute right-8 top-5 text-[0.8vw] font-light  text-white mix-blend-difference">
          CLOSE
        </h1>

        <section className="h-screen snap-start bg-black text-white flex items-center text-4xl font-bold">
          <h1 className="absolute top-[8vw] left-[5vw] padding-[15px] font-[Havock]  text-[3vw] font-extrabold tracking-wider text-white mix-blend-difference  ">
            Kanishka Dhaba
          </h1>
          <p className="font-sans font-light text-left text-[1.5vw] max-w-[30%]"> 
            Welcome to the Work Page! Here, you can explore my projects and skills.Developed a responsive and interactive restaurant website using React.js and Tailwind CSS, focusing on delivering a seamless user experience for browsing food items, managing a shopping cart, and placing orders. The frontend integrates with Firebase Authentication for secure login, Dialogflow for chatbot interaction, and Razorpay for real-time payments.
            Designed the entire UI with reusable React components and state management using Redux, ensuring smooth cart and order functionality. Special attention was given to mobile responsiveness, user accessibility, and clean visual aesthetics using 21st.dev components.
          </p>
          
          <div className="p-6 md:p-12 bg-black space-y-10 w-full">
            <ProjectEmbedCard
              title="🍽️ Kanishka Dhaba"
              liveUrl="https://kanishkadhabahnk.vercel.app/"
              embedHeight={500}
            />
          </div>

        </section>
        <div className="fixed right-10 bottom-10  size-fit"> 
          <CircleNav />
        </div>


      <section className="h-screen snap-start bg-black text-[#45FF17] flex flex-col items-center justify-center text-3xl">
        <p>🔥 Full Stack Dev</p>
        <p>🚀 Scroll Smoothly with Lenis</p>
      </section>

      <section className="h-screen snap-start bg-[#141414] text-white flex flex-col items-center justify-center text-2xl">
        <p>Lambo Sian 3D Showcase</p>
        <p className="text-[#45FF17] mt-2">Visualize Yourself as a Supercar 💨</p>
      </section>

      <section className="h-screen snap-start bg-gray-900 text-white flex items-center justify-center text-4xl">
        ✨ Lets Build Something Cool!
      </section>
      {/* Floating Items */}
      <div className="fixed bottom-6 left-0 right-0 flex justify-center items-center z-50">
        <Floating />
      </div>
    </main>
  );
}
