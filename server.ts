import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000;

// Shared Gemini client initialization
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

app.post("/api/generate-site", async (req: express.Request, res: express.Response) => {
  try {
    const { prompt, title } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: "Missing prompt parameter" });
    }

    const systemInstruction = `You are an elite frontend engineer who specializes in creating ultra-clean, minimal, fully functional, beautifully styled, single-file HTML/JS/CSS websites for instant deployment in seconds.
The website should look absolutely spectacular, with professional spacing, responsive Tailwind CSS (embedded via CDN or standard styles), rich interactivity (dynamic calculations, games, dashboard controls, forms, or calculators), and clean visual assets/icons (utilizing Lucide SVGs or highly polished CSS illustrations).
Never output markdown codeblocks. Return JSON only conforming to the requested schema.`;

    const modelPrompt = `Create a fully functional, beautiful, clean and minimalist web page about "${prompt}".
The website title should be inspired by "${title || "Web Project"}".
The user wants to deploy this page on Vercel. Make sure the code is completely self-contained, interactive, fully fleshed out with realistic content, and includes animations.
Include:
1. Complete polished index.html. Include beautiful custom colors, modern fonts (such as Inter or Space Grotesk via CDN), direct script tags with complete interactive JS features.
2. A vercel.json configuration that supports this static site deployment.
3. A simple package.json metadata representation for deployment tracking.
4. A README.md details explaining the app's features in detail and deployment instructions.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: modelPrompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          required: ["html", "vercelJson", "packageJson", "readme"],
          properties: {
            html: {
              type: Type.STRING,
              description: "The complete, polished, interactive HTML code containing all inline styles or Tailwind CSS CDN links, and custom javascript logic.",
            },
            vercelJson: {
              type: Type.STRING,
              description: "Recommended vercel.json file content (e.g. rewrite rules, headers). Keep it structured as correct stringified JSON.",
            },
            packageJson: {
              type: Type.STRING,
              description: "A lightweight package.json metadata file suited for Vercel deploy. Keep it structured as correct stringified JSON.",
            },
            readme: {
              type: Type.STRING,
              description: "A beautifully written README.md detailing the website features, file structure, and instructions to deploy manually to Vercel.",
            }
          }
        }
      }
    });

    const outputText = response.text;
    if (!outputText) {
      throw new Error("No response text received from Gemini");
    }

    const data = JSON.parse(outputText.trim());
    res.json(data);
  } catch (error: any) {
    console.error("Gemini Generation Error:", error);
    res.status(500).json({ error: error.message || "Failed to generate site code" });
  }
});

// Vite middleware flow
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
