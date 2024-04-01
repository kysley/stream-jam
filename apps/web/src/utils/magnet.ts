import type { Magnet, WrappedMagnet } from "../state";

export function unwrapMagnet(wrappedMagnet: WrappedMagnet): Magnet {
	return {
		...JSON.parse(wrappedMagnet.props),
		id: wrappedMagnet.id,
		userId: wrappedMagnet.userId,
	};
}

export function makeMagnetProps(
	magnet: Magnet,
	{ preservePosition = false } = {},
) {
	return {
		version: magnet.version,
		url: magnet.type === "media" ? magnet.url : undefined,
		text: magnet.type === "text" ? magnet.text : undefined,
		scale: magnet.scale,
		type: magnet.type,
		height: magnet.height,
		width: magnet.width,
		visible: magnet.visible,
		...(preservePosition && { x: magnet.x, y: magnet.y }),
	};
}
