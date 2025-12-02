import {
  AbsoluteFill,
  Audio,
  Sequence,
  useVideoConfig,
  staticFile,
} from "remotion";
import { KenBurnsEffect } from "./KenBurnsEffect";

export interface RealEstateVideoProps {
  photos: string[];
  audioUrl?: string;
  title?: string;
  location?: string;
  price?: string;
}

// Ken Burns effect directions to cycle through
const kenBurnsDirections: Array<"zoomIn" | "zoomOut" | "panLeft" | "panRight" | "panUp" | "panDown"> = [
  "zoomIn",
  "panRight",
  "zoomOut",
  "panLeft",
  "panUp",
  "panDown",
];

export const RealEstateVideo: React.FC<RealEstateVideoProps> = ({
  photos,
  audioUrl,
  title,
  location,
  price,
}) => {
  const { fps, durationInFrames } = useVideoConfig();

  // Calculate duration per photo
  const photoCount = photos.length || 1;
  const framesPerPhoto = Math.floor(durationInFrames / photoCount);

  // Placeholder photos if none provided
  const displayPhotos = photos.length > 0
    ? photos
    : [
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1080",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1080",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1080",
      ];

  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      {/* Photo Sequences with Ken Burns Effect */}
      {displayPhotos.map((photo, index) => (
        <Sequence
          key={index}
          from={index * framesPerPhoto}
          durationInFrames={framesPerPhoto}
        >
          <KenBurnsEffect
            src={photo}
            durationInFrames={framesPerPhoto}
            direction={kenBurnsDirections[index % kenBurnsDirections.length]}
          />
        </Sequence>
      ))}

      {/* Title Overlay */}
      {title && (
        <Sequence from={0} durationInFrames={fps * 3}>
          <AbsoluteFill
            style={{
              justifyContent: "flex-end",
              alignItems: "center",
              paddingBottom: 200,
            }}
          >
            <div
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.7)",
                padding: "20px 40px",
                borderRadius: 12,
                maxWidth: "90%",
              }}
            >
              <h1
                style={{
                  color: "#fff",
                  fontSize: 48,
                  fontWeight: "bold",
                  textAlign: "center",
                  margin: 0,
                }}
              >
                {title}
              </h1>
              {location && (
                <p
                  style={{
                    color: "#ccc",
                    fontSize: 28,
                    textAlign: "center",
                    margin: "10px 0 0 0",
                  }}
                >
                  📍 {location}
                </p>
              )}
            </div>
          </AbsoluteFill>
        </Sequence>
      )}

      {/* Price Overlay at the end */}
      {price && (
        <Sequence from={durationInFrames - fps * 4} durationInFrames={fps * 4}>
          <AbsoluteFill
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                backgroundColor: "rgba(220, 38, 38, 0.9)",
                padding: "30px 60px",
                borderRadius: 16,
              }}
            >
              <p
                style={{
                  color: "#fff",
                  fontSize: 56,
                  fontWeight: "bold",
                  margin: 0,
                }}
              >
                {price}
              </p>
            </div>
          </AbsoluteFill>
        </Sequence>
      )}

      {/* Audio Track */}
      {audioUrl && <Audio src={audioUrl} />}
    </AbsoluteFill>
  );
};

export default RealEstateVideo;

