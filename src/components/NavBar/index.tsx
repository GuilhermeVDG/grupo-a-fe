import { ProfileMenu } from "../ProfileMenu";

export default function Topbar() {
  return (
    <header className="h-16 bg-white border-b flex items-center px-6">
      <div className="flex-1" />
      <ProfileMenu />
    </header>
  );
}
