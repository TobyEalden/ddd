import SidebarButton from "./sidebar-button.jsx";

export default function Sidebar() {
  return (
    <div className="bg-paper flex flex-col px-1 pt-2">
      <SidebarButton iconName="fad fa-home" label="home" />
      <SidebarButton iconName="fad fa-user-plus" label="add entity" />
      <SidebarButton iconName="fad fa-key-skeleton-left-right" label="your keys" route="/keys" />
    </div>
  );
}
