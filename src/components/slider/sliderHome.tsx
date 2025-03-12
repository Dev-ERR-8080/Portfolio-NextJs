import { InfiniteSlider } from '@/components/slider/sliderMain';
import Styles from './slideHome.module.css';
import {  motion } from 'framer-motion';
import { useEffect, useState } from 'react';
//import { backIn } from 'framer-motion';
// import BackgroundZoom from '../animation/backgroundAnimate/backgroundZoonOut';

export function InfiniteSliderBasic() {
  const [isLoaded, setIsLoaded] = useState(false);
  const itemVariants = {
    hidden: { opacity: 0, y: 20},
    visible: { opacity: 1, y: 0},
  };
  useEffect(() => {
    const loadTimer = setTimeout(() => {
      setIsLoaded(true); // Trigger animation once the component is loaded
    }, 1200); // Adjust the delay as needed

    return () => clearTimeout(loadTimer); // Cleanup the timer on unmount
  }, []);
  return (
    <motion.div
    initial="hidden"  // Initial animation state
    animate={isLoaded?"visible" : "hidden"}  // Animation state after component mounts
    transition={{ staggerChildren: 0.5, duration: 0.3 }} // Delays between items and duration of animation
  >
    <motion.div className={Styles.sliderContainer} variants={itemVariants}>
      {/* Wrap the InfiniteSlider with a motion.div for animation */}
      
        <InfiniteSlider className={Styles.main}>
          {/* Individual items can also have animations */}
          <motion.div className={Styles.content} variants={itemVariants}>
            <p className={Styles.context}>Web Developer</p>
          </motion.div>

          <motion.div className={Styles.content} variants={itemVariants}>
            <p className={Styles.context}>Artificial Intelligence</p>
          </motion.div>

          <motion.div className={Styles.content} variants={itemVariants}>
            <p className={Styles.context}>Software Engineering</p>
          </motion.div>

          <motion.div className={Styles.content} variants={itemVariants}>
            <p className={Styles.context}>UI/UX</p>
          </motion.div>

        </InfiniteSlider>
      
      
      </motion.div>
    </motion.div>
  );
}
