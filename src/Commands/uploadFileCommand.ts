import {OrbitCommand, OrbitModel} from "../OrbitModel";
import {IOrbit} from "../Orbit";
import * as assert from "assert";

export class uploadFileCommand implements OrbitCommand {
  constructor(readonly fileIndex: number, readonly content: string) {
  }

  check(model: OrbitModel) {
    return model.files.length > 0;
  }

  async run(model: OrbitModel, system: IOrbit) {
    const file = model.files[this.fileIndex % model.files.length];
    const out = await system.uploadFile(file.id, file.version, this.content);
    assert.strictEqual(out.status, 200);
    assert.strictEqual(out.data["version"], file.version + 1);
    file.content = this.content;
    file.version = out.data["version"];
  }

  toString() {
    return "uploadFileCommand";
  }
}
