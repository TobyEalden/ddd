import SidebarButton from "./sidebar-button.jsx";

export default function Sidebar() {
  return (
    <div className="fixed h-full bg-paper flex flex-col px-1 items-center z-20">
      <SidebarButton iconName="fad fa-home" label="home" />
      <SidebarButton iconName="fad fa-microchip fa-2xl" label="device&nbsp;types" route="/device-type" />
      <SidebarButton iconName="fad fa-code fa-xl" label="firmware" route="/firmware" />
      <SidebarButton iconName="fad fa-users" label="organisations" />
      <SidebarButton iconName="fad fa-key-skeleton-left-right" label="your&nbsp;keys" route="/key" />
    </div>
  );
}
