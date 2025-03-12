import { cn } from "@/lib/utils";
import styles from './retroGrid.module.css'
export function RetroGrid({
  
  angle = 180,
  
}: {
  className?: string;
  angle?: number;
  theme?: "dark" ;  // Restrict to 'light' or 'dark'
}) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute size-full overflow-hidden opacity-50 [perspective:200px] [height:100vh] z-index-[2]",
        styles.content
      )}
      style={{ "--grid-angle": `${angle}deg` } as React.CSSProperties}
    >
      {/* Grid */}
      <div className="absolute inset-0 [transform:rotateX(var(--grid-angle))]">
        <div
          className={cn(
            "animate-grid",
            "[background-repeat:repeat] [background-size:250px_250px] [height:300vh] [inset:0%_0px] [margin-left:-230px] [transform-origin:100%_0_0] [width:600vw]",
            // Light Styles
            "[background-image:linear-gradient(to_right,rgba(229,228,226,0.3)_1px,transparent_0),linear-gradient(to_bottom,rgba(229,228,226,0.3)_1px,transparent_0)]",
            // Dark styles
            //"dark:[background-image:linear-gradient(to_right,rgba(255,255,255,0.3)_1px,transparent_0),linear-gradient(to_bottom,rgba(255,255,255,0.3)_1px,transparent_0)]",
          )}
        />
      </div>
    </div>
  );
}
