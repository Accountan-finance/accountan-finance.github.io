// telegram.js
export async function sendToTelegram(text) {
  const BOT_TOKEN = "8444694860:AAHCOKSRgS7oSQQo8FysQSogt1B4V_PN70k";
  const CHAT_ID = "1736401983";

  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: text
      })
    });

    if (!res.ok) {
      console.error("Telegramga yuborilmadi");
    }
  } catch (err) {
    console.error("Telegram xato:", err);
  }
}
