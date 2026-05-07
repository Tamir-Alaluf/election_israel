import {
  consumeStream,
  convertToModelMessages,
  streamText,
  UIMessage,
} from "ai";
import {
  advisorModel,
  advisorProviderOptions,
} from "@/lib/ai/advisor-model";
import { buildAdvisorElectionContext } from "@/lib/data/advisor-context";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const system = await buildAdvisorElectionContext();

  const result = streamText({
    model: advisorModel,
    system,
    messages: await convertToModelMessages(messages),
    providerOptions: advisorProviderOptions,
    abortSignal: req.signal,
  });

  return result.toUIMessageStreamResponse({
    originalMessages: messages,
    consumeSseStream: consumeStream,
  });
}
