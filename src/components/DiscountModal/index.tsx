import { useState } from "react";
import { X } from "lucide-react";
import type { RawProduct } from "../../services/ProductService";

export type DiscountModalProps = {
  open: boolean;
  product: RawProduct | null;
  onClose: () => void;
  onApplyCoupon: (code: string) => Promise<void>;
  onApplyPercent: (percent: number) => Promise<void>;
  onRemoveDiscount: () => Promise<void>;
};

export function DiscountModal({
  open,
  product,
  onClose,
  onApplyCoupon,
  onApplyPercent,
  onRemoveDiscount,
}: DiscountModalProps) {
  const [tab, setTab] = useState<"coupon" | "percent">("coupon");
  const [code, setCode] = useState("");
  const [percentValue, setPercentValue] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!open || !product) return null;

  const handleApply = async () => {
    try {
      setLoading(true);
      setError(null);

      if (tab === "coupon") {
        if (!code.trim()) {
          setError("Digite um código de cupom válido");
          return;
        }
        await onApplyCoupon(code.trim().toUpperCase());
      } else {
        if (percentValue <= 0 || percentValue > 80) {
          setError("O percentual deve estar entre 1% e 80%");
          return;
        }
        await onApplyPercent(percentValue);
      }

      onClose();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erro ao aplicar desconto");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-lg p-6 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 hover:bg-gray-200 rounded"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xl font-semibold">Aplicar Desconto</span>
        </div>
        <p className="text-gray-500 mb-4">
          Escolha como aplicar o desconto ao produto
        </p>

        {/* Tabs */}
        <div className="flex gap-2 border-b mb-4">
          <button
            onClick={() => {
              setTab("coupon");
              setError(null);
            }}
            className={`px-4 py-2 rounded-t-lg ${
              tab === "coupon"
                ? "bg-slate-900 text-white"
                : "bg-white text-gray-700"
            }`}
          >
            Código Cupom
          </button>
          <button
            onClick={() => {
              setTab("percent");
              setError(null);
            }}
            className={`px-4 py-2 rounded-t-lg ${
              tab === "percent"
                ? "bg-slate-900 text-white"
                : "bg-white text-gray-700"
            }`}
          >
            Percentual Direto
          </button>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded text-sm">
            {error}
          </div>
        )}

        {/* Content */}
        {tab === "coupon" ? (
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              Código do Cupom
            </label>
            <input
              type="text"
              placeholder="Digite o código do cupom"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full border border-gray-300 rounded p-2 uppercase"
            />
            <p className="text-sm text-gray-500">
              Digite o código do cupom fornecido
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              Percentual (%)
            </label>
            <input
              type="number"
              placeholder="Digite o percentual"
              value={percentValue}
              onChange={(e) => setPercentValue(Number(e.target.value))}
              min="1"
              max="80"
              className="w-full border border-gray-300 rounded p-2"
            />
            <p className="text-sm text-gray-500">
              O percentual deve estar entre 1% e 80%
            </p>
          </div>
        )}

        {/* Footer */}
        <div className="flex justify-end gap-2 mt-6">
          {product.discountPrice && (
            <button
              onClick={onRemoveDiscount}
              className="px-4 py-2 border border-red-500 text-red-500 rounded hover:bg-red-50"
              disabled={loading}
            >
              Remover Desconto
            </button>
          )}
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded hover:bg-gray-100"
            disabled={loading}
          >
            Cancelar
          </button>
          <button
            onClick={handleApply}
            disabled={loading}
            className="px-4 py-2 bg-slate-900 text-white rounded hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Aplicando..." : "Aplicar"}
          </button>
        </div>
      </div>
    </div>
  );
}
