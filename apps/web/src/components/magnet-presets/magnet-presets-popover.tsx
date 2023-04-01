import { ReactNode } from "react";
import { useMagnets } from "../../hooks/use-magnets";
import { useMagnetActions } from "../../state";
import { Button } from "../button";
import { Popover } from "../popover/popover";

export function MagnetPresetsPopover({ target }: { target: ReactNode }) {
	const { data, isLoading } = useMagnets();
	const { addMagnet } = useMagnetActions();

	if (isLoading) {
		return <span>loading...</span>;
	}

	return (
		<Popover target={target}>
			<div
				style={{ maxWidth: "30vw", display: "flex", flexWrap: "wrap", gap: 6 }}
			>
				{data?.map(
					({ id, name, props }) =>
						props?.type === "media" && (
							<div key={id}>
								<Button
									ghost
									style={{ height: "auto" }}
									onClick={() =>
										addMagnet({
											id: `${id}${Date.now}`,
											name,
											...props,
										})
									}
								>
									<img
										style={{ cursor: "pointer", maxWidth: 150 }}
										src={props.url || ""}
										alt={name}
									/>
								</Button>
							</div>
						),
				)}
			</div>
		</Popover>
	);
}
