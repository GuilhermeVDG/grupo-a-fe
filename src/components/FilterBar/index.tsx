type Props = {
  onSearch: (search: string) => void;
  onPriceFilter: (min?: number, max?: number) => void;
  onStockFilter: (stock?: number) => void;
  onCouponFilter: (hasCoupon?: boolean) => void;
};

export function FilterBar({
  onSearch,
  onPriceFilter,
  onStockFilter,
  onCouponFilter,
}: Props) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <input
          type="number"
          placeholder="Preço mín."
          className="w-32 p-2 border rounded"
          onChange={(e) => onPriceFilter(+e.target.value, undefined)}
        />
        <input
          type="number"
          placeholder="Preço máx."
          className="w-32 p-2 border rounded"
          onChange={(e) => onPriceFilter(undefined, +e.target.value)}
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          type="number"
          placeholder="Estoque"
          className="w-32 p-2 border rounded"
          onChange={(e) => onStockFilter(+e.target.value)}
        />
      </div>

      <div className="flex items-center gap-2">
        <select
          className="w-32 p-2 border rounded"
          onChange={(e) => onCouponFilter(e.target.value === "true")}
        >
          <option value="">Cupom</option>
          <option value="true">Com cupom</option>
          <option value="false">Sem cupom</option>
        </select>
      </div>
    </div>
  );
}
