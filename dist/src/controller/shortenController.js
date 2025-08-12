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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getURL = exports.createNewUrl = void 0;
const shortener_1 = require("../utils/shortener"); // import shortenURL function from shortener utility
const urlModel_1 = require("../model/urlModel"); // import URL_Model from urlModel.
// Define an async function to create a new shortened URL
const createNewUrl = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { url } = req.body; // extract the url from the request body
        const userId = (_a = req.identity) === null || _a === void 0 ? void 0 : _a._id; // get the user ID from the authenticated user
        if (!url)
            return res.json({ message: "Please send a valid url" }); // if the url is not provided, return an error message
        const shortenedURL = yield (0, shortener_1.shortenURL)(url, userId); // call the shortenURL function to create a shortened URL with user ID
        res
            .status(201)
            .json({ message: "url created successfully!", shortenedURL }); // send a success message with the shortened URL
    }
    catch (error) {
        next(error); // if there's an error, pass it to the next middleware (error handler)
    }
});
exports.createNewUrl = createNewUrl;
// Define an async function to get the original URL for the given short_id
const getURL = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { short_id } = req.params; // extract the short_id from the request parameters
        const url = yield urlModel_1.URL_Model.findOne({ short_id }); // find the URL document in the database with the given short_id
        if (!url)
            return res.status(404).json({ message: "short_id not found!" }); // if the short_id is not found, send a 404 status and return an error message
        res.redirect(url.original_url); // redirect the user to the original URL
    }
    catch (error) {
        next(error); // if there's an error, pass it to the next middleware (error handler)
    }
});
exports.getURL = getURL;
//# sourceMappingURL=shortenController.js.map