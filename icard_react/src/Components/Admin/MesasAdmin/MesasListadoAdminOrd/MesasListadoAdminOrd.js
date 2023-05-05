import React, { useEffect, useState } from "react";
import { map, size } from "lodash";
import { ListaMesasAdminImg } from "../ListaMesasAdminImg";
import { Button, Icon, Checkbox } from "semantic-ui-react";

import "./MesasListadoAdminOrd.scss";

export function MesasListadoAdminOrd(props) {
  const { mesas } = props;

  const [reload, setReload] = useState(false);
  const [autoReload, setAutoReload] = useState(false);

  const onReload = () => setReload((prev) => !prev);

  useEffect(() => {
    if (autoReload) {
      const autoReloadAction = () => {
        onReload();
        setTimeout(() => {
          autoReloadAction();
        }, 5000);
      };

      autoReloadAction();
    }
  }, [autoReload]);

  const onCheckAutoReload = (check) => {
    if (check) {
      setAutoReload(check);
    } else {
      window.location.reload();
    }
  };

  return (
    <div className="tables-list-admin">
      <Button
        primary
        icon
        className="tables-list-admin__reload"
        onClick={() => onReload()}
      >
        <Icon name="refresh" />
      </Button>

      <div className="tables-list-admin__reload-toggle">
        <span>Reload automatico</span>
        <Checkbox
          toggle
          checked={autoReload}
          onChange={(_, data) => onCheckAutoReload(data.checked)}
        />
      </div>

      {map(mesas, (mesa) => (
        <ListaMesasAdminImg key={mesa.number} mesa={mesa} reload={reload} />
      ))}
    </div>
  );
}
