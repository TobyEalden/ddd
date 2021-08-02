import TitlebarButton from "./titlebar-button";

export default function TitleBar() {
  return (
    <div className="flex flex-row p-2 bg-paper justify-between">
      <span className="pl-2 font-bold text-lg">Distributed Device Descriptors</span>
      <div className="flex-grow" />
      <TitlebarButton iconName="fad fa-arrow-right-from-bracket" label="sign out" route="/sign-out" />
    </div>
  );
}
