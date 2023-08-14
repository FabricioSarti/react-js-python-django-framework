import { BasicLayout, ClientLayout } from "../layouts";
import { Categories, SelectTable } from "../pages/Client";

const routesClient = [
  {
    path: "/",
    layout: BasicLayout,
    component: SelectTable,
  },
  {
    path: "/client/:tableNumber",
    layout: ClientLayout,
    component: Categories
  }
];

export default routesClient;
