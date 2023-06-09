import React from "react";
import { Button, Image } from "semantic-ui-react";
import "./OrderItemAdmin.scss";
import classNames from "classnames";
import moment from "moment";
import "moment/locale/es-mx";
import { ORDER_STATUS } from "../../../../utils/constant";
import { useOrder } from "../../../../hooks";

export function OrderItemAdmin(props) {
  const { order, onReloadOrders } = props;
  const { title, image } = order.product_data;
  const { checkDeliveredOrder } = useOrder();

  const onCheckDeliveredOrder = async () => {
    await checkDeliveredOrder(order.id); //order
    onReloadOrders();
  };

  return (
    <div
      className={classNames("order-item-admin", {
        [order.status.toLowerCase()]: true,
      })}
    >
      <div className="order-item-admin__time">
        <span>{moment(order.created_at).format("HH:mm")}</span> {" - "}
        <span>{moment(order.created_at).startOf("seconds").fromNow()}</span>
      </div>
      <div className="order-item-admin__product">
        <Image src={image} />
        <p>{title}</p>
      </div>

      {order.status === ORDER_STATUS.PENDING && (
        <Button primary onClick={onCheckDeliveredOrder}>
          Marcar Entregado
        </Button>
      )}
    </div>
  );
}
