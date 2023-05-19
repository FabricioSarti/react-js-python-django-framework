import React from "react";
import { map } from "lodash";
import { OrderItemAdmin } from "../OrderItemAdmin";

export function ListOrder(props) {
  const { orders, onReloadOrders } = props;
  return (
    <div>
      {map(orders, (order) => (
        <OrderItemAdmin
          key={order.id}
          order={order}
          onReloadOrders={onReloadOrders}
        />
      ))}
    </div>
  );
}
