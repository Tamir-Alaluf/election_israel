import {
  consumeStream,
  convertToModelMessages,
  streamText,
  UIMessage,
} from "ai"
import {
  parties,
  leaders,
  allPartyComparisonParameters,
  leaderParameters,
} from "@/lib/election-data"

export const maxDuration = 30

// Build context from election data
function buildElectionContext() {
  const partyInfo = parties.map((p) => {
    const values = Object.entries(p.values)
      .map(([key, val]) => `${key}: ${val}`)
      .join(", ")
    return `${p.name} (${p.leader}): ${values}`
  }).join("\n")

  const leaderInfo = leaders.map((l) => {
    const values = Object.entries(l.values)
      .map(([key, val]) => `${key}: ${val}`)
      .join(", ")
    return `${l.name} (${l.party}): ${values}`
  }).join("\n")

  const partyParams = allPartyComparisonParameters.map((p) => p.label).join(", ")

  const leaderParams = leaderParameters.map(p => p.label).join(", ")

  return `
אתה יועץ פוליטי אובייקטיבי ומקצועי לבחירות בישראל 2026.
תפקידך לעזור לאזרחים להבין את המפה הפוליטית ולמצוא את המפלגה שמתאימה לערכים שלהם.

כללים חשובים:
- היה אובייקטיבי ונטול משוא פנים
- הצג עובדות ונתונים
- עזור למשתמש לגבש דעה משלו, אל תכפה עליו בחירה
- דבר בעברית תקנית וידידותית
- התמקד בנושאים פוליטיים ענייניים
- אם אינך יודע משהו, אמור זאת

פרמטרים להשוואת מפלגות: ${partyParams}
פרמטרים להשוואת מנהיגים: ${leaderParams}

מידע על מפלגות:
${partyInfo}

מידע על מנהיגים:
${leaderInfo}
`.trim()
}

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json()

  const result = streamText({
    model: "openai/gpt-4o-mini",
    system: buildElectionContext(),
    messages: await convertToModelMessages(messages),
    abortSignal: req.signal,
  })

  return result.toUIMessageStreamResponse({
    originalMessages: messages,
    consumeSseStream: consumeStream,
  })
}
