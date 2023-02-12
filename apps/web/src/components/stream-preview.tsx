export function StreamPreview() {
  return (
    <div
      style={{
        width: 1920,
        height: 1080,
        transform: "scale(0.6)",
        position: "absolute",
        backgroundColor: "grey",
        zIndex: -1,
      }}
    ></div>
  );
}
