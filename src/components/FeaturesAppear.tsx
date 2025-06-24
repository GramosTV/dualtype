

import Feature from "./Feature";
import StaggerBlurOut from "./StaggerBlurOut";

// Register plugin once


interface FeaturesAppearProps {
  delay?: number;
}

const FeaturesAppear: React.FC<FeaturesAppearProps> = () => {
  // const ref = useRef<HTMLDivElement>(null);

  // Using useLayoutEffect instead of useEffect for DOM measurements before paint
  // useLayoutEffect(() => {
  //   if (!ref.current) return;

  //   // Create a context to improve performance
  //   const ctx = gsap.context(
  //     () => {
  //       gsap.fromTo(
  //         "#feature",
  //         {
  //           opacity: 0,
  //           width: "90%",
  //           y: 20,
  //         },
  //         {
  //           opacity: 1,
  //           width: "100%",
  //           y: 0,
  //           duration: 0.5,
  //           stagger: 0.3,
  //           delay,
  //           ease: "power2.out",
  //           scrollTrigger: {
  //             trigger: ref.current,
  //             start: "top bottom-=100",
  //             once: true, // Only trigger once
  //             toggleActions: "play none none none",
  //           },
  //         }
  //       );
  //     },
  //     ref
  //   );

  //   // Cleanup function
  //   return () => ctx.revert();
  // }, [delay]);

  return (
    // <div
    //   ref={ref}
    //   id="features"
    //   className=""
    // >
    <StaggerBlurOut  delay={.5} stagger={.5} className=" md:my-0  w-full h-fit my-[10vh] md:flex-row flex-col flex md:gap-0 gap-[5vh] overflow-hidden">
      <Feature description="combining ergonomic design, and premium craftsmanship.">
        Best Quality
      </Feature>
      <Feature description="our clients are our top priority. we're always here for you.">
        We Stay in Touch
      </Feature>
      <Feature description="Your setup shapes your comfort, productivity, and experience">
        Think About it
      </Feature></StaggerBlurOut>
    // </div>
  );
};

export default FeaturesAppear;
