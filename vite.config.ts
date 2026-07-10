import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';
import {GoogleGenAI} from '@google/genai';

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'api-server',
        configureServer(server) {
          server.middlewares.use(async (req, res, next) => {
            if (req.url?.startsWith('/api/gemini/generate') && req.method === 'POST') {
              try {
                // Read body manually for simplicity and compatibility
                const buffers: Buffer[] = [];
                for await (const chunk of req) {
                  buffers.push(chunk as Buffer);
                }
                const bodyStr = Buffer.concat(buffers).toString('utf-8');
                const body = JSON.parse(bodyStr || '{}');

                const apiKey = process.env.GEMINI_API_KEY;
                if (!apiKey) {
                  res.statusCode = 500;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ error: 'GEMINI_API_KEY environment variable is not configured.' }));
                  return;
                }

                const ai = new GoogleGenAI({
                  apiKey: apiKey,
                  httpOptions: {
                    headers: {
                      'User-Agent': 'aistudio-build',
                    }
                  }
                });

                const { prompt, systemInstruction, temperature, useSearch, image } = body;

                const contents: any[] = [];
                if (image && image.data && image.mimeType) {
                  contents.push({
                    inlineData: {
                      mimeType: image.mimeType,
                      data: image.data,
                    },
                  });
                }
                contents.push(prompt);

                const config: any = {};
                if (systemInstruction) {
                  config.systemInstruction = systemInstruction;
                }
                if (temperature !== undefined) {
                  config.temperature = Number(temperature);
                }
                if (useSearch) {
                  config.tools = [{ googleSearch: {} }];
                }

                const response = await ai.models.generateContent({
                  model: 'gemini-3.5-flash',
                  contents: contents,
                  config: config,
                });

                const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
                const groundingSources = chunks.map((c: any) => ({
                  title: c.web?.title || 'Grounding Source',
                  uri: c.web?.uri || '',
                })).filter((s: any) => s.uri);

                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({
                  text: response.text || '',
                  groundingSources,
                }));
              } catch (err: any) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: err.message || 'An error occurred during text generation.' }));
              }
            } else {
              next();
            }
          });
        }
      }
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
