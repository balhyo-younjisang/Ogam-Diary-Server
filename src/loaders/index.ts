import Logger from "./logger";
import serverLoader from "./server";
import dependencyInjector from "./dependencyInjector";

export default async ({ experssApp }) => {
  await dependencyInjector();

  await serverLoader({ app: experssApp });
  Logger.info("Express loaded");
};
