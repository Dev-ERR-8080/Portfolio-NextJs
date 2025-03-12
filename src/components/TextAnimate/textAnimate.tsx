import React, { useEffect, useState } from 'react';
import { TextEffect } from '@/components/TextAnimate/textAnimateMain';
import  styles  from './textAnimate.module.css';

// import { div } from 'framer-motion/m';
export function TextEffectWithCustomDelay() {
    const [isClient, setIsClient] = useState(false);

      
    useEffect(() => {
      setIsClient(true);
    }, []);
  
    if (!isClient) return null;
  
  return (
    <div className={styles.main}>
    <div className={styles.subcontainer}>
     
      <TextEffect
       className={styles.first}
        per='char'
        delay={1}
        variants={{
          container: {
            hidden: {
              opacity: 0,
            },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.05,
              },
            },
          },
          item: {
            hidden: {
              opacity: 0,
              rotateX: 90,
              y: 10,
            },
            visible: {
              opacity: 1,
              rotateX: 0,
              y: 0,
              transition: {
                duration: 0.2,
              },
            },
          },
        }}
      >
        Preetham
      </TextEffect>
      <TextEffect className={styles.second} per='char' delay={1.5}
      variants={
        {
            container: {
                hidden: {
                  opacity: 0,
                },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.05,
                  },
                },
              },
              item: {
                hidden: {
                  opacity: 0,
                  rotateX: 90,
                  y: 10,
                  x: 25
                },
                visible: {
                  opacity: 1,
                  rotateX: 0,
                  y: 0,
                  x: 0,
                  transition: {
                    duration: 0.2,
                  },
                },
              },
        }
      }
      >
        Reddy
      </TextEffect>
      
    </div>
    </div>
  );
}
