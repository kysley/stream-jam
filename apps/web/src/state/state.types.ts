export type Magnet =
	| {
			type: "media";
			userId: string;
			id: string;
			x: number;
			y: number;
			height?: number;
			width?: number;
			url: string;
			scale: number;
			visible: boolean;
			version?: number;
	  }
	| {
			type: "text";
			userId: string;
			id: string;
			x: number;
			y: number;
			height?: number;
			width?: number;
			text: string;
			scale: number;
			visible: boolean;
			version?: number;
	  };

export type WrappedMagnet = {
	id: string;
	props: string;
	name: string;
	version: number;
	userId: string;
	overlayId?: null;
};
