import {DirModel, OrbitCommand, OrbitModel} from "../OrbitModel";
import {IOrbit} from "../Orbit";
import * as assert from "assert";

export class metaCommand implements OrbitCommand {
  constructor(readonly index: number) {
  }

  check(model: OrbitModel) {
    return model.files.length > 0;
  }

  async run(model: OrbitModel, system: IOrbit) {
    const dir = model.dirs[this.index % model.dirs.length];
    if (dir.childFiles.length > 0 && this.index % 2 == 0) {
      await this.onName(dir, model, system);
      return;
    }
    await this.onFileId(model, system);
  }

  toString() {
    return "metaCommand";
  }

  private async onFileId(model: OrbitModel, system: IOrbit) {
    const realIndex = this.index % model.files.length;
    const file = model.files[realIndex];
    const out = await system.metaCheckOnFileId(file.id);
    assert.strictEqual(out.status, 200);
    assert.strictEqual(out.data["version"], file.version);
    assert.strictEqual(out.data["name"], file.name);
    // assert.strictEqual(out.data["timestamp"], file.timestamp);
  }

  private async onName(dir: DirModel, model: OrbitModel, system: IOrbit) {
    const fileId = dir.childFiles[this.index % dir.childFiles.length];
    const file = model.findFileById(fileId);
    const out = await system.metaCheckOnName(dir.id, file.name);
    assert.strictEqual(out.status, 200);
    assert.strictEqual(out.data["version"], file.version);
    assert.strictEqual(out.data["name"], file.name);
    // assert.strictEqual(out.data["timestamp"], file.timestamp);
  }
}
