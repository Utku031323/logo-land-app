import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { generateScript, textToSpeech, generateVideoContent } from "./services/aiService.js";

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:3000", "http://127.0.0.1:5173"],
  credentials: true
}));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// Serve static files from temp folder
app.use("/temp", express.static(path.join(__dirname, "temp")));

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ 
    status: "ok", 
    message: "ReelEstate API is running",
    timestamp: new Date().toISOString()
  });
});

/**
 * POST /api/generate-script
 * Generate a video script from property data
 */
app.post("/api/generate-script", async (req, res) => {
  try {
    const propertyData = req.body;
    
    console.log("📝 Generating script for:", propertyData.title || "Unnamed Property");
    
    const script = await generateScript(propertyData);
    
    res.json({
      success: true,
      script,
      message: "Script generated successfully"
    });
  } catch (error) {
    console.error("Script generation error:", error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * POST /api/text-to-speech
 * Convert text to speech using ElevenLabs
 */
app.post("/api/text-to-speech", async (req, res) => {
  try {
    const { text, voiceId } = req.body;
    
    if (!text) {
      return res.status(400).json({
        success: false,
        error: "Text is required"
      });
    }
    
    console.log("🎤 Converting text to speech...");
    
    const audio = await textToSpeech(text, voiceId);
    
    res.json({
      success: true,
      audio,
      message: "Audio generated successfully"
    });
  } catch (error) {
    console.error("Text-to-speech error:", error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * POST /api/generate-video-content
 * Generate complete video content (script + audio)
 */
app.post("/api/generate-video-content", async (req, res) => {
  try {
    const propertyData = req.body;
    
    console.log("🎬 Generating complete video content for:", propertyData.title || "Unnamed Property");
    
    const result = await generateVideoContent(propertyData);
    
    res.json({
      success: true,
      ...result,
      message: "Video content generated successfully"
    });
  } catch (error) {
    console.error("Video content generation error:", error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Server error:", err);
  res.status(500).json({
    success: false,
    error: "Internal server error"
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`
🚀 ReelEstate API Server
========================
📍 Running on: http://localhost:${PORT}
📝 Script API: POST /api/generate-script
🎤 TTS API: POST /api/text-to-speech
🎬 Full API: POST /api/generate-video-content
❤️  Health: GET /api/health
========================
  `);
});

