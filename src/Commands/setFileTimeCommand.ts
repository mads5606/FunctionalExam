import {OrbitCommand, OrbitModel} from "../OrbitModel";
import {IOrbit} from "../Orbit";
import * as assert from "assert";

export class setFileTimeCommand implements OrbitCommand {
  constructor(readonly fileIndex: number) {
  }

  check(model: OrbitModel) {
    return model.files.length > 0;
  }

  async run(model: OrbitModel, system: IOrbit) {
    const realIndex = this.fileIndex % model.files.length;
    const file = model.files[realIndex];
    const timestamp = Math.floor(Date.now() / 1000);
    const out = await system.updateTimestamp(file.id, file.version, timestamp);
    assert.strictEqual(out.status, 200);
    // 62135596800 is the difference in seconds between epoch and 1. january, 1 AD
    const returnedTimestamp = Math.floor(out.data["timestamp"] / 10000000) - 62135596800;
    assert.strictEqual(returnedTimestamp, timestamp);
    file.timestamp = timestamp;
    file.version++;
  }

  toString() {
    return "setFileTimeCommand";
  }
}
