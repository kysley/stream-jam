import { Fragment } from "react";
import { useMagnetIds } from "../state";
import { Magnet } from "./magnet/magnet";

export function MagnetDisplay() {
  const localMagnetIds = useMagnetIds();

  if (!localMagnetIds) return null;

  return (
    <Fragment>
      {localMagnetIds.length > 0 &&
        localMagnetIds.map((id) => <Magnet key={id} id={id} />)}
    </Fragment>
  );
}
