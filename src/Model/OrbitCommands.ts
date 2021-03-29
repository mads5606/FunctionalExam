import fc from "fast-check";

import { createDirCommand } from "./createDirCommand";
import { createFileCommand } from "./createFileCommand";
import { deleteDirCommand } from "./deleteDirCommand";
import { deleteFileCommand } from "./deleteFileCommand";
import { downloadCommand } from "./downloadCommand";
import { listCommand } from "./listCommand";
import { lockUnlockFileCommand } from "./lockUnlockFileCommand";
import { metaCommand } from "./metaCommand";
import { setFileTimeCommand } from "./setFileTimeCommand";
import { structureCommand } from "./structureCommand";
import { uploadFileCommand } from "./uploadFileCommand";
import { versionCommand } from "./versionCommand";
import { moveFileCommand } from "./moveFileCommand";
import { moveDirCommand } from "./moveDirCommand";

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
