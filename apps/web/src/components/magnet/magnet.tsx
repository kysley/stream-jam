import { Image } from "react-konva";
import { useMagnetActions, useManget, useSelectedMagnetId } from "../../state";
import useImage from "use-image";
import { useEmitMagnetUpdate } from "../../hooks/use-emit-magnet-update";
import { useThrottledCallback } from "@react-hookz/web";
import { useEffect, useMemo, useRef } from "react";
import "gifler";
import { Animation } from "konva/lib/Animation";

type MagnetProps = {
  id: string;
};
export function Magnet({ id }: MagnetProps) {
  const magnet = useManget(id);
  const [image] = useImage(magnet?.url || "");
  const { setSelectedMagnetId } = useMagnetActions();
  const selectedId = useSelectedMagnetId();

  const { emitMagnetUpdate } = useEmitMagnetUpdate();
  const onMove = useThrottledCallback((fn) => fn(), [], 25);

  if (!magnet) {
    return null;
  }

  if (magnet?.url.endsWith("webp")) {
    return (
      <Video
        src={magnet.url}
        draggable
        onDragMove={(event) => {
          const newX = event.target.attrs.x;
          const newY = event.target.attrs.y;

          onMove(() => {
            emitMagnetUpdate({ ...magnet, x: newX, y: newY });
          });
        }}
        onClick={(e) => {
          setSelectedMagnetId(magnet.id);
        }}
        scaleX={magnet?.scale}
        scaleY={magnet?.scale}
        stroke={selectedId === magnet.id ? "1px solid black" : undefined}
        x={magnet?.x}
        y={magnet?.y}
      />
    );
  }

  if (magnet?.url.endsWith("gif")) {
    return (
      <GIF
        src={magnet.url}
        draggable
        onDragMove={(event) => {
          const newX = event.target.attrs.x;
          const newY = event.target.attrs.y;

          onMove(() => {
            emitMagnetUpdate({ ...magnet, x: newX, y: newY });
          });
        }}
        onClick={(e) => {
          setSelectedMagnetId(magnet.id);
        }}
        scaleX={magnet?.scale}
        scaleY={magnet?.scale}
        stroke={selectedId === magnet.id ? "1px solid black" : undefined}
        x={magnet?.x}
        y={magnet?.y}
      />
    );
  }

  return (
    <Image
      image={image}
      draggable
      onDragMove={(event) => {
        const newX = event.target.attrs.x;
        const newY = event.target.attrs.y;

        onMove(() => {
          emitMagnetUpdate({ ...magnet, x: newX, y: newY });
        });
      }}
      onClick={(e) => {
        setSelectedMagnetId(magnet.id);
      }}
      scaleX={magnet?.scale}
      scaleY={magnet?.scale}
      stroke={selectedId === magnet.id ? "1px solid black" : undefined}
      x={magnet?.x}
      y={magnet?.y}
    />
  );
}

// https://stackoverflow.com/questions/59741398/play-video-on-canvas-in-react-konva
export function Video({ src, ...rest }: { src: string }) {
  const videoRef = useRef(null);
  const videoElement = useMemo(() => {
    const node = document.createElement("video");
    node.src = src;
    return node;
  }, []);

  // use Konva.Animation to redraw a layer
  useEffect(() => {
    videoElement.play();
    const layer = videoRef.current?.getLayer();

    const anim = new Animation(() => {}, layer);
    anim.start();

    return () => {
      anim.stop();
    };
  }, [videoElement]);

  return <Image image={videoElement} ref={videoRef} {...rest} />;
}

// https://codesandbox.io/s/react-konva-gif-animation-p86qr?file=/src/index.js:1025-1060
export function GIF({ src, ...rest }: { src: string }) {
  const imageRef = useRef(null);
  const canvas = useMemo(() => {
    const node = document.createElement("canvas");
    return node;
  }, []);

  useEffect(() => {
    // save animation instance to stop it on unmount
    let anim;
    window.gifler(src).get((a) => {
      anim = a;
      anim.animateInCanvas(canvas);
      anim.onDrawFrame = (ctx, frame) => {
        ctx.drawImage(frame.buffer, frame.x, frame.y);
        imageRef.current.getLayer().draw();
      };
    });
    return () => anim && anim.stop();
  }, [src, canvas]);

  return <Image image={canvas} ref={imageRef} {...rest} />;
}
