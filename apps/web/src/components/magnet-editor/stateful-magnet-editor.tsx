import { useEffect } from "react";
import { useEmitMagnetUpdate } from "../../hooks/use-emit-magnet-update";
import { useSaveMagnet } from "../../hooks/use-save-magnet";
import { useUpdateMagnet } from "../../hooks/use-update-magnet";
import { useMagnetActions, useManget, useSelectedMagnetId } from "../../state";
import { MagnetEditor } from "./magnet-editor";

export function StatefulMagnetEditor({ emit = false }) {
	const magnetId = useSelectedMagnetId();
	const magnet = useManget(magnetId);

	const { mutateAsync: saveMagnet } = useSaveMagnet();
	const { mutateAsync: updateMagnet } = useUpdateMagnet();

	const { updateMagnet: updateMagnetLocally, removeMagnet } =
		useMagnetActions();

	const { emitMagnetUpdate } = useEmitMagnetUpdate();

	useEffect(() => {
		if (emit && magnet) {
			emitMagnetUpdate(magnet);
		}
	}, [magnet, emit]);

	return (
		<MagnetEditor
			magnet={magnet}
			onMagnetChange={(magnet) => updateMagnetLocally(magnet.id, magnet)}
			onMagnetRemove={removeMagnet}
			onMagnetSave={(payload) => saveMagnet(payload.name, payload.props)}
			onMagnetUpdate={(payload) => updateMagnet(payload.name, payload.props)}
		/>
	);
}
