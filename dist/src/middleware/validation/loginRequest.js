"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLoginRequests = void 0;
const joi_1 = __importDefault(require("joi"));
const loginSchema = joi_1.default.object({
    email: joi_1.default.string()
        .email()
        .custom((value, helpers) => {
        if (!value.endsWith("@gmail.com")) {
            return helpers.error("any.invalid");
        }
        return value;
    }, "Email Validation")
        .required(),
    password: joi_1.default.string().required(),
});
const validateLoginRequests = (req, res, next) => {
    try {
        const { error } = loginSchema.validate(req.body);
        if (error) {
            res
                .status(400)
                .send({ message: "Invalid Request!", error: error.details[0].message });
            return;
        }
        else {
            next();
        }
    }
    catch (error) {
        next(error);
    }
};
exports.validateLoginRequests = validateLoginRequests;
//# sourceMappingURL=loginRequest.js.map