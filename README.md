# line-console-bot
# LINEカウンセリングボット

このプロジェクトは、LINEとOpenAIのChatGPTを統合したカウンセリングボットの実装です。ユーザーからのメッセージに対して、臨床心理士の視点から優しく対応します。

## 機能

- LINEメッセージの受信と応答
- OpenAIのGPTモデルを使用した自然な対話
- カウンセリング専門家としての応答
- セキュアな環境変数管理

## 必要な環境

- Node.js (最新のLTSバージョン)
- npm (Node.jsのパッケージマネージャー)

## セットアップ

1. 環境変数の設定
   - `.env`ファイルを作成し、以下の変数を設定してください：
     ```
     LINE_CHANNEL_ACCESS_TOKEN=your_channel_access_token
     LINE_CHANNEL_SECRET=your_channel_secret
     OPENAI_API_KEY=your_openai_api_key
     ```

2. 依存パッケージのインストール
   ```bash
   npm install
   ```

3. ローカル開発環境の起動
   ```bash
   npm start
   ```

## 使用するパッケージ

- @line/bot-sdk: LINE Bot SDK
- dotenv: 環境変数の管理
- express: Webサーバー
- ngrok: ローカル開発用の公開URL
- openai: OpenAI APIクライアント

## ライセンス

ISC License

## 注意事項

- 本プロジェクトは教育目的または参考用として提供されています。
- 実際のカウンセリングサービスとして使用する場合は、適切な資格を有する専門家による監修が必要です。

