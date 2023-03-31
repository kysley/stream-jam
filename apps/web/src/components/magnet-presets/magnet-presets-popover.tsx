import { ReactNode } from "react";
import { useMagnets } from "../../hooks/use-magnets";
import { useMagnetActions } from "../../state";
import { Popover } from "../popover/popover";

export function MagnetPresetsPopover({ target }: { target: ReactNode }) {
	const { data, isLoading } = useMagnets();
	const { addMagnet } = useMagnetActions();

	if (isLoading) {
		return <span>loading...</span>;
	}

	return (
		<Popover target={target}>
			<div style={{ width: "30vw" }}>
				{data?.map(({ id, name, props }) => (
					<div style={{ cursor: "pointer" }} key={id}>
						<img
							src={props.url || ""}
							alt={name}
							onClick={() =>
								addMagnet({
									id: Date.now(),
									...props,
								})
							}
						/>
						{/* <div>{edit && <IconEdit />}</div> */}
					</div>
				))}
			</div>
		</Popover>
	);
}
