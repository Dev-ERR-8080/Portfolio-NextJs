import { motion } from "framer-motion"
import { AuroraBackground } from "../ui/aurora-background"
import Portrait from '../../../public/ai_generated.png'
import ShinyText from "../shinytext/shinytext"
import Image from "next/image"

const AboutMain=()=>{
    return (
        <AuroraBackground>
          <motion.div
            initial={{ opacity: 0.0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="flex flex-row gap-[45px] justify-center items-center m-[15px] "
          >
            {/* Left Content */}
            
            <div className="relative flex flex-col gap-y-4 justify-center px-4 self-start ml-30">      
              {/* Heading */}
              <div className="text-lg md:text-4xl font-light dark:text-[#565449]">
                <ShinyText text="//Who Am I?" disabled={false} speed={3} />
              </div>
      
              <div className="flex flex-col items-start text-[#b4b4b4] gap-y-3">
                <div className="text-6xl font-bold uppercase tracking-[1em] leading-[3rem]">
                Building
                </div>
      
                <div className="flex items-center ">
                  <div className="text-6xl font-extrabold uppercase leading-tight flex flex-col gap-y-2">
                    <span className="tracking-[0.4em] leading-[3rem]">Impactful</span>
                    <span className="tracking-[0.45em] leading-[3rem]">Seamless </span>
                  </div>
                  <div className="text-[8rem] leading-none font-extrabold text-[#45FF17]">&</div>
                </div>
      
                <div className="text-6xl  font-bold uppercase tracking-[0.03em] leading-[3rem]">
                  <h1 className="inline-block transform origin-bottom-right">Digital Experiences</h1>
                </div>
              </div>
      
              {/* Subheading */}
              <h1 className="text-xl font-medium tracking-[0.17em] text-gray-700 uppercase text-left ">
                Crafting Engaging & Intelligent Web Interfaces
              </h1>
            </div>
      
            {/* Right Image */}
            <div className="relative flex justify-center items-center overflow-hidden opacity-100 max-h-[348px] ">
              <Image src={Portrait} alt="Portrait" width={460} className="rounded-lg object-cover mx-auto" priority={true} />
            </div>

          </motion.div>
        </AuroraBackground>
    )
}
export default AboutMain;