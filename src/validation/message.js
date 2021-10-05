import joi from "joi";

export default class Validation {
  static async validateMessage(request, response, next) {
    try {
      const schema = joi.object().keys({
        messageText: joi.string().max(255).required(),
        channelId: joi.string().max(255).required(),
      });
      await schema.validateAsync(request.body);
      return next();
    } catch (error) {
      console.log('validate', error);
      return response
        .status(400)
        .json({ success: false, error: error.details[0].message });
    }
  }
}
