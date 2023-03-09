import { vars } from "../theme.css";

export function StreamPreview() {
  if (import.meta.env.DEV) {
    return (
      <div
        style={{
          width: 1920,
          height: 1080,
          backgroundColor: vars.colors.gray2,
        }}
      />
    );
  }

  return (
    <iframe
      height={1080}
      width={1920}
      style={{ border: "none" }}
      src="https://player.twitch.tv/?channel=moonmoon&parent=localhost&muted=true&autoplay=false"
    />
  );
}
