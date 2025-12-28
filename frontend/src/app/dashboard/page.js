import TileBackground from "../components/TileBackground";
import Searchbar from "../dashboard/components/searchbar";
import { LogoSection } from "../components/NavBar";
import AccountIcon from "../dashboard/components/accounticon";
import Content from "../dashboard/components/content";

export default function Dashboard() {
    return (
        <div>
            <TileBackground>
                <DesktopNavbar />
                <MobileNavbar />
                <div>
                    <Content />
                </div>
            </TileBackground>
        </div>
    );
}

function DesktopNavbar() {
    return (
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
    );
}

function MobileNavbar() {
    return (
        <nav
            className={`
                    fixed top-0 w-full z-50
                    lg:hidden flex justify-between items-center p-5
                    border-b border-white/0
                    `}
        >
            <LogoSection />
            <div className="flex-1 px-4">
                <Searchbar />
            </div>
            <AccountIcon />
        </nav>
    );
}