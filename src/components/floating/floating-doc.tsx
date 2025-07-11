/* eslint-disable prefer-const */
import { cn } from "@/lib/utils";
import { IconLayoutNavbarCollapse } from "@tabler/icons-react";
import styles from './floating.module.css'
import {
  AnimatePresence,
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import React, { useRef, useState } from "react";
// import title from "process";
// import classNames from "classnames";

interface FloatingDocProps {
    items: {
        title: string;
        icon: React.ReactNode;
        href: string;
    }[],
    desktopClassName?: string;
    mobileClassName?: string;

}

export const FloatingDoc = ({
    items,
    desktopClassName,
    mobileClassName
}: FloatingDocProps) => {
    return (
        <>
            <FloatingDocDesktop items={items} className={desktopClassName} />
            <FloatingDocMobile items={items} className={mobileClassName} />
        </>
    )
}

const FloatingDocMobile = (
    { items, className }: {
        className?: string;
        items: { title: string; href: string; icon : React.ReactNode }[]
    }
) => {

    const [open, setOpen] = useState<boolean>(false);

    const handleClick = (href: string) => {
        window.location.href = href;
        
    }

    return (
      <div className={cn("relative block md:hidden", className)}>
        <AnimatePresence>
          {open && (
            <motion.div
              layoutId="nav"
              className="absolute bottom-full mb-2 inset-x-0 flex flex-col gap-2"
            >
              {items.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{
                    opacity: 0,
                    y: 10,
                    transition: {
                      delay: idx * 0.5,
                    },
                  }}
                  transition={{ delay: (items.length - 1 - idx) * 0.5 }}
                >
                  <div
                    onClick={() => handleClick(item.href)}
                    key={item.title}
                    className="h-10 w-10 rounded-full bg-gray-300 dark:bg-neutral-900 flex items-center justify-center"
                  >
                    <div className="h-4 w-4">{item.icon}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
        <button
          onClick={() => setOpen(!open)}
          className="h-10 w-10 rounded-full bg-gray-300 dark:bg-neutral-800 flex items-center justify-center"
        >
          <IconLayoutNavbarCollapse className="h-5 w-5 text-neutral-600 dark:text-neutral-400" />
        </button>
      </div>
    );
}

const FloatingDocDesktop = ({ items, className }: {
    items: { title: string; icon: React.ReactNode; href: string }[];
    className?: string;
}) => {

    let mouseX = useMotionValue(Infinity);


    return (
      <motion.div
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className={cn(
          "mx-auto hidden md:flex h-16 gap-4 items-end  rounded-2xl bg-gray-600 dark:bg-neutral-900 px-4 pb-3 mt-24",
          "bg-faded/10 dark:bg-neutral-800/50",
          className
        )}
        >
            {
                items.map((item) => (
                    <IconContainer key={item.title} mouseX={mouseX} {...item} />
                ))
            }
      </motion.div>
    );
}

const IconContainer = (
    { title, mouseX, icon, href }: {
        title: string;
        mouseX: MotionValue;
        icon: React.ReactNode;
        href: string;
    }
) => {

    let ref = useRef<HTMLDivElement>(null);

     let distance = useTransform(mouseX, (val) => {
       let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };

       return val - bounds.x - bounds.width / 2;
     });
    let widthTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
    let heightTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);

    let widthTransformIcon = useTransform(
      distance,
      [-150, 0, 150],
      [20, 40, 20]
    );
    let heightTransformIcon = useTransform(
      distance,
      [-150, 0, 150],
      [20, 40, 20]
    );

    let width = useSpring(widthTransform, {
      mass: 0.1,
      stiffness: 150,
      damping: 12,
    });

    let height = useSpring(heightTransform, {
      mass: 0.1,
      stiffness: 150,
      damping: 12,
    });

    let widthIcon = useSpring(widthTransformIcon, {
      mass: 0.1,
      stiffness: 150,
      damping: 12,
    });

    let heightIcon = useSpring(heightTransformIcon, {
      mass: 0.1,
      stiffness: 150,
      damping: 12,
    });

    const [hovered, setHovered] = useState(false);
    const [isSelected, setSelected] = useState('Home'); // Start with no selection

    const handleClick = () => {
        setSelected(title); // Update the state with the current clicked title
        window.location.href = href; // Navigate to the href link
    };
    
    return (
        <div onClick={handleClick}>
            <motion.div
                ref={ref}
                style={{ width, height }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                className="aspect-square rounded-full bg-faded/10 dark:bg-neutral-800 flex items-center justify-center relative border-faded"
            >
                <AnimatePresence>
                    {hovered && (
                        <motion.div
                            initial={{ opacity: 0, y: 10, x: "-50%" }}
                            animate={{ opacity: 1, y: 0, x: "-50%" }}
                            exit={{ opacity: 0, y: 2, x: "-50%" }}
                            className={cn(
                              "mpx-2 py-0.5 whitespace-pre rounded-md dark:bg-neutral-800 dark:border-neutral-300 dark:text-cream text-highlight absolute left-1/2 -translate-x-1/2 -top-6 w-fit text-xs",
                              styles.title
                            )}                
                        >
                            {title}
                        </motion.div>
                    )}
                </AnimatePresence>
    
                {isSelected === title ? (
                    <motion.div
                        style={{ width: widthIcon, height: heightIcon }}
                        className={styles.iconSelected}
                    >
                        {React.cloneElement(icon as React.ReactElement,{color:'#00FF00'})} 
                    </motion.div>
                ) : (
                    <motion.div
                        style={{ width: widthIcon, height: heightIcon }}
                        className={styles.iconGrayscale}
                    >
                        {React.cloneElement(icon as React.ReactElement,{color:'#fff'})}
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
    
}