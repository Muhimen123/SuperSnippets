import Navbar from "../components/NavBar";
import TileBackground from "../components/TileBackground";

export default function ContributePage() {
  return (
    <TileBackground>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen">
        <div className="max-w-3xl text-center p-8">
          <h1 className="text-4xl font-bold mb-4">Contribute (Test Page)</h1>
          <p className="text-lg text-gray-700">
            This is a placeholder Contribute page. will be updated ...
          </p>
        </div>
      </div>
    </TileBackground>
  );
}
