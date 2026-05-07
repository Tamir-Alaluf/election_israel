import type { AdvisorProfile } from "@/features/advisor/types";

/** Hebrew summary injected as the first user message when starting chat from results. */
export function formatAdvisorProfileForChat(
  profile: AdvisorProfile,
  partyFocus?: string,
): string {
  const lines = [
    "סיכום השאלון שלי:",
    `- גישה ביטחונית: ${profile.security}`,
    `- גישה כלכלית: ${profile.economy}`,
    `- שילוב חרדים בממשלה: ${profile.harediGov}`,
    `- שילוב ערבים בממשלה: ${profile.arabGov}`,
  ];
  if (profile.aiFollowUpQuestion && profile.aiFollowUpAnswer) {
    lines.push(`- ${profile.aiFollowUpQuestion}: ${profile.aiFollowUpAnswer}`);
  }
  if (partyFocus) {
    lines.push("", `אשמח להמשיך לדבר על ההתאמה שלי למפלגת ${partyFocus}.`);
  }
  return lines.join("\n");
}
