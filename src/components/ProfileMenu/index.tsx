export function ProfileMenu() {
  const userName = "Arthur Morgan "; // mockado até ter o user real
  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="flex items-center gap-4">
      <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-medium">
        {initials}
      </div>
      <span className="text-sm text-gray-700">Olá, {userName}</span>
    </div>
  );
}
