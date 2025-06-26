import { apiFetch } from "../global/constants/Api";

export interface RawProduct {
  id: number;
  name: string;
  description: string;
  stock: number;
  price: string;
  discountPrice: number;
  discount: string | number;
  discountType: "fixed" | "percent";
  hasCoupon: boolean;
  createdAt: string;
  updatedAt: string | null;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    itemsPerPage: number;
    totalItems: number;
    currentPage: number;
    totalPages: number;
    sortBy: [string, string][];
  };
  links: Record<string, string>;
}

export async function fetchProducts(): Promise<RawProduct[]> {
  const res = await apiFetch<PaginatedResponse<RawProduct>>("/product");
  return res.data;
}

export async function fetchProductById(id: number): Promise<RawProduct> {
  const res = await apiFetch<{ data: RawProduct }>(`/product/${id}`);
  return res.data;
}

export async function createProduct(
  payload: Partial<RawProduct>
): Promise<RawProduct> {
  const res = await apiFetch<{ data: RawProduct }>("/product", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res.data;
}

export async function updateProduct(
  id: number,
  payload: Partial<RawProduct>
): Promise<RawProduct> {
  const res = await apiFetch<{ data: RawProduct }>(`/product/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res.data;
}

export async function deleteProduct(id: number): Promise<void> {
  await apiFetch<void>(`/product/${id}`, { method: "DELETE" });
}
