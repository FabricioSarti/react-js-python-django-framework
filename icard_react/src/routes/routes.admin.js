import { AdminLayout } from "../layouts";
import {
  HomeAdmin,
  UserAdmin,
  CategoriesAdmin,
  ProductAdmin,
  TableAdmin,
} from "../pages/Admin";

const routesAdmin = [
  {
    path: "/admin",
    layout: AdminLayout,
    component: HomeAdmin,
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
];

export default routesAdmin;
