// telegram.js
export function sendToTelegram(text) {
  const BOT_TOKEN = "8444694860:AAHCOKSRgS7oSQQo8FysQSogt1B4V_PN70k";
  const CHAT_ID = "1736401983";

  const url =
    `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage` +
    `?chat_id=${CHAT_ID}` +
    `&text=${encodeURIComponent(text)}`;

  // 👇 ENG MUHIM JOY (CORSsiz ishlaydi)
  const img = new Image();
  img.src = url;
}
