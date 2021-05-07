import {OrbitCommand, OrbitModel} from "../OrbitModel";
import {IOrbit} from "../Orbit";
import * as assert from "assert";

export class createFileCommand implements OrbitCommand {
  constructor(readonly dirIndex: number, readonly name: string) {
  }

  check(model: OrbitModel) {
    return true;
  }

  async run(model: OrbitModel, system: IOrbit) {
    const dir = model.dirs[this.dirIndex % model.dirs.length];
    const out = await system.createFile(dir.id, this.name);
    assert.strictEqual(out.status, 200);
    model.files.push({
      id: out.data["id"],
      version: 1,
      name: this.name,
      parentId: dir.id,
      content: "",
      timestamp: out.data["timestamp"]
    });
    dir.childFiles.push(out.data["id"]);
  }

  toString() {
    return "createFileCommand";
  }
}
