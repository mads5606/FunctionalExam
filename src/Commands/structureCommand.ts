import {OrbitCommand, OrbitModel} from "../OrbitModel";
import {IOrbit} from "../Orbit";
import * as assert from "assert";

export class structureCommand implements OrbitCommand {
  constructor() {
  }

  check(model: OrbitModel) {
    return true;
  }

  async run(model: OrbitModel, system: IOrbit) {
    let out = await system.listDirs();
    assert.strictEqual(out.status, 200);
    assert.strictEqual(out.data.length, model.dirs.length);
  }

  toString() {
    return "structureCommand";
  }
}
