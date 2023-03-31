export type Magnet =
	| {
			type: "media";
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
