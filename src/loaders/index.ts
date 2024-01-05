import Logger from "./logger";
import serverLoader from "./server";

export default async ({ experssApp }) => {
  await serverLoader({ app: experssApp });
  Logger.info("Express loaded");
};
