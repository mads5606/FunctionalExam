import {OrbitCommand, OrbitModel} from "../OrbitModel";
import {IOrbit} from "../Orbit";
import * as assert from "assert";

export class deleteFileCommand implements OrbitCommand {
  constructor(readonly fileIndex: number) {
  }

  check(model: OrbitModel) {
    return model.files.length > 0;
  }

  async run(model: OrbitModel, system: IOrbit) {
    const realIndex = this.fileIndex % model.files.length;
    const file = model.files[realIndex];
    const out = await system.deleteFile(file.id, file.version);
    assert.strictEqual(out.status, 200);
    model.files.splice(realIndex, 1);
  }

  toString() {
    return "deleteFileCommand";
  }
}
