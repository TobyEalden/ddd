import SidebarButton from "./sidebar-button.jsx";

export default function Sidebar() {
  return (
    <div className="bg-paper flex flex-col px-1">
      <SidebarButton iconName="fad fa-home" label="home" />
      <SidebarButton iconName="fad fa-router" label="device descriptors" />
      <SidebarButton iconName="fad fa-stamp" label="claims" />
      <SidebarButton iconName="fad fa-key-skeleton-left-right" label="your keys" route="/key" />
      <SidebarButton iconName="fad fa-user-plus" label="add entity" />
    </div>
  );
}
