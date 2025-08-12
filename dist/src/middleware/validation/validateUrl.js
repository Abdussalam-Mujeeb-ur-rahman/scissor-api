"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUrlBody = void 0;
const joi_1 = __importDefault(require("joi"));
const axios_1 = __importDefault(require("axios"));
const urlSchema = joi_1.default.object({
    url: joi_1.default.string().uri().pattern(/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/).required(),
});
const validateUrlBody = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error } = urlSchema.validate(req.body);
        if (error) {
            res.status(400).json({ message: "Invalid URL!" });
            return;
        }
        try {
            yield axios_1.default.get(req.body.url);
            next();
        }
        catch (error) {
            res.status(400).json({ message: 'URL does not exist. Please provide a valid URL.' });
            return;
        }
    }
    catch (error) {
        next(error);
    }
});
exports.validateUrlBody = validateUrlBody;
//# sourceMappingURL=validateUrl.js.map