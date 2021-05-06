import {OrbitCommand, OrbitModel} from "../OrbitModel";
import {IOrbit} from "../Orbit";
import * as assert from "assert";

export class downloadCommand implements OrbitCommand {
  constructor(readonly fileIndex: number) {
  }

  check(model: OrbitModel) {
    return model.files.length > 0;
  }

  async run(model: OrbitModel, system: IOrbit) {
    const file = model.files[this.fileIndex % model.files.length];
    const out = await system.getFile(file.id);
    assert.strictEqual(out.status, 200);
    assert.strictEqual(out.data, file.content);
  }

  toString() {
    return "downloadCommand";
  }
}
