"use client";

import FeatureCard from "./components/FeatureCard";
import MemberCard from "./components/MemberCard";
import Navbar from "./components/NavBar";
import TileBackground from "./components/TileBackground";
import {
  DottedGrid,
  UpwardArrow,
  ZebraLines,
  Cog01,
  Cog02,
  Cog03,
} from "./components/Artifacts";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div>
      <TileBackground>
        <Navbar />
        <div className={`flex flex-col items-center justify-center`}>
          <TitleSection />
          <FeatureSection />
          <AboutSection />
          <ContributeSection />
          <Footer />
        </div>
      </TileBackground>
    </div>
  );
}

function TitleSection() {
  return (
    <div
      className={`scroll-mt-[-16] relative w-full flex flex-col items-center justify-center min-h-screen`}
    >
      {/* ARTIFACTS */}
      <div className={`hidden md:block`}>
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className={`absolute bottom-[5%] left-[25%] w-30 h-30`}
        >
          <DottedGrid />
        </motion.div>

        <motion.div
          animate={{ x: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className={`absolute bottom-[25%] right-[5%] w-30 h-30`}
        >
          <DottedGrid />
        </motion.div>

        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          className={`absolute bottom-[25%] left-[10%] w-20 h-20`}
        >
          <UpwardArrow />
        </motion.div>

        <div className={`absolute top-[15%] left-[5%] w-35 h-35`}>
          <ZebraLines />
        </div>

        <motion.div
          animate={{ rotate: 120 }}
          transition={{
            repeat: Infinity,
            duration: 6,
            ease: "linear",
            // repeatDelay: 8,
          }}
          style={{ transformOrigin: "center center" }}
          className={`absolute top-[15%] right-[10%] w-20 h-20 flex items-center justify-center`}
        >
          <Cog01 />
        </motion.div>

        <motion.div
          animate={{ rotate: 120 }}
          transition={{
            repeat: Infinity,
            duration: 10,
            /*delay: 8,
            repeatDelay: 8,*/
            ease: "linear",
          }}
          style={{ transformOrigin: "center center" }}
          className={`absolute top-[25%] right-[8%] w-15 h-15 flex items-center justify-center`}
        >
          <Cog02 />
        </motion.div>

        <motion.div
          animate={{ rotate: -120 }}
          transition={{
            repeat: Infinity,
            // delay: 4,
            // repeatDelay: 8,
            duration: 8,
            ease: "linear",
          }}
          style={{ transformOrigin: "center center" }}
          className={`absolute top-[20%] right-[5%] w-10 h-10 flex items-center justify-center`}
        >
          <Cog03 />
        </motion.div>
      </div>

      {/* ARTIFACTS */}
      <div
        className={`
          relative
          font-bold text-5xl md:text-7xl lg:text-9xl 
          flex flex-col items-center justify-center`}
      >
        <h1>The Perfect</h1>
        {/* TODO: Add hover effect, change it to C0deB00k and create an underline */}
        <h1
          className={`
          inline-block
          bg-[linear-gradient(currentColor,currentColor)]
          bg-size-[0%_5px]
          bg-bottom-left
          bg-no-repeat
          transition-[background-size]
          duration-300
          hover:bg-size-[100%_5px]
        `}
        >
          CodeBook
        </h1>
        <h1>Made Simple</h1>
      </div>
      <p className="mt-10 mb-10 text-md md:text-lg lg:text-xl max-w-4xl text-center text-gray-600">
        Easily generate codebooks from Github repositories or bring your own
        code. Spend more time using the codebook than creating it!
      </p>
      <GetStartedButton />
    </div>
  );
}

function GetStartedButton() {
  const handleClick = () => {
    console.log("Button Beep boop");
  };

  return (
    <div>
      <a
        onClick={handleClick}
        className={`
        group
        flex items-center gap-2 
        bg-black text-white text-sm 
        py-2 px-4 m-5
        rounded-lg hover:cursor-pointer
        ring-4 ring-gray-400
        transition-all duration-200
        active:scale-95
      `}
      >
        Get Started
        <img
          src="/next-arrow.svg"
          className={`
            invert brightness-0
            group-hover:animate-arrow-ping
          `}
          height={25}
          width={25}
        ></img>
      </a>
    </div>
  );
}

function FeatureSection() {
  return (
    <div
      id="feature"
      className={`flex flex-col items-center justify-center mb-5 scroll-mt-32`}
    >
      <h3 className={`text-3xl font-bold mb-5`}>Our Features</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
        <FeatureCard
          title={`Code Fetching`}
          subtitle={`Easily fetch codes from Github Repositories`}
          icon_src={`icons/git-fetch.svg`}
        />
        <FeatureCard
          title={`Syntax Highlighting`}
          subtitle={`Increase code comprehension with beautiful colors in the PDF`}
          icon_src={`icons/eye-dropper.svg`}
        />
        <FeatureCard
          title={`Easy Collaboration`}
          subtitle={`Collaborate with your teammates and keep track of modifications. No more guess works.`}
          icon_src={`icons/team-plus.svg`}
        />
        <FeatureCard
          title={`Import & Export`}
          subtitle={`Your work stays with you. Online or offline. You are in control of your data.`}
          icon_src={`icons/file-upload.svg`}
        />
      </div>
    </div>
  );
}

function AboutSection() {
  return (
    <div
      id="about"
      className={`scroll-mt-32 flex flex-col gap-5 items-center justify-center w-full p-12 m-8 bg-white/0 backdrop-blur-xs`}
    >
      <h3 className={`text-2xl font-bold mb-4`}>About Us</h3>
      <p className={`max-w-3xl text-center  px-4`}>
        Hey there, We are <b>Team MARS!</b> Our team is made up of 4 highly
        caffeinated individuals with a goal to making competitive programming
        easier and more accessible to a wider group of people.
      </p>
      <div className={`grid grid-cols-1 m-2 lg:grid-cols-2 gap-5`}>
        <MemberCard
          image={"members/muhimen.png"}
          name={"Al Muhimen"}
          position={"Team Lead"}
          quote={`"Duniya tai ekta binary search"`}
          linkedin={`https://www.linkedin.com/in/al-muhimen-118588356/`}
          github={`https://github.com/Muhimen123`}
          fb={`https://www.facebook.com/al.muhimen/`}
        />

        <MemberCard
          image={"members/asif.png"}
          name={"Asif Rahman"}
          position={"Member"}
          quote={`No motivation but still works hard`}
        />

        <MemberCard
          image={"members/sameen.png"}
          name={"Sameen Abrar"}
          position={"Member"}
          quote={`Loves games and foods`}
        />

        <MemberCard
          image={"members/rashed.png"}
          name={"Rashedul Islam"}
          position={"Member"}
          quote={`Dengue patient`}
        />
      </div>
    </div>
  );
}

function ContributeSection() {
  return (
    <div
      id="contribute"
      className={`scroll-mt-100 flex flex-col items-center justify-center w-full p-12 m-8 bg-white/0 backdrop-blur-xs`}
    >
      <h3 className={`text-2xl font-bold mb-4`}>Contribute</h3>
      <p className={`max-w-3xl text-center text-gray-700 px-4`}>
        Our software is completely open-source. We hope to see people using our
        code as a base to create custom solutions tailored to their needs. Our
        GitHub repository is open for community contribution. Visit the
        repository to learn how you can contribute to the project.
      </p>
    </div>
  );
}

function Footer() {
  const handleClick = () => {
    window.open("https://github.com/Muhimen123/SuperSnippets", "_blank");
  };
  return (
    <footer className="w-full bg-black text-white mt-8">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex flex-col items-center gap-6">
          <nav className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <a href="#about" className="text-white/80 hover:text-white">About</a>
            <a href="#feature" className="text-white/80 hover:text-white">Features</a>
            <a href="#about" className="text-white/80 hover:text-white">Team</a>
            <a onClick={handleClick} className="cursor-pointer ml-2 inline-block bg-white text-black px-4 py-1 rounded-full">Contact Us</a>
          </nav>

          <div className="w-full border-t border-white/10 mt-4 pt-4 text-center text-xs text-white/60">
            © {new Date().getFullYear()} Team MARS. All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
