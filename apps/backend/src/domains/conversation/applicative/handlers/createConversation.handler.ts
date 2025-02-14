import type { Picture } from "../../domain/picture";
import type { UserId } from "../../../user/domain/values/userId.value";
import type { ConversationStore } from "../conversation.store";
import type { FileSystemService } from "../fileSystem.service";
import type { AiService } from "../ai.service";
import { Conversation } from "../../domain/conversation";

export class CreateConversationHandler {
  constructor(
    private readonly conversationStore: ConversationStore,
    private readonly fileSystemService: FileSystemService,
    private readonly aiService: AiService,
  ) {}

  async handle(picture: Picture, userId: UserId) {
    const drugName = await this.aiService.findDrug(picture);

    const thumbnail = await this.fileSystemService.persistPicture(picture);

    const conversation = Conversation.create(drugName, thumbnail, userId);

    await this.conversationStore.save(conversation);

    return conversation.id;
  }
}
