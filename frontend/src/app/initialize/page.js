import TileBackground from "../components/TileBackground";
import InitNavbar from "./components/InitNavbar";

export default function SignUp() {
  return (
    <div>
      <TileBackground>
        <InitNavbar />
        <div
          className={`flex min-h-screen flex-col items-center justify-center`}
        >
        </div>
      </TileBackground>
    </div>
  );
}