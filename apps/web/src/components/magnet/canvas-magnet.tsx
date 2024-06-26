import { Image as KonvaImage, Text as KonvaText } from "react-konva";
import {
	type Magnet,
	useMagnetActions,
	useManget,
	useSelectedMagnetId,
} from "../../state";
import useImage from "use-image";
import { useEmitMagnetUpdate } from "../../hooks/use-emit-magnet-update";
import { useThrottledCallback } from "@react-hookz/web";
import { useEffect, useMemo, useRef } from "react";
import "gifler";
import { Animation } from "konva/lib/Animation";
import { useUpdateMagnet } from "../../hooks/use-update-magnet";
import { makeMagnetProps } from "../../utils";
import { useMe } from "../../hooks/use-me";

type MagnetProps = {
	id: string;
	visible?: boolean;
	selected?: boolean;
};

export function CanvasMagnet({ id }: MagnetProps) {
	const magnet = useManget(id);
	const { setSelectedMagnetId, updateMagnet } = useMagnetActions();
	const selectedId = useSelectedMagnetId();
	const { data: me } = useMe({ networkMode: "offlineFirst" });

	const { mutateAsync: updateMagnetServer } = useUpdateMagnet();

	const { emitMagnetUpdate } = useEmitMagnetUpdate();
	const onMove = useThrottledCallback((fn) => fn(), [], 25);

	if (!magnet) {
		return null;
	}

	return (
		<MagnetRenderer
			magnet={magnet}
			// Stop accidental dragging if panning on top of a magnet
			draggable={selectedId === id}
			// Update last x,y so when/if the magnet redeners it will stay in place (changing image/gif)
			onDragEnd={(event) => {
				const lastX = event.target.attrs.x;
				const lastY = event.target.attrs.y;

				const newMagnet = updateMagnet(magnet.id, { x: lastX, y: lastY });
				if (newMagnet) {
					updateMagnetServer({
						// Remove the timestamp if added from saved magnets
						id: magnet.id.split("-")[0],
						props: makeMagnetProps(newMagnet, { preservePosition: true }),
					});
				}
			}}
			onDragMove={(event) => {
				const newX = event.target.attrs.x;
				const newY = event.target.attrs.y;

				onMove(() => {
					emitMagnetUpdate({ ...magnet, x: newX, y: newY });
				});
			}}
			onClick={() => {
				if (magnet.userId === me?.id) {
					setSelectedMagnetId(magnet.id);
				}
			}}
			scaleX={magnet?.scale / 100}
			scaleY={magnet?.scale / 100}
			selected={selectedId === magnet.id}
			x={magnet?.x}
			y={magnet?.y}
			height={magnet?.height}
			width={magnet?.width}
		/>
	);
}

// todo: if the magnet is remote then add the users displayname to the top of a magnet using a Group
export function MagnetRenderer({ magnet, ...props }: { magnet: Magnet }) {
	if (magnet.type === "text") {
		return <Text text={magnet.text} {...props} />;
	}

	if (magnet?.url.endsWith("webp")) {
		return <Video src={magnet.url} {...props} />;
	}

	if (magnet?.url.endsWith("gif")) {
		return <GIF src={magnet.url} {...props} />;
	}

	return <Image src={magnet.url} {...props} />;
}

// https://stackoverflow.com/questions/59741398/play-video-on-canvas-in-react-konva
export function Video({ src, selected, ...rest }: { src: string }) {
	const videoRef = useRef(null);
	const videoElement = useMemo(() => {
		const node = document.createElement("video");
		node.src = src;
		return node;
	}, [src]);

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

	return (
		<KonvaImage
			image={videoElement}
			ref={videoRef}
			{...rest}
			stroke={selected ? "red" : undefined}
			strokeWidth={selected ? 15 : undefined}
		/>
	);
}

// https://codesandbox.io/s/react-konva-gif-animation-p86qr?file=/src/index.js:1025-1060
export function GIF({ src, selected, ...rest }: { src: string }) {
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
				imageRef.current?.getLayer().draw();
			};
		});
		return () => anim?.stop();
	}, [src, canvas]);

	return (
		<KonvaImage
			image={canvas}
			ref={imageRef}
			{...rest}
			stroke={selected ? "red" : undefined}
			strokeWidth={selected ? 15 : undefined}
		/>
	);
}
export function Image({ src, visible, selected, ...rest }: { src?: string }) {
	const [image] = useImage(src || "/default_magnet.png");
	return (
		// todo: figure out better visibility false display
		<KonvaImage
			image={image}
			{...rest}
			stroke={selected ? "red" : undefined}
			strokeWidth={!selected ? undefined : 15}
			opacity={visible ? undefined : 0.7}
			strokeEnabled
		/>
	);
}
export function Text({ text, ...rest }: { text: string }) {
	// if (rest.displayName) {
	// return (
	//   <Group {...rest}>
	//     <KonvaText text={text} fontSize={200} />
	//     <KonvaText text="REMOTE_MAGNET" fontSize={50} />
	//   </Group>
	// );
	// }
	return <KonvaText text={text} fontSize={200} {...rest} />;
}
