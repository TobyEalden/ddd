import TitlebarButton from "./titlebar-button";

export default function TitleBar() {
  return (
    <div className="fixed w-full flex flex-row items-center p-2 pl-16 bg-gradient-to-r from-chrome to-chrome-dark justify-between z-10">
      <span className="pl-2 font-bold text-lg text-chrome-inverted">Distributed Device Descriptors</span>
      <div className="flex-grow" />
      <TitlebarButton iconName="fad fa-user-circle" label="profile" route="/profile" />
      <TitlebarButton iconName="fad fa-arrow-right-from-bracket" label="sign out" route="/sign-out" />
    </div>
  );
}
