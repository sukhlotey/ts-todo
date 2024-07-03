"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var todoSchema = new mongoose_1.default.Schema({
    todo: { type: String, required: true },
    isDone: { type: Boolean, required: true },
    timer: { type: Number, required: true },
});
var Todo = mongoose_1.default.model('Todo', todoSchema);
exports.default = Todo;
