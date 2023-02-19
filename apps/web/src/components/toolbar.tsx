import * as Toolbar from "@radix-ui/react-toolbar";
import { ReactNode } from "react";
import { Photo, TextSize } from "tabler-icons-react";
import { useMagnetActions } from "../state";

import "./toolbar.styles.css";

export function QuickToolbar() {
  const { addMagnet } = useMagnetActions();
  return (
    <Toolbar.Root className="root">
      <Toolbar.ToggleGroup
        type="single"
        onValueChange={(value) => {
          if (value === "photo") {
            addMagnet({
              id: crypto.randomUUID().toString(),
              url: "https://cdn.7tv.app/emote/60ae65b29627f9aff4fd8bef/4x.webp",
              x: 50,
              y: 50,
            });
          }
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
