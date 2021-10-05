import { Router } from "express";
import messageController from "../controllers/message";
import verifyToken from "../middlewares/verify-token"
import Validation  from '../validation/message';


const { createMessageInChannel, fetchConversationInChannel, markMessageRead, deleteMessage } = messageController;
const { validateMessage } = Validation;

const router = new Router();

router.post("/messages", verifyToken, validateMessage, createMessageInChannel);
router.get("/:channelId/messages", verifyToken, fetchConversationInChannel);
router.put("/messages", verifyToken, markMessageRead);
router.delete("/messages/:id", verifyToken, deleteMessage);

export default router;
