import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { FilePlus } from "lucide-react";
import type { Product } from "../../pages/Products";

export default function CreateProductPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState<Partial<Product>>({
    name: "",
    category: "",
    description: "",
    price: 0,
    stock: 0,
  });

  const handleChange = (field: keyof Product, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // TODO: integrar com contexto ou API para salvar
    console.log("Cadastrando produto:", form);
    navigate(-1);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-2">
        <FilePlus size={32} strokeWidth={1.5} />
        <h1 className="text-3xl font-semibold">Cadastro de Produto</h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow p-6 space-y-6"
      >
        {/* Seção de dados */}
        <div className="border-b pb-4 mb-6">
          <h2 className="font-semibold">Dados do produto</h2>
          <p className="text-sm text-gray-500">
            O campo abaixo é obrigatório para o cadastro.
          </p>
        </div>

        {/* Grid de inputs */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nome do produto *
            </label>
            <input
              type="text"
              placeholder="Informe o nome do produto"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="mt-1 w-full border border-gray-300 rounded p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Categoria *
            </label>
            <select
              value={form.category}
              onChange={(e) => handleChange("category", e.target.value)}
              className="mt-1 w-full border border-gray-300 rounded p-2"
              required
            >
              <option value="">Categoria do produto</option>
              <option value="Eletrônicos">Eletrônicos</option>
              <option value="Roupas">Roupas</option>
              <option value="Alimentos">Alimentos</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Descrição *
          </label>
          <textarea
            placeholder="Descrição detalhada do produto"
            value={form.description}
            onChange={(e) => handleChange("description", e.target.value)}
            className="mt-1 w-full border border-gray-300 rounded p-2 h-32"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Preço *
            </label>
            <input
              type="number"
              step="0.01"
              placeholder="R$ 0,00"
              value={form.price}
              onChange={(e) =>
                handleChange("price", parseFloat(e.target.value))
              }
              className="mt-1 w-full border border-gray-300 rounded p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Estoque *
            </label>
            <input
              type="number"
              placeholder="0"
              value={form.stock}
              onChange={(e) => handleChange("stock", parseInt(e.target.value))}
              className="mt-1 w-full border border-gray-300 rounded p-2"
              required
            />
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-slate-900 text-white rounded hover:opacity-90"
          >
            Cadastrar
          </button>
        </div>
      </form>
    </div>
  );
}
