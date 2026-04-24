import {
  consumeStream,
  convertToModelMessages,
  streamText,
  UIMessage,
} from "ai";
import { buildAdvisorElectionContext } from "@/lib/data/advisor-context";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const system = await buildAdvisorElectionContext();

  const result = streamText({
    model: "openai/gpt-4o-mini",
    system,
    messages: await convertToModelMessages(messages),
    abortSignal: req.signal,
  });

  return result.toUIMessageStreamResponse({
    originalMessages: messages,
    consumeSseStream: consumeStream,
  });
}
