// import { motion } from "framer-motion";
// import { FloatingDoc } from "./floating-doc";
// import {
//   IconBriefcase,
//   IconHome,
//   IconInfoCircle,
//   IconDeviceGamepad2
  
// } from "@tabler/icons-react";
// import { useEffect, useState } from "react";



// export function Floating() {
//   const [isLoaded, setIsLoaded] = useState(false);
//   const itemVariants = {
//     hidden: { opacity: 0, y: 20},
//     visible: { opacity: 1, y: 0},
//   };
//   useEffect(() => {
//     const loadTimer = setTimeout(() => {
//       setIsLoaded(true); 
//     }, 1200); 
//     return () => clearTimeout(loadTimer); 
//   }, []);
  
//     const links = [
//       {
//         title: "Home",
//         icon: (
//           <IconHome 
//           className="h-full w-full text-neutral-600 dark:text-highlight" 
//           />
//         ),
//         href: "/",
//       },

//       {
//         title: "About",
//         icon: (
//           <IconInfoCircle 
//           className="h-full w-full text-neutral-600 dark:text-neutral-300"
//            />
//         ),
//         href: "/about",
//       },
//       {
//         title: "Work",
//         icon: (
//           <IconBriefcase 
//           className="h-full w-full text-neutral-600 dark:text-neutral-300" 
          
//           />
//         ),
//         href: "/work",
//       },
//       {
//         title: "Play",
//         icon: (
//           <IconDeviceGamepad2 
//           className="h-full w-full text-neutral-600 dark:text-neutral-300 " 
          
//           />
//         ),
//         href: "/play",
//       },

      
//     ];

//     return (
//       <motion.div
//           initial="hidden"  // Initial animation state
//           animate={isLoaded?"visible" : "hidden"}  // Animation state after component mounts
//           transition={{ staggerChildren: 0.5, duration: 0.3 }} // Delays between items and duration of animation
//         >
//         <motion.div className="h-[2rem] " variants={itemVariants} >
//             <FloatingDoc items={links} mobileClassName="translate-y-60 translate-x-40" />
//         </motion.div>
//       </motion.div>
//     )
// }

// Icon highlight logic updated

import { motion } from "framer-motion";
import { FloatingDoc } from "./floating-doc";
import {
  IconBriefcase,
  IconHome,
  IconInfoCircle,
  IconDeviceGamepad2,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export function Floating() {
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();
  const currentPath = router.pathname;
  

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  useEffect(() => {
    const loadTimer = setTimeout(() => {
      setIsLoaded(true);
    }, 1200);
    return () => clearTimeout(loadTimer);
  }, []);

  const links = [
    {
      title: "Home",
      icon: (
        <IconHome
          className={`h-full w-full ${
            currentPath === "/" ? "text-[#45FF17]" : "text-neutral-600 dark:text-neutral-300"
          }`}
        />
      ),
      href: "/",
    },
    {
      title: "About",
      icon: (
        <IconInfoCircle
          className={`h-full w-full ${
            currentPath === "/about" ? "text-[#45FF17]" : "text-neutral-600 dark:text-neutral-300"
          }`}
        />
      ),
      href: "/about",
    },
    {
      title: "Work",
      icon: (
        <IconBriefcase
          className={`h-full w-full ${
            currentPath === "/work" ? "text-[#45FF17]" : "text-neutral-600 dark:text-neutral-300"
          }`}
        />
      ),
      href: "/work",
    },
    {
      title: "Play",
      icon: (
        <IconDeviceGamepad2
          className={`h-full w-full ${
            currentPath === "/play" ? "text-[#45FF17]" : "text-neutral-600 dark:text-neutral-300"
          }`}
        />
      ),
      href: "/play",
    },
  ];

  return (
    <motion.div
      initial="hidden"
      animate={isLoaded ? "visible" : "hidden"}
      transition={{ staggerChildren: 0.5, duration: 0.3 }}
    >
      <motion.div className="h-[2rem]" variants={itemVariants}>
        <FloatingDoc items={links} mobileClassName="translate-y-60 translate-x-40" />
      </motion.div>
    </motion.div>
  );
}


