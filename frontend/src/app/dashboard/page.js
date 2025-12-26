import TileBackground from "../components/TileBackground";
import Searchbar from "../dashboard/components/searchbar";
import { LogoSection } from "../components/NavBar";
import AccountIcon from "../dashboard/components/accounticon";

export default function Dashboard() {
    return (
        <div>
            <TileBackground>
                <nav
                    className={`
                            fixed top-0 w-full z-50 
                      hidden lg:flex justify-between items-center p-5
                      border-b border-white/0	
                        `}
                >
                    <LogoSection />
                    <Searchbar />
                    <AccountIcon />
                </nav>
            </TileBackground>
        </div>
    );
}