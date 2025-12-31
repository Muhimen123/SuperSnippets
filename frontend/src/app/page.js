"use client";

import FeatureCard from "./components/FeatureCard";
import MemberCard from "./components/MemberCard";
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
    <div className={`flex flex-col items-center justify-center min-h-screen`}>
      <div
        className={`
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
      className={`flex flex-col gap-5 items-center justify-center w-full p-12 m-8 bg-white/0 backdrop-blur-xs`}
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
      className={`flex flex-col items-center justify-center w-full p-12 m-8 bg-white/0 backdrop-blur-xs`}
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
  return (
    <footer className="w-full bg-black text-white mt-8">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex flex-col items-center gap-6">
          <div className="flex items-center gap-4">
            <a href="#" aria-label="twitter" className="p-2 rounded-full bg-white/10 hover:bg-white/20">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22 5.92c-.66.3-1.36.5-2.09.59.75-.45 1.32-1.17 1.59-2.03-.7.41-1.47.71-2.29.88A3.67 3.67 0 0015.5 4c-2.03 0-3.68 1.64-3.68 3.66 0 .29.03.57.09.84-3.06-.15-5.78-1.62-7.6-3.86-.32.56-.5 1.2-.5 1.89 0 1.31.67 2.46 1.69 3.14-.62-.02-1.2-.19-1.71-.47v.05c0 1.82 1.29 3.33 3 3.67-.31.08-.64.12-.98.12-.24 0-.48-.02-.71-.07.48 1.5 1.86 2.6 3.5 2.63A7.37 7.37 0 013 19.54a10.36 10.36 0 005.6 1.63c6.73 0 10.42-5.58 10.42-10.42v-.47c.72-.52 1.34-1.17 1.84-1.91-.66.29-1.36.48-2.09.57z" />
              </svg>
            </a>
            <a href="#" aria-label="facebook" className="p-2 rounded-full bg-white/10 hover:bg-white/20">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22 12a10 10 0 10-11.5 9.87v-6.99H8.9V12h1.6V9.8c0-1.56.93-2.42 2.36-2.42.68 0 1.39.12 1.39.12v1.53h-.78c-.77 0-1 .48-1 0v1.2h1.7l-.27 2.88h-1.43v6.99A10 10 0 0022 12z" />
              </svg>
            </a>
            <a href="#" aria-label="github" className="p-2 rounded-full bg-white/10 hover:bg-white/20">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 .5A12 12 0 000 12.69c0 5.3 3.44 9.79 8.2 11.37.6.12.82-.26.82-.58v-2.02c-3.34.73-4-1.6-4-1.6-.54-1.32-1.32-1.67-1.32-1.67-1.08-.76.08-.75.08-.75 1.2.09 1.83 1.26 1.83 1.26 1.06 1.82 2.78 1.3 3.46.99.11-.76.42-1.3.76-1.6-2.66-.31-5.46-1.36-5.46-6.05 0-1.34.48-2.43 1.27-3.29-.13-.31-.55-1.56.12-3.25 0 0 1.03-.33 3.37 1.26a11.4 11.4 0 016.14 0c2.33-1.6 3.36-1.26 3.36-1.26.68 1.69.26 2.94.13 3.25.8.86 1.26 1.95 1.26 3.29 0 4.7-2.8 5.73-5.47 6.03.43.37.82 1.09.82 2.2v3.26c0 .32.21.71.83.58A12 12 0 0024 12.69 12 12 0 0012 .5z" />
              </svg>
            </a>
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <a href="#about" className="text-white/80 hover:text-white">About</a>
            <a href="#features" className="text-white/80 hover:text-white">Features</a>
            <a href="#pricing" className="text-white/80 hover:text-white">Pricing</a>
            <a href="#gallery" className="text-white/80 hover:text-white">Gallery</a>
            <a href="#team" className="text-white/80 hover:text-white">Team</a>
            <a href="#contact" className="ml-2 inline-block bg-white text-black px-4 py-1 rounded-full">Contact Us</a>
          </nav>

          <div className="w-full border-t border-white/10 mt-4 pt-4 text-center text-xs text-white/60">
            © {new Date().getFullYear()} Team MARS. All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
