import { Fragment, useEffect, useRef, useState } from "react";
import { Group, Layer, Stage } from "react-konva";
import { Button } from "../../components/button";
import { MagnetRenderer } from "../../components/magnet/canvas-magnet";
import { useMagnets } from "../../hooks/use-magnets";
import { vars } from "../../theme.css";
import { Page, PageTitle } from "../start/start-page.css";
import { magnetsLayout } from "./magnets.route.css";
import { Magnet } from "../../state";
import { MagnetEditor } from "../../components/magnet-editor";
import { IconPlus, IconTrash } from "@tabler/icons-react";

export function MagnetsPage() {
	const { data, isLoading } = useMagnets();
	const [selectedMagnet, setSelectedMagnet] = useState();

	return (
		<div className={Page}>
			<h1 className={PageTitle}>{data?.length || "loading"} magnets</h1>
			<div className={magnetsLayout}>
				{isLoading || !data ? (
					<span>loading...</span>
				) : (
					<Fragment>
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								gap: 6,
								// justifyContent: "center",
								alignItems: "center",
							}}
						>
							<Button ghost>
								Create <IconPlus />
							</Button>
							{data.map(
								({ id, name, props }) =>
									props?.type === "media" && (
										<div key={id}>
											<Button
												ghost
												style={{ height: "auto" }}
												onClick={() =>
													setSelectedMagnet({ id, name, ...props })
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
						<MagnetDisplayPanel magnet={selectedMagnet} />
					</Fragment>
				)}
			</div>
		</div>
	);
}

function MagnetDisplayPanel({ magnet }: { magnet?: Magnet }) {
	const [stage, setStage] = useState({});
	const containerRef = useRef<HTMLDivElement>(null);
	useEffect(() => {
		function fitStageIntoParentContainer() {
			if (containerRef.current) {
				// var container = document.querySelector("#stage-parent");

				// now we need to fit stage into parent container
				var containerWidth = containerRef.current.offsetWidth;

				// but we also make the full scene visible
				// so we need to scale all objects on canvas
				var scale = containerWidth / 1080;

				setStage({
					width: 1080 * scale,
					height: 1920 * scale,
					x: scale,
					y: scale,
				});
				// stage.width();
				// stage.height();
				// stage.scale({  });
			}
		}
		fitStageIntoParentContainer();
	}, []);

	return (
		<Fragment>
			<MagnetEditor
				magnet={magnet}
				onMagnetChange={() => {}}
				onMagnetRemove={() => {}}
				onMagnetSave={() => {}}
				onMagnetUpdate={() => {}}
			/>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					gap: 6,
					position: "relative",
					// flexGrow: 1,
					width: "100%",
				}}
				ref={containerRef}
			>
				<div
					style={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "flex-end",
					}}
				>
					<div style={{ display: "flex", gap: 4 }}>
						<h2 style={{ margin: 0 }}>{magnet?.name}</h2>
						<Button ghost intent="danger" onClick={() => {}}>
							<IconTrash />
						</Button>
					</div>
					<div style={{ display: "flex", gap: 12 }}>
						<Button>Discard</Button>
						<Button intent="primary">Save</Button>
					</div>
				</div>

				<div
					style={{
						height: "75vh",
						width: "100%",
						backgroundColor: vars.colors.gray2,
						borderRadius: vars.radii[3],
						overflow: "hidden",
					}}
				>
					<Stage {...stage}>
						<Layer>
							<Group>
								{magnet && (
									<MagnetRenderer
										magnet={{ ...magnet.props, ...magnet }}
										draggable
									/>
								)}
							</Group>
						</Layer>
					</Stage>
				</div>
			</div>
		</Fragment>
	);
}
