import SidebarButton from "./sidebar-button.jsx";

export default function Sidebar() {
  return (
    <div className="fixed h-full flex flex-col px-1 pt-2 items-center z-20 space-y-4 bg-gradient-to-b from-chrome to-chrome-dark">
      <SidebarButton iconName="fa fa-sensor-fire" label="home" />
      <SidebarButton iconName="fad fa-microchip fa-2xl" label="device&nbsp;types" route="/device-type" />
      <SidebarButton iconName="fad fa-code fa-xl" label="firmware" route="/firmware" />
      <SidebarButton iconName="fad fa-users" label="organisations" route="/organisation" />
      <SidebarButton iconName="fad fa-key-skeleton-left-right" label="your&nbsp;keys" route="/key" />
      <SidebarButton iconName="fad fa-info-square fa-2xl" label="about" route="/about" />
    </div>
  );
}
