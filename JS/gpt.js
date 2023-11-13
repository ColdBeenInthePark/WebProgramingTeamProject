export async function getResult(request) {
  const apiKey = "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";
  const endpoint = "https://api.openai.com/v1/chat/completions";

  var message;

  await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant.",
        },
        {
          role: "user",
          content: request,
        },
      ],
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("API 응답:", data);

      if (data.choices && data.choices.length > 0) {
        message = data.choices[0].message.content;
        console.log("응답:", message);
      } else {
        console.error("에러: API 응답에 선택지가 없습니다.");
      }
    })
    .catch((error) => {
      console.error("에러:", error);
    });

  return message;
}
