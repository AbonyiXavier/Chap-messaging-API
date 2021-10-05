import { Router } from "express";
import userRoute from "./user.route";
import channelRoute from "./channel.route";
import messageRoute from "./message.route";

const router = new Router();

router.use("/v1", userRoute);
router.use("/v1", channelRoute);
router.use("/v1", messageRoute);

export default router;
