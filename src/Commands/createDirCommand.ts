import {OrbitCommand, OrbitModel} from "../OrbitModel";
import {IOrbit} from "../Orbit";
import * as assert from "assert";

export class createDirCommand implements OrbitCommand {
  constructor(readonly dirIndex: number, readonly name: string) {
  }

  check(model: OrbitModel) {
    return true;
  }

  async run(model: OrbitModel, system: IOrbit) {
    const dir = model.dirs[this.dirIndex % model.dirs.length];
    const out = await system.createDir(dir.id, dir.version, this.name);
    assert.strictEqual(out.status, 200);
    assert.strictEqual(out.data["name"], this.name);
    model.dirs.push({
      id: out.data["id"],
      version: 1,
      name: this.name,
      parentId: dir.id,
      childFiles: [],
      childDirs: []
    });
    dir.childDirs.push(out.data["id"]);
  }

  toString() {
    return "CreateDirCommand";
  }
}
