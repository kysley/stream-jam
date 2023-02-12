import * as Toolbar from "@radix-ui/react-toolbar";
import { useAtom, useSetAtom } from "jotai";
import { ReactNode } from "react";
import { Photo, TextSize } from "tabler-icons-react";
import { validate } from "uuid";
import { quickMenuAtom } from "../state";

import "./toolbar.styles.css";

export function QuickToolbar() {
  const setQuickMenu = useSetAtom(quickMenuAtom);
  return (
    <Toolbar.Root className="root">
      <Toolbar.ToggleGroup
        type="single"
        onValueChange={(value) => {
          setQuickMenu(value);
        }}
      >
        <ToggleItem value="photo">
          <Photo color="black" />
        </ToggleItem>
        <ToggleItem value="text">
          <TextSize color="black" />
        </ToggleItem>
      </Toolbar.ToggleGroup>
      {/* <Toolbar.Button>
        <Photo color="black" />
      </Toolbar.Button> */}
    </Toolbar.Root>
  );
}

function ToggleItem(props: { value: string; children: ReactNode }) {
  return (
    <Toolbar.ToggleItem value={props.value} className="toggle-item">
      {props.children}
    </Toolbar.ToggleItem>
  );
}
