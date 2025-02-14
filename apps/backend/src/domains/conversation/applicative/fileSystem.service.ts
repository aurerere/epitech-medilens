import type { Picture } from "../domain/picture";
import type { StoredFileUrl } from "../domain/values/storedFileUrl.value";

export interface FileSystemService {
  persistPicture(picture: Picture): Promise<StoredFileUrl>;
}
