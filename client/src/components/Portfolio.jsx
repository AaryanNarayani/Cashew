"use client";

import { AnimatePresence, motion, useAnimation } from "framer-motion";
import {
  ArrowLeftIcon,
  BookText,
  Github,
  Layers3,
  Linkedin,
  PlusIcon,
  Twitter,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";


// Default configuration
const defaultPortfolioConfig = {
  firstName: "Aaryan",
  experience: 1,
  domain: "web development",
  role: "engineers",

  bioText: {
    prefix: "Behind every seamless app experience is a world of logic, and for",
    emphasis1: "me",
    midText:
      ",it's all about designing that world with a focus on",
    emphasis2: "efficiency and reliability",
    suffix:
      ".Backend development is where ideas become systems, and systems become solutions. It's the engine that powers innovation.",
  },
  image: "https://avatars.githubusercontent.com/AaryanNarayani",

  colors: {
    bioButton: "bg-orange-600",
    menuButton: "bg-blue-600",
    plusButton: "bg-green-600",
  },
  cvLink: "#",
  layersLink: "https://www.linkedin.com/in/aaryan-narayani/",
  twitterUrl: "https://x.com/aaryan_twts",
  githubLink: "https://github.com/AaryanNarayani",
};

export default function Portfolio({ config = defaultPortfolioConfig }) {
  // State management
  const [isOpen, setIsOpen] = useState(true);
  const [isBio, setIsBio] = useState(false);
  const [isMenu, setIsMenu] = useState(false);

  // Restore animation controls
  const controls = useAnimation();
  const imageControls = useAnimation();
  const plusControls = useAnimation();
  const iconsControls = useAnimation();
  const profileControls = useAnimation();
  const aboutControls = useAnimation();
  const menuControls = useAnimation();

  // Variants (restored to original)
  const containerVariants = {
    closed: { width: "3.75rem", height: "2rem", minWidth: "3.75rem" },
    open: { width: "16rem", height: "3.5rem", minWidth: "16rem" },
    bio: { width: "22.8rem", height: "11.9rem", minWidth: "22rem" },
    menu: { width: "10.25rem", height: "2rem", minWidth: "10.25rem" },
  };

  const aboutVariants = {
    closed: { opacity: 0, scale: 0.5 },
    bio: { opacity: 1, scale: 1 },
  };

  const imageVariants = {
    closed: {
      width: "24px",
      height: "24px",
      translateX: 0,
      opacity: 1,
    },
    open: {
      width: "2.2rem",
      height: "2.2rem",
      translateX: "4px",
      opacity: 1,
    },
    bio: { opacity: 0, translateX: "-3px" },
  };

  const plusVariants = {
    closed: { opacity: 1 },
    open: { opacity: 0 },
  };

  const iconsVariants = {
    closed: { opacity: 0, gap: "2px" },
    open: { opacity: 1, gap: "4px" },
  };

  const profileVariants = {
    closed: {
      scale: 0.5,
      left: "40px",
      opacity: 0,
      filter: "blur(4px)",
      y: "-50%",
    },
    open: {
      scale: 1,
      left: "3.25rem",
      opacity: 1,
      filter: "blur(0)",
      y: "-50%",
    },
  };

  const menuVariants = {
    closed: { opacity: 0, scale: 0, y: "-50%" },
    menu: { opacity: 1, scale: 1, y: "-50%" },
  };

  // Restore original complex animation sequence effect
  useEffect(() => {
    const sequence = async () => {
      const state =
        isOpen && !isBio
          ? "openButBioClosed"
          : isOpen && isBio
            ? "openButBioOpen"
            : isMenu && !isOpen && !isBio
              ? "menuOpened"
              : !isOpen && !isBio
                ? "closedButBioClosed"
                : !isOpen && isBio
                  ? "closedButBioOpen"
                  : null;

      switch (state) {
        case "openButBioClosed": {
          aboutControls.start("closed");
          plusControls.start("open");
          imageControls.start("open");
          menuControls.start("closed");
          await controls.start("open");
          await Promise.all([
            iconsControls.start("open"),
            profileControls.start("open"),
          ]);
          break;
        }
        case "closedButBioClosed": {
          await aboutControls.start("closed");
          menuControls.start("closed");
          await Promise.all([
            profileControls.start("closed"),
            iconsControls.start("closed"),
          ]);
          await Promise.all([
            controls.start("closed"),
            imageControls.start("closed"),
            plusControls.start("closed"),
          ]);
          break;
        }
        case "openButBioOpen": {
          imageControls.start("bio");
          menuControls.start("closed");
          await Promise.all([
            plusControls.start("open"),
            profileControls.start("closed"),
            iconsControls.start("closed"),
          ]);
          await Promise.all([
            controls.start("bio"),
            aboutControls.start("bio"),
          ]);
          break;
        }
        case "menuOpened": {
          await Promise.all([
            imageControls.start("bio"),
            profileControls.start("closed"),
            iconsControls.start("closed"),
          ]);
          await Promise.all([
            controls.start("menu"),
            menuControls.start("menu"),
          ]);
          break;
        }
      }
    };

    sequence();
  }, [
    isOpen,
    controls,
    imageControls,
    plusControls,
    iconsControls,
    profileControls,
    aboutControls,
    isBio,
    isMenu,
    menuControls,
  ]);

  return (
    <div className="flex justify-center items-center bg-transparent">
      <motion.div
        variants={containerVariants}
        initial="closed"
        animate={controls}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="relative flex justify-center items-center bg-black p-3 rounded-[30px] w-[3.75rem] h-8 cursor-pointer"
      >
        <div className="top-1/2 left-1 z-[9999] absolute flex justify-center items-center origin-left transition-all -translate-y-1/2 duration-350 ease-out">
          <motion.div
            variants={imageVariants}
            initial="closed"
            animate={imageControls}
            onClick={() => setIsOpen((prev) => !prev)}
          >
            {config?.image ? (
              <img
                alt="me"
                src={config?.image}
                width={42}
                height={42}
                className="m-0 rounded-full w-full h-full"
              />
            ) : (
              <div className="flex justify-center items-center bg-white rounded-full w-full h-full">
                <h1 className="m-0 text-black text-sm">
                  {config?.firstName?.substring(0, 1)}
                </h1>
              </div>
            )}
          </motion.div>
        </div>

        <motion.div
          variants={plusVariants}
          initial="closed"
          animate={plusControls}
          className="top-1/2 right-1 z-[9999] absolute flex justify-center items-center bg-green-600 opacity-1 rounded-full w-6 h-6 transition-all -translate-y-1/2 duration-350 ease-out hover:rotate-[720deg]"
        >
          <PlusIcon className="text-white" size={16} />
        </motion.div>

        <motion.div
          variants={iconsVariants}
          initial="closed"
          animate={iconsControls}
          className="top-1/2 right-[0.685rem] z-[999] absolute flex items-center gap-1 -translate-y-1/2"
        >
          <div
            onClick={() => {
              setIsBio(true);
            }}
            className="flex justify-center items-center gap-[2px] bg-orange-600 rounded-full size-[36px]"
          >
            <div className="bg-white rounded-full w-[1.5px] h-[4px]" />
            <div className="bg-white rounded-full w-[1.5px] h-[8px]" />
            <div className="bg-white rounded-full w-[1.5px] h-[14px]" />
            <div className="bg-white rounded-full w-[1.5px] h-[5px]" />
            <div className="bg-white rounded-full w-[1.5px] h-[10px]" />
            <div className="bg-white rounded-full w-[1.5px] h-[5px]" />
          </div>
          <div
            onClick={() => {
              setIsMenu(true);
              setIsBio(false);
              setIsOpen(false);
            }}
            className="flex justify-center items-center gap-[3px] bg-blue-600 rounded-full size-[36px]"
          >
            <div className="bg-white rounded-full size-[2.5px]" />
            <div className="bg-white rounded-full size-[2.5px]" />
            <div className="bg-white rounded-full size-[2.5px]" />
          </div>
        </motion.div>

        <AnimatePresence>
          <motion.div
            key="profile"
            variants={profileVariants}
            initial="closed"
            animate={profileControls}
            exit="closed"
            transition={{
              duration: 0.35,
              ease: "easeOut",
            }}
            className="top-1/2 z-[50] absolute flex flex-col origin-left -translate-y-1/2"
          >
            <span className="text-gray-500 text-sm">{"Hello, I'm"}</span>
            <h1 className="m-0 font-normal text-base text-white leading-[16px]">{config?.firstName}</h1>
          </motion.div>
        </AnimatePresence>
        <motion.div
          variants={aboutVariants}
          initial="closed"
          animate={aboutControls}
          onClick={() => {
            setIsBio(false);
          }}
          className="relative flex min-w-[372px] max-sm:min-w-calc max-w-[372px] max-sm:max-w-calc h-[100%] origin-center transition-all duration-350 overflow-hidden ease-out"
        >
          <div className="px-4 w-full h-full overflow-hidden">
            <p className="relative m-0 text-base text-gray-500">
              It&apos;s been{" "}
              <span className="text-white">{config?.experience} years</span> since I got
              into {config?.domain}. I&nbsp;now have clear principles, the main one
              being{" "}
              <span className="text-white">
                “value instead of mindless execution”
              </span>
              . It&apos;s easy to print generic solutions, but what we {config?.role}{" "}
              are hired for is our unique point of view and creative thinking.
              Usability combined with aesthetics is the key to memorable
              and&nbsp;enjoyable products.
            </p>
          </div>
        </motion.div>
        <motion.div
          variants={menuVariants}
          initial="closed"
          animate={menuControls}
          className="top-1/2 left-[0.7rem] z-[9999] absolute origin-center"
        >
          <div className="flex items-center gap-4">
            <div
              onClick={() => {
                setIsMenu(false);
                setIsOpen(true);
              }}
            >
              <ArrowLeftIcon size={16} color="white" />
            </div>
            <Link to={config?.cvLink || "#"}>
              <BookText size={16} color="white" className="rotate-[30deg]" />
            </Link>
            <Link to={config?.twitterUrl || "#"} target="_blank">
              <Twitter size={16} color="white" />
            </Link>
            <Link to={config?.layersLink || "#"} target="_blank">
              <Linkedin size={16} color="white" />
            </Link>
            <Link to={config?.githubLink || "#"} target="_blank">
              <Github size={16} color="white" />
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}