import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from "axios";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

/**
 * Generate a real estate video script using Google Gemini
 * @param {Object} propertyData - Property details
 * @returns {Promise<string>} - Generated script text
 */
export async function generateScript(propertyData) {
  const {
    title,
    location,
    price,
    bedrooms,
    bathrooms,
    area,
    features,
    propertyType,
    language = "tr"
  } = propertyData;

  const languagePrompts = {
    tr: {
      intro: "Sen profesyonel bir emlak pazarlama uzmanısın.",
      task: `Aşağıdaki emlak için 30 saniyelik, heyecan verici ve satış odaklı bir video metni yaz.
      Metin, Instagram Reels veya TikTok için uygun olmalı - kısa, çarpıcı ve akılda kalıcı.
      Her cümle yaklaşık 3-4 saniye uzunluğunda olmalı (toplam 8-10 cümle).
      Emoji kullanma. Sadece düz metin yaz.`,
      format: "Çıktı formatı: Sadece video metni, başka hiçbir şey yok."
    },
    en: {
      intro: "You are a professional real estate marketing expert.",
      task: `Write a 30-second exciting, sales-focused video script for the following property.
      The script should be suitable for Instagram Reels or TikTok - short, impactful, and memorable.
      Each sentence should be approximately 3-4 seconds long (total 8-10 sentences).
      Don't use emojis. Write plain text only.`,
      format: "Output format: Only the video script text, nothing else."
    }
  };

  const prompts = languagePrompts[language] || languagePrompts.tr;

  const prompt = `${prompts.intro}

${prompts.task}

Emlak Bilgileri:
- Başlık: ${title || "Lüks Daire"}
- Konum: ${location || "İstanbul"}
- Fiyat: ${price || "Belirtilmemiş"}
- Oda Sayısı: ${bedrooms || "3"} yatak odası
- Banyo: ${bathrooms || "2"} banyo
- Alan: ${area || "150"} m²
- Emlak Tipi: ${propertyType || "Daire"}
- Özellikler: ${features || "Deniz manzarası, kapalı otopark, güvenlik"}

${prompts.format}`;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    console.log("✅ Script generated successfully");
    return text.trim();
  } catch (error) {
    console.error("❌ Gemini API Error:", error.message);
    throw new Error(`Script generation failed: ${error.message}`);
  }
}

/**
 * Convert text to speech using ElevenLabs API
 * @param {string} text - Text to convert to speech
 * @param {string} voiceId - ElevenLabs voice ID
 * @returns {Promise<string>} - Path to the generated audio file
 */
export async function textToSpeech(text, voiceId = null) {
  const apiKey = process.env.ELEVENLABS_API_KEY;
  const selectedVoiceId = voiceId || process.env.ELEVENLABS_VOICE_ID || "21m00Tcm4TlvDq8ikWAM";

  if (!apiKey) {
    throw new Error("ElevenLabs API key not configured");
  }

  const url = `https://api.elevenlabs.io/v1/text-to-speech/${selectedVoiceId}`;

  try {
    const response = await axios.post(
      url,
      {
        text: text,
        model_id: "eleven_multilingual_v2",
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75,
          style: 0.5,
          use_speaker_boost: true
        }
      },
      {
        headers: {
          "Accept": "audio/mpeg",
          "Content-Type": "application/json",
          "xi-api-key": apiKey
        },
        responseType: "arraybuffer"
      }
    );

    // Save audio file
    const audioFileName = `voice_${uuidv4()}.mp3`;
    const audioFilePath = path.join(__dirname, "..", "temp", audioFileName);
    
    fs.writeFileSync(audioFilePath, response.data);
    
    console.log("✅ Audio generated successfully:", audioFileName);
    return {
      filePath: audioFilePath,
      fileName: audioFileName,
      url: `/temp/${audioFileName}`
    };
  } catch (error) {
    console.error("❌ ElevenLabs API Error:", error.response?.data || error.message);
    throw new Error(`Text-to-speech failed: ${error.message}`);
  }
}

/**
 * Generate complete video content (script + audio)
 * @param {Object} propertyData - Property details
 * @returns {Promise<Object>} - Script text and audio file path
 */
export async function generateVideoContent(propertyData) {
  // Step 1: Generate script
  const script = await generateScript(propertyData);
  
  // Step 2: Convert to speech
  const audio = await textToSpeech(script);
  
  return {
    script,
    audio,
    status: "success"
  };
}

