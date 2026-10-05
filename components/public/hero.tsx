import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { AnimatedElement } from "@/components/motion/animated-elements";
import ScrollReveal from "../../lib/fontAnimation";
import { useContent } from "@/hooks/use-content";

export function Hero() {
  const { data: content = [] } = useContent("Home");
  const heroContent = content.find((item) => item.id === "hero");
  const heroSubtitle = content.find((item) => item.id === "hero-subtitle");
  const images = useMemo(
    () => [
      "https://img.freepik.com/premium-photo/group-young-african-children-linung-up-their-city-home-balcony-smiling-bypassers_875825-151309.jpg?semt=ais_hybrid&w=740&q=80",
      "https://img.freepik.com/premium-photo/group-happy-african-children_14117-556304.jpg?w=360",
      "https://media.easy-peasy.ai/27feb2bb-aeb4-4a83-9fb6-8f3f2a15885e/5624af5b-e408-4df8-ba58-2ef3b6b27382.png",
      "https://invisiblechildren.com/wp-content/uploads/2012/06/img_4584-e1340035855797.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRky1YhNgkna2JHuzaEfyFBN9oDwpjJJT7wMA&s",
      "https://img.freepik.com/free-photo/african-kid-marketplace_23-2151489205.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS59bt-GtCwaDEbgzUtjBy7g-pckjBxI5HwVQ&s",
      "https://images.ladepeche.fr/api/v1/images/view/5c3521ea3e454605d30150bb/large/image.jpg",
    ],
    [],
  );
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveImageIndex((prev) => (prev + 1) % images.length);
    }, 6000);

    return () => window.clearInterval(interval);
  }, [images.length]);

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-16">
      {/* Background Images */}
      <div className="absolute inset-0">
        {images.map((src, idx) => (
          <motion.div
            key={src}
            initial={{ opacity: 0, scale: 1 }}
            animate={{
              opacity: idx === activeImageIndex ? 1 : 0,
              scale: idx === activeImageIndex ? 1.1 : 1,
            }}
            transition={{
              opacity: { duration: 2, ease: "easeInOut" },
              scale: { duration: 4, ease: "easeInOut" },
            }}
            className="absolute inset-0"
          >
            <img
              src={src}
              alt="Children learning in classroom"
              className="object-cover w-full h-full filter brightness-75"
            />
          </motion.div>
        ))}
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-green-900/70"></div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex    flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-12">
          {/* Left: Text */}

          <div className="w-full lg:w-1/2 xl:w-2/3 text-center lg:text-left space-y-6 lg:space-y-8">
            <div className="space-y-3 lg:space-y-4">
              <AnimatedElement variant="slideInLeft">
                <h1
                  style={{ fontFamily: "Quicksand" }}
                  className="text-3xl sm:text-4xl md:text-6xl lg:text-6xl xl:text-7xl font-bold text-white text-balance leading-tight drop-shadow-lg "
                >
                  {heroContent?.content.split(" - ")[0] || "Seeds of Love | Planting Hope & Opportunity"}
                </h1>
              </AnimatedElement>

              <p
                style={{ fontFamily: "Quicksand" }}
                className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-3xl mx-auto lg:mx-0 text-balance drop-shadow-md"
              >
                {heroSubtitle?.content || "Empowering communities through education, nutrition, and sustainable development. One seed at a time."}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2 lg:pt-4">
              <Link href="/contact">
                <Button
                  style={{ fontFamily: "Quicksand" }}
                  size="lg"
                  className="bg-accent hover:bg-accent/90 text-accent-foreground px-6 lg:px-8 text-base lg:text-lg font-semibold w-full sm:w-auto"
                >
                  Get Involved Today
                </Button>
              </Link>
              <Link href="/about">
                <Button
                  style={{ fontFamily: "Quicksand" }}
                  size="lg"
                  className="px-6 lg:px-8 text-base lg:text-lg font-semibold bg-white hover:bg-white/90 text-foreground w-full sm:w-auto"
                >
                  Learn Our Story
                </Button>
              </Link>
            </div>
          </div>

          {/* Right: SVG Elements */}
          <AnimatedElement variant="slideInRight">
            {/* Bigger Svg */}
            <div className="relative hidden sm:block pointer-events-none">
              <div className="relative   w-96 h-96 sm:w-[24rem] sm:h-[24rem] md:w-[28rem] md:h-[28rem] lg:w-[32rem] lg:h-[32rem] xl:w-[36rem] xl:h-[36rem] transform rotate-12 lg:rotate-22 origin-center">
                <svg
                  viewBox="0 0 210 470"
                  className="w-full h-full"
                  aria-hidden="true"
                >
                  <defs>
                    <clipPath id="heroClipPrimary">
                      <path
                        d="M 105 10 L 105 10 A 95 95 0 0 1 200 105 L 200 365 A 95 95 0 0 1 105 460 L 110 460 A 95 95 0 0 1 10 365 L 10 105 A 95 95 0 0 1 105 10 Z"
                        fill="#ffffff"
                      />
                    </clipPath>
                  </defs>

                  <image
                    href="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbRkDcPeRMNf-P2G86stg_2Nu8exmHCzVKgQ&s"
                    width="210"
                    height="470"
                    preserveAspectRatio="xMidYMid slice"
                    clipPath="url(#heroClipPrimary)"
                    opacity="0.95"
                  />

                  <rect
                    width="100%"
                    height="100%"
                    fill="rgba(0,0,0,0.15)"
                    clipPath="url(#heroClipPrimary)"
                  />

                  <path
                    d="M 105 10 L 105 10 A 95 95 0 0 1 200 105 L 200 365 A 95 95 0 0 1 105 460 L 110 460 A 95 95 0 0 1 10 365 L 10 105 A 95 95 0 0 1 105 10 Z"
                    fill="none"
                    stroke="rgba(255,255,255,0.85)"
                    strokeWidth="20"
                  />
                </svg>
              </div>

              <div className="absolute top-1/4 -right-2/6    w-96 h-96 sm:w-[24rem] sm:h-[24rem] md:w-[28rem] md:h-[28rem] lg:w-[32rem] lg:h-[32rem] xl:w-[36rem] xl:h-[36rem] transform rotate-12 lg:rotate-22 origin-center">
                <svg
                  viewBox="0 0 210 470"
                  className="w-full h-full"
                  aria-hidden="true"
                >
                  <defs>
                    <clipPath id="heroClipPrimary">
                      <path
                        d="M 105 10 L 105 10 A 95 95 0 0 1 200 105 L 200 365 A 95 95 0 0 1 105 460 L 110 460 A 95 95 0 0 1 10 365 L 10 105 A 95 95 0 0 1 105 10 Z"
                        fill="#ffffff"
                      />
                    </clipPath>
                  </defs>

                  <image
                    href="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdzijSTUSL4_ZdTI-rd2bfW8du85GAlHwrwA&s"
                    width="210"
                    height="470"
                    preserveAspectRatio="xMidYMid slice"
                    clipPath="url(#heroClipPrimary)"
                    opacity="0.95"
                  />

                  <rect
                    width="100%"
                    height="100%"
                    fill="rgba(0,0,0,0.15)"
                    clipPath="url(#heroClipPrimary)"
                  />

                  <path
                    d="M 105 10 L 105 10 A 95 95 0 0 1 200 105 L 200 365 A 95 95 0 0 1 105 460 L 110 460 A 95 95 0 0 1 10 365 L 10 105 A 95 95 0 0 1 105 10 Z"
                    fill="none"
                    stroke="rgba(255,255,255,0.85)"
                    strokeWidth="20"
                  />
                </svg>
              </div>
            </div>
          </AnimatedElement>
        </div>
      </div>

      <img
        src="/circle-left.png"
        className="absolute hidden sm:inline-block -left-70 top-20 -mr-4"
      />
      <img
        src="/object-1-2.png"
        className="absolute hidden w-70 h-70 sm:inline-block bottom-0 "
      />
    </section>
  );
}
