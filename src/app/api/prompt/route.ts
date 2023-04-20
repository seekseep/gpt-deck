import { Configuration, OpenAIApi } from "openai";

export async function POST(request: Request) {

  const data = await request.json()
  const apiKey = data.apiKey
  const prompt = data.prompt
  try {
    if (typeof data.apiKey !== "string") throw Error("Invalid Type ApiKey")
    if (typeof data.prompt !== "string") throw Error("Invalid Type Prompt")
  } catch (error) {
    return new Response(String(error), {
      status: 400
    })
  }

  try {
    const configuration = new Configuration({ apiKey });
    const openai = new OpenAIApi(configuration);

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "user", content: prompt }
      ],
      max_tokens: 2000,
      temperature: 0.6,
    });

    return new Response(completion.data.choices[0].message?.content, {
      status: 200,
      headers: {
        "Content-Type": "text/plain"
      }
    })
  } catch (error) {
    return new Response(String(error), {
      status: 500
    })
  }
}
