import React, { useEffect } from "react";
import "./ClientLayout.scss";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useMesas } from "../../hooks";
import { Container, Button, Icon } from "semantic-ui-react";



export function ClientLayout(props) {
  /*ESTE CHILDREN HACE QUE SE EXPORTE TODO EL LAYOUT*/

  const { children } = props;

  const { isExistTable } = useMesas();
  const { tableNumber } = useParams();
  const navigate = useNavigate()

  useEffect(() => {
    (async () => {
      const existe = await isExistTable(tableNumber);
      if (!existe) onCloseTable()
    })()
  }, [tableNumber])

  const onCloseTable = () => {
    navigate("/");
  }

  const goToCart = () => {
    navigate(`/client/${tableNumber}/cart`)
  }

  const goToOrders = () => {
    navigate(`/cliente/${tableNumber}/orders`)
  }

  return (
    <div className="client-layout-bg">
      <Container className="client-layout">
        <div className="client-layout__header">
          <Link to={`/client/${tableNumber}`} >
            <h1>Icard</h1>
          </Link>

          <span>Mesa {tableNumber}</span>

          <div>
            <Button icon onClick={() => goToCart()} >
              <Icon name="shop" />
            </Button>
            <Button icon onClick={() => goToOrders()} >
              <Icon name="list" />
            </Button>
            <Button icon onClick={() => onCloseTable()} >
              <Icon name="sign-out" />
            </Button>
          </div>
        </div>

        <div className="client-layout__content">
          {children}
        </div>
      </Container>

    </div>
  );
}
