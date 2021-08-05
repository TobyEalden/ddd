import SidebarButton from "./sidebar-button.jsx";

export default function Sidebar() {
  return (
    <div className="fixed h-full bg-paper flex flex-col px-1 items-center z-20">
      <SidebarButton iconName="fad fa-home" label="home" />
      <SidebarButton iconName="fad fa-sensor-fire" label="device types" route="/device-type" />
      <SidebarButton iconName="fad fa-router" label="device descriptors" route="/device-type" />
      <SidebarButton iconName="fad fa-stamp" label="claims" />
      <SidebarButton iconName="fad fa-building" label="organisations" />
      <SidebarButton iconName="fad fa-key-skeleton-left-right" label="your keys" route="/key" />
      <SidebarButton iconName="fad fa-user-plus" label="add device-type" />
    </div>
  );
}
