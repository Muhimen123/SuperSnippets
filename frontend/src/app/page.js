"use client";

import FeatureCard from "./components/FeatureCard";
import Navbar from "./components/NavBar";
import TileBackground from "./components/TileBackground";

export default function Home() {
  return (
    <div>
      <TileBackground>
        <Navbar />
        <div className={`flex flex-col items-center justify-center`}>
          <TitleSection />
          <FeatureSection />
        </div>
      </TileBackground>
    </div>
  );
}

function TitleSection() {
  return (
    <div className={`flex flex-col items-center justify-center min-h-screen`}>
      <div
        className={`
          font-bold text-5xl md:text-7xl lg:text-9xl 
          flex flex-col items-center justify-center`}
      >
        <h1>The Perfect</h1>
        {/* TODO: Add hover effect, change it to C0deB00k and create an underline */}
        <h1>CodeBook</h1> <h1>Made Simple</h1>
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
    <div className={`flex flex-col items-center justify-center mb-5`}>
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
          subtitle={`Easily fetch codes from Github RepositoriesYour work stays with you. Online or offline. You are in control of your data.`}
          icon_src={`icons/file-upload.svg`}
        />
      </div>
    </div>
  );
}
