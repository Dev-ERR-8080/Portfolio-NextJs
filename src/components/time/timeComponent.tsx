import { useState, useEffect } from 'react';
import styles from './timeComponent.module.css'; // Import your CSS module
import { motion } from 'framer-motion';

const TimeComponent: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [isLoaded, setIsLoaded] = useState(false); // State to track if the component is loaded

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // Update the time every second

    return () => clearInterval(timer); // Cleanup the interval on component unmount
  }, []);

  // Simulate component loading effect
  useEffect(() => {
    const loadTimer = setTimeout(() => {
      setIsLoaded(true); // Trigger animation once the component is loaded
    }, 1200); // Adjust the delay as needed

    return () => clearTimeout(loadTimer); // Cleanup the timer on unmount
  }, []);

  // Format time to 24-hour format
  const formattedTime = currentTime.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <motion.div
      initial="hidden"
      animate={isLoaded ? 'visible' : 'hidden'} // Trigger animation after the component has loaded
      transition={{ staggerChildren: 0.5, duration: 1.2, delay: 1.5 }}
    >
      <motion.div className={styles.component} variants={itemVariants}>
        <div className={styles.timeContainer}>
          <h2 className={styles.location}>
            India <span style={{ marginRight: 3 }}> ✧ </span>
          </h2>
          <p className={styles.time}>{formattedTime}</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TimeComponent;
