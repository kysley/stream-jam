export function StreamPreview() {
  return (
    <div
      style={{
        justifySelf: "center",
        display: "flex",
        // transform: "scale(0.6)",
      }}
    >
      <iframe
        height={1080 * 0.6}
        width={1920 * 0.6}
        className="stream-preview"
        src="https://player.twitch.tv/?channel=moonmoon&parent=localhost&muted=true&autoplay=false"
      />
    </div>
  );
}
