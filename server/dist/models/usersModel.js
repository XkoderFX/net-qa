"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const usersSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, "You must have a name"],
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        minlength: 5,
        select: false,
    },
    role: {
        type: String,
        default: "user",
    },
}, { timestamps: true });
const Users = mongoose_1.default.model("Users", usersSchema);
exports.default = Users;
