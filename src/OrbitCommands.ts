import fc from "fast-check";

import {createDirCommand} from "./Commands/createDirCommand";
import {createFileCommand} from "./Commands/createFileCommand";
import {deleteDirCommand} from "./Commands/deleteDirCommand";
import {deleteFileCommand} from "./Commands/deleteFileCommand";
import {downloadCommand} from "./Commands/downloadCommand";
import {listCommand} from "./Commands/listCommand";
import {lockUnlockFileCommand} from "./Commands/lockUnlockFileCommand";
import {metaCommand} from "./Commands/metaCommand";
import {setFileTimeCommand} from "./Commands/setFileTimeCommand";
import {structureCommand} from "./Commands/structureCommand";
import {uploadFileCommand} from "./Commands/uploadFileCommand";
import {versionCommand} from "./Commands/versionCommand";
import {moveFileCommand} from "./Commands/moveFileCommand";
import {moveDirCommand} from "./Commands/moveDirCommand";

export const OrbitCommands = fc.commands([
  fc.constant(new createDirCommand()),
  fc.constant(new createFileCommand()),
  fc.constant(new deleteDirCommand()),
  fc.constant(new deleteFileCommand()),
  fc.constant(new downloadCommand()),
  fc.constant(new listCommand()),
  fc.constant(new lockUnlockFileCommand()),
  fc.constant(new metaCommand()),
  fc.constant(new setFileTimeCommand()),
  fc.constant(new structureCommand()),
  fc.constant(new uploadFileCommand()),
  fc.constant(new versionCommand()),
  fc.constant(new moveFileCommand()),
  fc.constant(new moveDirCommand()),
]);
