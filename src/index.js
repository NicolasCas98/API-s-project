import * as pipelines from "./pipelines/characterSync.pipeline.js";

const main = async () => {

  await pipelines.runCharacterSync();

};

main();

