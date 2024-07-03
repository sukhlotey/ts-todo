"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const todoSchema = new mongoose_1.default.Schema({
    todo: { type: String, required: true },
    isDone: { type: Boolean, required: true },
    timer: { type: Number, required: true },
});
const Todo = mongoose_1.default.model('Todo', todoSchema);
exports.default = Todo;
