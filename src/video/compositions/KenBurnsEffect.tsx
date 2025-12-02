import { AbsoluteFill, Img, interpolate, useCurrentFrame } from "remotion";

interface KenBurnsEffectProps {
  src: string;
  durationInFrames: number;
  direction?: "zoomIn" | "zoomOut" | "panLeft" | "panRight" | "panUp" | "panDown";
}

export const KenBurnsEffect: React.FC<KenBurnsEffectProps> = ({
  src,
  durationInFrames,
  direction = "zoomIn",
}) => {
  const frame = useCurrentFrame();

  // Calculate animation progress (0 to 1)
  const progress = frame / durationInFrames;

  // Define animation parameters based on direction
  const getTransform = () => {
    switch (direction) {
      case "zoomIn":
        return {
          scale: interpolate(frame, [0, durationInFrames], [1, 1.3], {
            extrapolateRight: "clamp",
          }),
          translateX: 0,
          translateY: 0,
        };
      case "zoomOut":
        return {
          scale: interpolate(frame, [0, durationInFrames], [1.3, 1], {
            extrapolateRight: "clamp",
          }),
          translateX: 0,
          translateY: 0,
        };
      case "panLeft":
        return {
          scale: 1.2,
          translateX: interpolate(frame, [0, durationInFrames], [5, -5], {
            extrapolateRight: "clamp",
          }),
          translateY: 0,
        };
      case "panRight":
        return {
          scale: 1.2,
          translateX: interpolate(frame, [0, durationInFrames], [-5, 5], {
            extrapolateRight: "clamp",
          }),
          translateY: 0,
        };
      case "panUp":
        return {
          scale: 1.2,
          translateX: 0,
          translateY: interpolate(frame, [0, durationInFrames], [5, -5], {
            extrapolateRight: "clamp",
          }),
        };
      case "panDown":
        return {
          scale: 1.2,
          translateX: 0,
          translateY: interpolate(frame, [0, durationInFrames], [-5, 5], {
            extrapolateRight: "clamp",
          }),
        };
      default:
        return { scale: 1, translateX: 0, translateY: 0 };
    }
  };

  const { scale, translateX, translateY } = getTransform();

  // Fade in/out effect
  const opacity = interpolate(
    frame,
    [0, 15, durationInFrames - 15, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#000",
        overflow: "hidden",
      }}
    >
      <Img
        src={src}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: `scale(${scale}) translate(${translateX}%, ${translateY}%)`,
          opacity,
        }}
      />
    </AbsoluteFill>
  );
};

export default KenBurnsEffect;

