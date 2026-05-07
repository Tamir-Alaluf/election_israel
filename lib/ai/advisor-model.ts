import {
  google,
  type GoogleLanguageModelOptions,
} from "@ai-sdk/google";

export const advisorModel = google("gemini-2.5-flash");

/** Hebrew political content can trip Gemini defaults; loosen to BLOCK_ONLY_HIGH. */
export const advisorProviderOptions = {
  google: {
    safetySettings: [
      { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_ONLY_HIGH" },
      { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_ONLY_HIGH" },
      {
        category: "HARM_CATEGORY_DANGEROUS_CONTENT",
        threshold: "BLOCK_ONLY_HIGH",
      },
      {
        category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
        threshold: "BLOCK_ONLY_HIGH",
      },
    ],
  } satisfies GoogleLanguageModelOptions,
};
