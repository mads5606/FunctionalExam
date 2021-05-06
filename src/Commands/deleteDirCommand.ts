import {OrbitCommand, OrbitModel} from "../OrbitModel";
import {IOrbit} from "../Orbit";
import * as assert from "assert";

export class deleteDirCommand implements OrbitCommand {
  private realIndex: number;

  constructor(readonly dirIndex: number) {
  }

  check(model: OrbitModel) {
    this.realIndex = this.dirIndex % model.dirs.length;
    const dir = model.dirs[this.realIndex];
    return model.dirs.length > 0 && !model.safeDirs.includes(dir.id) && dir.childDirs.length == 0 && dir.childFiles.length == 0;
  }

  async run(model: OrbitModel, system: IOrbit) {
    const dir = model.dirs[this.realIndex];
    const out = await system.deleteDir(dir.id, dir.version);
    assert.strictEqual(out.status, 200);
    const parentDir = model.findDirById(dir.parentId);
    parentDir.version++;
    model.dirs.splice(this.realIndex, 1);
  }

  toString() {
    return "deleteDirCommand";
  }
}
