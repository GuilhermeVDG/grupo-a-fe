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
  };
  links: Record<string, string>;
}

export async function fetchProducts(): Promise<PaginatedResponse<RawProduct>> {
  return await apiFetch<PaginatedResponse<RawProduct>>("/product");
}

export async function fetchProductById(id: string): Promise<RawProduct> {
  const response = await apiFetch<{ data: RawProduct }>(`/product/${id}`);
  return response.data;
}

export async function createProduct(
  payload: Partial<RawProduct>
): Promise<RawProduct> {
  const response = await apiFetch<{ data: RawProduct }>("/product", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return response.data;
}

export async function updateProduct(
  id: string,
  payload: Partial<RawProduct>
): Promise<RawProduct> {
  const response = await apiFetch<{ data: RawProduct }>(`/product/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return response.data;
}

export async function deleteProduct(id: string): Promise<void> {
  await apiFetch<void>(`/product/${id}`, { method: "DELETE" });
}

export async function restoreProduct(id: string): Promise<RawProduct> {
  const response = await apiFetch<{ data: RawProduct }>(
    `/product/${id}/restore`,
    {
      method: "POST",
    }
  );
  return response.data;
}

export async function applyCouponDiscount(
  id: string,
  couponCode: string
): Promise<RawProduct> {
  const response = await apiFetch<{ data: RawProduct }>(
    `/product/${id}/discount/coupon`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: couponCode }),
    }
  );
  return response.data;
}

export async function applyPercentDiscount(
  id: string,
  percent: number
): Promise<RawProduct> {
  const response = await apiFetch<{ data: RawProduct }>(
    `/product/${id}/discount/percent`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ percent }),
    }
  );
  return response.data;
}

export async function removeDiscount(id: string): Promise<RawProduct> {
  const response = await apiFetch<{ data: RawProduct }>(
    `/product/${id}/discount`,
    {
      method: "DELETE",
    }
  );
  return response.data;
}
