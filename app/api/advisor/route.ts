import {
  consumeStream,
  convertToModelMessages,
  streamText,
  UIMessage,
} from "ai";
import { auth } from "@clerk/nextjs/server";
import {
  advisorModel,
  advisorProviderOptions,
} from "@/lib/constants/advisor-model";
import { ensureCurrentUser } from "@/lib/utils/ensure-user";
import { buildAdvisorElectionContext } from "@/lib/utils/advisor-context";

export const maxDuration = 30;

export async function POST(req: Request) {
  await auth.protect();
  await ensureCurrentUser();

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
