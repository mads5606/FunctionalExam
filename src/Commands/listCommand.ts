import {OrbitCommand, OrbitModel} from "../OrbitModel";
import {IOrbit} from "../Orbit";
import * as assert from "assert";

export class listCommand implements OrbitCommand {
  constructor() {
  }

  check(model: OrbitModel) {
    return true;
  }

  async run(model: OrbitModel, system: IOrbit) {
    let out = await system.listFiles();
    assert.strictEqual(out.status, 200);
    assert.strictEqual(out.data["directoryVersions"].length, model.dirs.length);
    assert.strictEqual(out.data["fileList"].length, model.files.length);
  }

  toString() {
    return "listCommand";
  }
}
