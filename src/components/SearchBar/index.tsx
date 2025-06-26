import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export function SearchBar({ value, onChange }: Props) {
  return (
    <div className="flex items-center border border-gray-300 rounded p-2 w-full max-w-sm">
      <SearchOutlinedIcon fontSize="small" className="text-gray-500" />
      <input
        type="text"
        placeholder="Buscar produto.."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="ml-2 flex-1 outline-none text-gray-700"
      />
    </div>
  );
}
