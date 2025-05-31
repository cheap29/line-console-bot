// index.js (v4 系用サンプル)

require("dotenv").config();
const express = require("express");
const { Client, middleware } = require("@line/bot-sdk");
// OpenAI SDK の v4 系を使用
const { OpenAI } = require("openai");

const LINE_CHANNEL_ACCESS_TOKEN = process.env.LINE_CHANNEL_ACCESS_TOKEN;
const LINE_CHANNEL_SECRET = process.env.LINE_CHANNEL_SECRET;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// LINE SDK クライアント初期化
const lineClient = new Client({
  channelAccessToken: LINE_CHANNEL_ACCESS_TOKEN,
  channelSecret: LINE_CHANNEL_SECRET,
});

// v4 系 OpenAI クライアント初期化
const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

const app = express();

// Webhook のエンドポイント。署名検証ミドルウェアあり
app.post(
  "/webhook",
  middleware({ channelSecret: LINE_CHANNEL_SECRET }),
  async (req, res) => {
    try {
      const events = req.body.events;

      await Promise.all(
        events.map(async (event) => {
          if (event.type === "message" && event.message.type === "text") {
            const userMessage = event.message.text;

            // ChatGPT （v4 系）へのリクエスト
            const response = await openai.chat.completions.create({
              model: "gpt-4o-mini", // または "gpt-4o"、"gpt-4o-32k" など
              messages: [
                {
                  role: "system",
                  content:
                    "あなたは臨床心理士の資格をもったカウンセラーです。優しいトーンで回答してください。",
                },
                { role: "user", content: userMessage },
              ],
              temperature: 0.7,
              max_tokens: 1000,
            });

            // 返ってきたメッセージを取り出し
            const aiReply =
              response.choices?.[0]?.message?.content.trim() ||
              "すみません、お返事できませんでした。";

            // LINE に返信
            await lineClient.replyMessage(event.replyToken, {
              type: "text",
              text: aiReply,
            });
          }
        })
      );

      res.status(200).send("OK");
    } catch (err) {
      console.error(err);
      res.status(500).end();
    }
  }
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
