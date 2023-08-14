import { AdminLayout } from "../layouts";
import {
  OrderAdmin,
  UserAdmin,
  CategoriesAdmin,
  ProductAdmin,
  TableAdmin,
  TableAdminDetalle,
  PaymentHistory,
} from "../pages/Admin";

const routesAdmin = [
  {
    path: "/admin",
    layout: AdminLayout,
    component: OrderAdmin,
  },
  {
    path: "/admin/users",
    layout: AdminLayout,
    component: UserAdmin,
  },
  {
    path: "/admin/categories",
    layout: AdminLayout,
    component: CategoriesAdmin,
  },
  {
    path: "/admin/products",
    layout: AdminLayout,
    component: ProductAdmin,
  },
  {
    path: "/admin/tables",
    layout: AdminLayout,
    component: TableAdmin,
  },
  {
    path: "/admin/payments-history",
    layout: AdminLayout,
    component: PaymentHistory,
  },
  {
    path: "/admin/table/:id",
    layout: AdminLayout,
    component: TableAdminDetalle,
  },
];

export default routesAdmin;
