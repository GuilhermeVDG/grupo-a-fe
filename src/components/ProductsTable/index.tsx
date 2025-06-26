import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import type { RawProduct } from "../../services/ProductService";
import { useNavigate } from "react-router-dom";

type Props = {
  products: RawProduct[];
  onDiscount: (p: RawProduct) => void;
  onDelete: (p: RawProduct) => Promise<void>;
};

const COLUMNS = [
  { key: "name", label: "Nome" },
  { key: "effectivePrice", label: "Preço" },
  { key: "stock", label: "Estoque" },
];

export function ProductsTable({ products, onDiscount, onDelete }: Props) {
  const navigate = useNavigate();

  const formatCurrency = (value: string | number) => {
    const numValue = typeof value === "string" ? parseFloat(value) : value;
    return numValue.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const calculateDiscountPercentage = (
    price: string | number,
    discountPrice: number
  ) => {
    const numPrice = typeof price === "string" ? parseFloat(price) : price;
    return Math.round(((numPrice - discountPrice) / numPrice) * 100);
  };

  return (
    <div className="overflow-x-auto bg-white rounded shadow">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {COLUMNS.map((column) => (
              <th
                key={column.key}
                className="px-4 py-2 text-left text-xs font-semibold text-gray-500"
              >
                {column.label}
              </th>
            ))}
            <th className="px-4 py-2 text-center text-xs font-semibold text-gray-500">
              Cupom
            </th>
            <th className="px-4 py-2 text-center text-xs font-semibold text-gray-500">
              Ações
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {products.map((p) => (
            <tr key={p.id}>
              <td className="px-4 py-2 text-sm text-gray-700">{p.name}</td>
              <td className="px-4 py-2 text-sm text-gray-700 text-right">
                {p.discountPrice ? (
                  <div className="flex flex-col items-end gap-1">
                    <span className="line-through text-gray-400">
                      {formatCurrency(p.price)}
                    </span>
                    <span className="font-semibold">
                      {formatCurrency(p.discountPrice)}
                    </span>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">
                      {p.discountType === "percent"
                        ? `${p.discount}%`
                        : `${calculateDiscountPercentage(
                            p.price,
                            p.discountPrice
                          )}%`}
                    </span>
                  </div>
                ) : (
                  formatCurrency(p.price)
                )}
              </td>
              <td className="px-4 py-2 text-sm text-gray-700 text-right">
                {p.stock}
              </td>
              <td className="px-4 py-2 text-sm text-center">
                {p.hasCoupon && (
                  <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs">
                    Cupom
                  </span>
                )}
              </td>
              <td className="px-4 py-2 text-sm text-gray-700 flex justify-center items-center gap-2">
                <button
                  onClick={() =>
                    navigate(`/produtos/${p.id}/edit`, { state: p })
                  }
                  className="p-1 hover:text-gray-900"
                  title="Editar produto"
                >
                  <EditOutlinedIcon fontSize="small" />
                </button>
                <button
                  className="p-1 hover:text-gray-900"
                  onClick={() => onDiscount(p)}
                  title="Aplicar desconto"
                >
                  <AttachMoneyOutlinedIcon fontSize="small" />
                </button>
                <button
                  onClick={() => onDelete(p)}
                  className="p-1 hover:text-red-600"
                  title="Excluir produto"
                >
                  <DeleteOutlineOutlinedIcon fontSize="small" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
