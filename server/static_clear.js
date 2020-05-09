// @flow
import { appPaths } from "./static_config.js";
import { clearFromCache, restoreIndexFile } from "./static.js";
/*::
import typeof { appPaths as AppPathsType } from "./static_config.js";
import {
  clearFromCache as ClearFromCacheType,
  restoreIndexFile as RestoreIndexFileType
} from "./static.js";
*/

appPaths().forEach((cachePath /*: string */) /*: void */ => {
  if (cachePath !== "/") {
    clearFromCache(cachePath).catch((e /*: Error */) /*: void */ => {
      console.log(e);
    });
  }
});
restoreIndexFile();
