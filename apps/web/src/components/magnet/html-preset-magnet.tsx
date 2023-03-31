import { Magnet } from "../../state";

export type PresetMagnet = {};

export function HtmlPresetMagnet({ magnet }: { magnet: Magnet }) {
	return (
		<div key={magnet.id}>
			<img src={magnet.props.url} alt={magnet.name} />
			<div>{edit && <IconEdit />}</div>
		</div>
	);
}
