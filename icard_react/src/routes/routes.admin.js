import { AdminLayout } from "../layouts";
import {
  HomeAdmin,
  UserAdmin,
  CategoriesAdmin,
  ProductAdmin,
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
];

export default routesAdmin;
