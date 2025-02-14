import type OpenAi from "openai";

import type { AiService } from "../applicative/ai.service";
import type { Picture } from "../domain/picture";

export class OpenaiAiService implements AiService {
  constructor(private readonly openAi: OpenAi) {}

  async findDrug(picture: Picture) {
    await this.openAi.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${picture.toBase64()}`,
              },
            },
          ],
        },
      ],
      stream: false,
    });
  }
}
