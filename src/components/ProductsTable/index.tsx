import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import type { Product } from "../../pages/Products";
import { useNavigate } from "react-router-dom";

type Props = {
  products: Product[];
  onDiscount: (p: Product) => void;
  onDelete: (p: Product) => void;
};

export function ProductsTable({ products, onDiscount, onDelete }: Props) {
  const navigate = useNavigate();

  return (
    <div className="overflow-x-auto bg-white rounded shadow">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500">
              Nome
            </th>
            <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500">
              Descrição
            </th>
            <th className="px-4 py-2 text-left text-xs font-semibold text-gray-500">
              Categoria
            </th>
            <th className="px-4 py-2 text-right text-xs font-semibold text-gray-500">
              Preço
            </th>
            <th className="px-4 py-2 text-right text-xs font-semibold text-gray-500">
              Estoque
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
              <td className="px-4 py-2 text-sm text-gray-500 max-w-xs truncate">
                {p.description}
              </td>
              <td className="px-4 py-2 text-sm text-gray-700">{p.category}</td>

              {/* aqui é que checamos desconto */}
              <td className="px-4 py-2 text-sm text-gray-700 text-right">
                {p.discountedPrice != null ? (
                  <div className="flex flex-col items-end gap-1">
                    <span className="line-through text-gray-400">
                      {p.price.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </span>
                    <span className="font-semibold">
                      {p.discountedPrice.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </span>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">
                      {p.discountPct}%
                    </span>
                  </div>
                ) : (
                  p.price.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })
                )}
              </td>

              <td className="px-4 py-2 text-sm text-gray-700 text-right">
                {p.stock}
              </td>
              <td className="px-4 py-2 text-sm text-gray-700 flex justify-center items-center gap-2">
                <button
                  onClick={() =>
                    navigate(`/produtos/${p.id}/edit`, { state: p })
                  }
                  className="p-1 hover:text-gray-900"
                >
                  <EditOutlinedIcon fontSize="small" />
                </button>
                <button
                  className="p-1 hover:text-gray-900"
                  onClick={() => onDiscount(p)}
                >
                  <AttachMoneyOutlinedIcon fontSize="small" />
                </button>
                <button
                  onClick={() => onDelete(p)}
                  className="p-1 hover:text-red-600"
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
