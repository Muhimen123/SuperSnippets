"use client";

import FeatureCard from "./components/FeatureCard";
import MemberCard from "./components/MemberCard";
import Navbar from "./components/NavBar";
import TileBackground from "./components/TileBackground";
import {DottedGrid} from "./components/Artifacts"

export default function Home() {
  return (
    <div>
      <TileBackground>
        <Navbar />
        <div className={`flex flex-col items-center justify-center`}>
          <TitleSectionBoom />
          <FeatureSection />
          <AboutSection />
          <ContributeSection />
        </div>
      </TileBackground>
    </div>
  );
}

function TitleSection() {
  return (
    <div className={`relative flex flex-col items-center justify-center min-h-screen`}>
      {/* ARTIFACTS */}
      {/* ARTIFACTS */}
      <div
        className={`
          relative
          font-bold text-5xl md:text-7xl lg:text-9xl 
          flex flex-col items-center justify-center`}
      >
        <h1>The Perfect</h1>
        {/* TODO: Add hover effect, change it to C0deB00k and create an underline */}
        <h1>CodeBook</h1>
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

function TitleSectionBoom() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
      
      {/* --- Artifacts Start --- */}
      {/* Large Blurred Circle */}
      <div className="absolute top-1/4 -left-20 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl animate-float" />
      
      {/* Floating Code Bracket Icon */}
      <div className="absolute top-20 right-0 opacity-20 animate-float [animation-delay:1s]">
         <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="1">
            <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
         </svg>
      </div>

      {/* Floating Floating Square */}
      
      <div className="absolute bottom-1/4 left-[15%] w-12 h-12 border-2 border-gray-300 rotate-12 opacity-30 animate-float [animation-delay:2s]" />
      {/* Floating Dots Pattern */}
      <div className="absolute bottom-20 right-20 opacity-20 animate-float [animation-delay:0.5s]">
        <div className="grid grid-cols-3 gap-2">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="w-2 h-2 bg-black rounded-full" />
          ))}
        </div>
      </div>
      {/* --- Artifacts End --- */}

      <div className="relative z-10 font-bold text-5xl md:text-7xl lg:text-9xl flex flex-col items-center justify-center">
        <h1>The Perfect</h1>
        <h1 className="relative">
          CodeBook
          <div className="absolute -bottom-2 left-0 w-full h-2 bg-black/10 -rotate-1" />
        </h1>
        <h1>Made Simple</h1>
      </div>
      
      <p className="relative z-10 mt-10 mb-10 text-md md:text-lg lg:text-xl max-w-4xl text-center text-gray-600">
        Easily generate codebooks from Github repositories or bring your own
        code. Spend more time using the codebook than creating it!
      </p>
      
      <div className="relative z-10">
        <GetStartedButton />
      </div>
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
