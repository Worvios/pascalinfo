export default function SvgDivider({
  direction = "down",
  color = "currentColor",
}: {
  direction?: "down" | "up";
  color?: string;
}) {
  return (
    <div className="w-full overflow-hidden leading-none">
      <svg
        viewBox="0 0 1440 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`w-full h-12 md:h-20 ${direction === "up" ? "rotate-180" : ""}`}
        style={{ color }}
      >
        <path
          d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z"
          fill="currentColor"
          fillOpacity="0.12"
        />
      </svg>
    </div>
  );
}
