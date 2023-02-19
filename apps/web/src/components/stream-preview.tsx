export function StreamPreview() {
  return (
    <div
      style={{
        width: 1920,
        height: 1080,
        transform: "scale(0.6)",
        position: "absolute",
        backgroundColor: "grey",
        // zIndex: -1,
      }}
    >
      <iframe
        // onClick={handleClick}
        src="https://player.twitch.tv/?channel=moonmoon&parent=localhost&muted=true"
        height="1080"
        width="1920"
      />
    </div>
  );
}
