import { useState } from "react";
import { X } from "lucide-react";
import type { Product } from "../../pages/Products";

export type DiscountModalProps = {
  open: boolean;
  product: Product | null;
  onClose: () => void;
  onApply: (type: "coupon" | "percent", value: number) => void;
};

export function DiscountModal({
  open,
  product,
  onClose,
  onApply,
}: DiscountModalProps) {
  const [tab, setTab] = useState<"coupon" | "percent">("coupon");
  const [code, setCode] = useState("");
  const [percentValue, setPercentValue] = useState<number>(0);
  const [selectedCoupon, setSelectedCoupon] = useState<string | null>(null);

  const coupons = [
    { code: "SAVE10", pct: 10 },
    { code: "SAVE15", pct: 15 },
    { code: "SAVE20", pct: 20 },
    { code: "SAVE25", pct: 25 },
    { code: "SAVE30", pct: 30 },
    { code: "SAVE35", pct: 35 },
  ];

  if (!open || !product) return null;

  const handleApply = () => {
    if (tab === "coupon") {
      const coupon = coupons.find((c) => c.code === selectedCoupon);
      if (coupon) onApply("coupon", coupon.pct);
    } else {
      onApply("percent", percentValue);
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
            onClick={() => setTab("coupon")}
            className={`px-4 py-2 rounded-t-lg ${
              tab === "coupon"
                ? "bg-slate-900 text-white"
                : "bg-white text-gray-700"
            }`}
          >
            Código Cupom
          </button>
          <button
            onClick={() => setTab("percent")}
            className={`px-4 py-2 rounded-t-lg ${
              tab === "percent"
                ? "bg-slate-900 text-white"
                : "bg-white text-gray-700"
            }`}
          >
            Percentual Direto
          </button>
        </div>

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
              className="w-full border border-gray-300 rounded p-2"
            />
            <p className="text-sm text-gray-500">
              Cupons disponíveis para teste:
            </p>
            <div className="grid grid-cols-3 gap-2">
              {coupons.map((c) => (
                <button
                  key={c.code}
                  onClick={() => {
                    setSelectedCoupon(c.code);
                    setCode(c.code);
                  }}
                  className={`border rounded p-2 text-sm ${
                    selectedCoupon === c.code
                      ? "bg-slate-900 text-white"
                      : "bg-white text-gray-700"
                  }`}
                >
                  {c.code} ({c.pct}%)
                </button>
              ))}
            </div>
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
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>
        )}

        {/* Footer */}
        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            Cancelar
          </button>
          <button
            onClick={handleApply}
            className="px-4 py-2 bg-slate-900 text-white rounded hover:opacity-90"
          >
            Aplicar
          </button>
        </div>
      </div>
    </div>
  );
}
