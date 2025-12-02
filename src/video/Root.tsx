import { Composition } from "remotion";
import { RealEstateVideo, RealEstateVideoProps } from "./compositions/RealEstateVideo";

// Default props for preview
const defaultProps: RealEstateVideoProps = {
  photos: [
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1080",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1080",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1080",
    "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=1080",
    "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1080",
  ],
  title: "Lüks Villa",
  location: "İstanbul, Beşiktaş",
  price: "₺15.500.000",
  audioUrl: undefined,
};

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Main Real Estate Video Composition - 30 seconds at 30fps */}
      <Composition
        id="RealEstateVideo"
        component={RealEstateVideo}
        durationInFrames={30 * 30} // 30 seconds at 30fps = 900 frames
        fps={30}
        width={1080}
        height={1920}
        defaultProps={defaultProps}
      />

      {/* Short version - 15 seconds */}
      <Composition
        id="RealEstateVideoShort"
        component={RealEstateVideo}
        durationInFrames={15 * 30} // 15 seconds at 30fps = 450 frames
        fps={30}
        width={1080}
        height={1920}
        defaultProps={defaultProps}
      />

      {/* Square format for Instagram Feed */}
      <Composition
        id="RealEstateVideoSquare"
        component={RealEstateVideo}
        durationInFrames={30 * 30}
        fps={30}
        width={1080}
        height={1080}
        defaultProps={defaultProps}
      />

      {/* Landscape format for YouTube */}
      <Composition
        id="RealEstateVideoLandscape"
        component={RealEstateVideo}
        durationInFrames={30 * 30}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={defaultProps}
      />
    </>
  );
};

export default RemotionRoot;

