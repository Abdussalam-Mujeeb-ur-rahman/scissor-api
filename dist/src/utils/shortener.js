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
exports.shortenURL = void 0;
// Import necessary modules and classes
const shortid_1 = __importDefault(require("shortid")); // import shortid module for generating unique short IDs
const urlModel_1 = require("../model/urlModel"); // import URL_Model and shortenedURL types from urlModel
// Define an async function to shorten a given URL, returning a Promise of type shortenedURL
const shortenURL = (originalURL) => __awaiter(void 0, void 0, void 0, function* () {
    const existingURL = yield urlModel_1.URL_Model.findOne({ original_url: originalURL }); // find an existing URL document in the database with the same original URL
    if (existingURL)
        return existingURL; // if an existing URL is found, return it
    const short_id = shortid_1.default.generate(); // generate a unique short ID using shortid module
    const newURL = new urlModel_1.URL_Model({ original_url: originalURL, short_id }); // create a new URL document with the original URL and generated short ID
    yield newURL.save(); // save the new URL document to the database
    return newURL; // return the new URL document
});
exports.shortenURL = shortenURL;
//# sourceMappingURL=shortener.js.map