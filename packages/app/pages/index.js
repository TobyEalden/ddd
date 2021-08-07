import HomeButton from "../components/home-button.jsx";
import MainFull from "../components/main-full.jsx";

export default function Home() {
  return (
    <MainFull>
      <div className="flex flex-row flex-wrap items-center h-full justify-center">
        <HomeButton label="Device Types" icon="fa-microchip" route="/device-type" />
        <HomeButton label="Firmware" icon="fa-code" route="/firmware" />
        <HomeButton label="Keys" icon="fa-key-skeleton-left-right" route="/key" />
        <HomeButton label="Organisations" icon="fa-buildings" route="/organisation" />
        <HomeButton label="Profile" icon="fa-user-circle" route="/profile" />
        <HomeButton label="About" icon="fa-info-square" route="/about" />
      </div>
    </MainFull>
  );
}
