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
      <Toolbar.ToolbarButton
        className="toggle-item"
        onClick={() =>
          addMagnet({
            id: crypto.randomUUID().toString(),
            // url: "https://cdn.7tv.app/emote/60ae65b29627f9aff4fd8bef/4x.webp", webp not supported atm :/
            // url: "https://cdn.7tv.app/emote/60ae65b29627f9aff4fd8bef/4x.gif",
            url: "",
            x: 50,
            y: 100,
            scale: 0.6,
          })
        }
      >
        <IconPhotoPlus />
      </Toolbar.ToolbarButton>
      <Toolbar.ToolbarButton className="toggle-item">
        <IconAlphabetLatin />
      </Toolbar.ToolbarButton>
      <Toolbar.ToolbarButton
        className="toggle-item"
        onClick={() => toggleIFrameFocus()}
      >
        <IconAppWindowFilled />
      </Toolbar.ToolbarButton>
    </Toolbar.Root>
  );
}
