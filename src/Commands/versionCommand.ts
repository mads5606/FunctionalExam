import {OrbitCommand, OrbitModel} from "../OrbitModel";
import {IOrbit} from "../Orbit";
import * as assert from "assert";

export class versionCommand implements OrbitCommand {
  constructor() {
  }

  check(model: OrbitModel) {
    return true;
  }

  run(model: OrbitModel, system: IOrbit) {
    assert.strictEqual(model.validUsers, system.validUserList);
  }

  toString() {
    return "versionCommand";
  }
}
