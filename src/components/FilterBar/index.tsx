type Props = {
  onChange: (filters: { min?: number; max?: number }) => void;
  onApply: () => void;
};

export function FilterBar({ onChange, onApply }: Props) {
  return (
    <div className="flex items-center gap-2">
      <input
        type="number"
        placeholder="Preço mín."
        className="w-64 p-2 border rounded"
        onChange={(e) => onChange({ min: +e.target.value })}
      />
      <input
        type="number"
        placeholder="Preço máx."
        className="w-64 p-2 border rounded"
        onChange={(e) => onChange({ max: +e.target.value })}
      />
      <button
        onClick={onApply}
        className="px-4 py-2 bg-slate-900 text-white rounded br-6"
      >
        Filtrar
      </button>
    </div>
  );
}
