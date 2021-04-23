import fc from "fast-check";
import {IOrbit} from "./Orbit";

export class OrbitModel {
  // rootFiles = [2];
  dirs: DirModel[] = [];

  serverIsRunning = false;
  validUsers = [100, 101, 102];
  // rootDirs = [15, 17, 18];
  files: FileModel[] = [];

  constructor() {
    this.seedDirs();
    this.seedFiles();
  }

  findDirById(id: number): DirModel {
    return this.dirs.find(f => f.id = id);
  }

  findFileById(id: number): FileModel {
    return this.files.find(f => f.id = id);
  }


  private seedDirs() {
    this.dirs.push({
      id: 15,
      version: 1,
      parentId: 14,
      childDirs: [],
      childFiles: [3]
    });
    this.dirs.push({
      id: 17,
      version: 1,
      parentId: 2,
      childDirs: [],
      childFiles: []
    });
    this.dirs.push({
      id: 18,
      version: 1,
      parentId: 2,
      childDirs: [],
      childFiles: []
    });
  }

  private seedFiles() {
    this.files.push({
      id: 2,
      version: 1,
      parentId: 15,
      name: "README.txt",
      content: "README.txt located at /Users/rw/README.txt\n" +
          "Only USER_ID=100 can access it.\n"
    })
  }
}

export interface FileModel {
  id: number;
  version: number;
  parentId: number;
  name: string;
  content: string;
}

export interface DirModel {
  id: number;
  version: number;
  parentId: number;
  childDirs: number[];
  childFiles: number[];
}

export type OrbitCommand = fc.AsyncCommand<OrbitModel, IOrbit>;
