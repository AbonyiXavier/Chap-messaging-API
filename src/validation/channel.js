import joi from "joi";

export default class Validation {
  static async validateChannel(request, response, next) {
    try {
      const schema = joi.object().keys({
        channelName: joi.string().max(255).required(),
        channelDescription: joi.string().max(255).required(),
        // userIds: joi.array(),
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
