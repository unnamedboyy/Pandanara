import { getAdminCategories, getAdminProducts } from "@/lib/admin";
import AdminDashboard from "@/components/admin/AdminDashboard";
import { logoutAction } from "./login/actions";
import {
  createCategory,
  updateCategory,
  deleteCategory,
  createProduct,
  updateProduct,
  deleteProduct,
} from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const [categories, products] = await Promise.all([
    getAdminCategories(),
    getAdminProducts(),
  ]);

  return (
    <div className="min-h-screen bg-cream">
      <header className="sticky top-0 z-10 bg-cream/95 backdrop-blur-sm border-b border-ink/10 px-5 py-4 flex items-center justify-between">
        <h1 className="font-display text-[18px] text-forest">
          Kelola Katalog
        </h1>
        <form action={logoutAction}>
          <button
            type="submit"
            className="text-[13px] text-ink/50 hover:text-forest"
          >
            Keluar
          </button>
        </form>
      </header>

      <AdminDashboard
        categories={categories}
        products={products}
        actions={{
          createCategory,
          updateCategory,
          deleteCategory,
          createProduct,
          updateProduct,
          deleteProduct,
        }}
      />
    </div>
  );
}