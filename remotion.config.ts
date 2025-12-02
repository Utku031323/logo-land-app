import { Config } from "@remotion/cli/config";

// Video rendering configuration
Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);

// Codec settings - using H.264 for broad compatibility
Config.setCodec("h264");

// Quality settings
Config.setQuality(80);

// Concurrency for faster rendering
Config.setConcurrency(4);

// Output location
Config.setOutputLocation("./out/video.mp4");

// Enable Chrome headless for rendering
Config.setChromiumOpenGlRenderer("angle");

// Mute audio warnings in development
Config.setMuted(false);

export default Config;

