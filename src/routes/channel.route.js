import { Router } from "express";
import channelController from "../controllers/channel";
import Validation  from '../validation/channel';
import verifyToken from "../middlewares/verify-token";


const { createChannels, searchChannels, fetchChannels, selectChannelToJoin, viewChannelMembers, deleteChannel } = channelController;
const { validateChannel } = Validation;

const router = new Router();

router.post("/channels", verifyToken, validateChannel, createChannels);
router.get("/getchannels", verifyToken, fetchChannels);
router.get("/channels", verifyToken,  searchChannels);
router.patch("/channels", verifyToken,  selectChannelToJoin);
router.get("/channels/:id", verifyToken,  viewChannelMembers);
router.delete("/channels/:id", verifyToken,  deleteChannel);

export default router;
