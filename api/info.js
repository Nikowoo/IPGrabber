if (WEBHOOK_URL.startsWith("http")) {
  fetch(WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      content: "```json\n" + JSON.stringify(payload, null, 2) + "\n```"
    })
  }).catch(() => {});
}
