import Navbar from "./components/NavBar";
import TileBackground from "./components/TileBackground";

export default function Home() {
  return (
    <div>
      <TileBackground>
        <Navbar />
        <TitleSection />
      </TileBackground>
    </div>
  );
}

function TitleSection() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-5xl font-bold lg:text-9xl flex flex-col items-center justify-center">
          <h1>The Perfect</h1>
          <h1>CodeBook</h1>
          <h1>Made Simple</h1>
        </div>
        <p className="mt-6 lg:text-xl max-w-4xl text-center">Easily generate codebooks from Github repositories or bring your own code. Spend more time using the codebook than creating it!</p>
    </div>
  );
}
