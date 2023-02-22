import * as Toolbar from "@radix-ui/react-toolbar";
import { ReactNode } from "react";
import { Icon, Photo, TextSize } from "tabler-icons-react";
import { useMagnetActions } from "../state";

import "./toolbar.styles.css";

const toolbarWidgets: [{ value: string; icon: ReactNode }] = [
  { value: "photo", icon: <Photo /> },
  { value: "text", icon: <TextSize /> },
];

export function QuickToolbar() {
  const { addMagnet } = useMagnetActions();
  return (
    <Toolbar.Root className="toolbar-container">
      <Toolbar.ToggleGroup
        className="toolbar-group"
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
        {toolbarWidgets.map((w) => (
          <ToggleItem value={w.value}>{w.icon}</ToggleItem>
        ))}
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
