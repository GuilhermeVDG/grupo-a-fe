import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

type Props = {
  onClick: () => void;
};

export function CreateProductBtn({ onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded br-6 hover:bg-gray-600 transition"
    >
      <AddOutlinedIcon fontSize="small" />
      <span className="whitespace-nowrap">Criar Produto</span>
    </button>
  );
}
