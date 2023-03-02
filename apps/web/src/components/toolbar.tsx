import * as Toolbar from "@radix-ui/react-toolbar";
import { ReactNode } from "react";
import {
  IconPhotoPlus,
  IconAlphabetLatin,
  IconAppWindowFilled,
} from "@tabler/icons-react";
import { useMagnetActions, useStageActions } from "../state";

import "./toolbar.styles.css";

const toolbarWidgets: { value: string; icon: ReactNode }[] = [
  { value: "photo", icon: <IconPhotoPlus /> },
  { value: "text", icon: <IconAlphabetLatin /> },
  { value: "iframe", icon: <IconAppWindowFilled /> },
];

export function QuickToolbar() {
  const { addMagnet } = useMagnetActions();
  const { toggleIFrameFocus } = useStageActions();
  return (
    <Toolbar.Root className="toolbar-container">
      <Toolbar.ToggleGroup
        className="toolbar-group"
        type="single"
        onValueChange={(value) => {
          if (value === "photo") {
            addMagnet({
              id: crypto.randomUUID().toString(),
              // url: "https://cdn.7tv.app/emote/60ae65b29627f9aff4fd8bef/4x.webp", webp not supported atm :/
              url: "https://cdn.7tv.app/emote/60ae65b29627f9aff4fd8bef/4x.gif",
              x: 50,
              y: 100,
              scale: 0.6,
            });
          } else if (value === "iframe") {
            toggleIFrameFocus();
          }
        }}
      >
        {toolbarWidgets.map((w) => (
          <ToggleItem value={w.value}>{w.icon}</ToggleItem>
        ))}
      </Toolbar.ToggleGroup>
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
