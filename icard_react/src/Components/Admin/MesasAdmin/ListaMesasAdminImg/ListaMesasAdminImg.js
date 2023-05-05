import React, { useEffect, useState } from "react";
import { Label, Button, Icon, Checkbox } from "semantic-ui-react";
import { size } from "lodash";
import { getOrdersbyTableApi } from "../../../../api/orders";
import classNames from "classnames";
import "./ListaMesasAdminImg.scss";
import { ReactComponent as IcTable } from "../../../../assets/table.svg";
import { ORDER_STATUS } from "../../../../utils/constant";
import { Link } from "react-router-dom";

export function ListaMesasAdminImg(props) {
  const { mesa, reload } = props;
  const [orders, setOrders] = useState([]);
  const [tableBusy, settableBusy] = useState(false);

  useEffect(() => {
    (async () => {
      const response = await getOrdersbyTableApi(mesa.id, ORDER_STATUS.PENDING);
      setOrders(response);
    })();
  }, [reload]);

  useEffect(() => {
    (async () => {
      const response = await getOrdersbyTableApi(
        mesa.id,
        ORDER_STATUS.DELIVERED
      );
      if (size(response) > 0) settableBusy(response);
      else settableBusy(false);
    })();
  }, []);

  return (
    <Link className="table-admin" to={`/admin/table/${mesa.id}`}>
      {size(orders) > 0 ? (
        <Label circular color="orange">
          {size(orders)}
        </Label>
      ) : null}
      <IcTable
        className={classNames({
          pending: size(orders) > 0,
          busy: tableBusy,
        })}
      />
      <p>Mesa {mesa.number}</p>
    </Link>
  );
}
