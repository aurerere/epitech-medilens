import type { Picture } from "../domain/picture";
import type { DrugName } from "../domain/values/drugName.value";

export interface AiService {
  findDrug(picture: Picture): Promise<DrugName>;
}
