"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequestBodyToGenerateLink = void 0;
const joi_1 = __importDefault(require("joi"));
const requestBodySchema = joi_1.default.object({
    name: joi_1.default.string().min(4).required(),
    email: joi_1.default.string().email().custom((value, helpers) => {
        if (!value.endsWith('@gmail.com')) {
            return helpers.error('any.invalid');
        }
        return value;
    }, 'Email Validation').required(),
    password: joi_1.default.string().min(5).required(),
});
const validateRequestBodyToGenerateLink = (req, res, next) => {
    try {
        const { error } = requestBodySchema.validate(req.body);
        if (error) {
            res.status(400).json({ message: "Invalid Request!", error: error.details[0].message });
            return;
        }
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.validateRequestBodyToGenerateLink = validateRequestBodyToGenerateLink;
//# sourceMappingURL=validateRequestBodyToGenerateLink.js.map