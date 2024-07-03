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
const express_1 = __importDefault(require("express"));
const todo_1 = __importDefault(require("./todo"));
const mongoose_1 = __importDefault(require("mongoose"));
const router = express_1.default.Router();
router.post('/:id/timer', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { timer } = req.body;
    console.log(`Received request to update timer for todo id: ${id} with timer: ${timer}`);
    try {
        const objectId = mongoose_1.default.Types.ObjectId.isValid(id) ? new mongoose_1.default.Types.ObjectId(id) : null;
        if (!objectId) {
            return res.status(404).send('Invalid Todo ID');
        }
        const todo = yield todo_1.default.findByIdAndUpdate(objectId, { timer }, { new: true });
        if (!todo) {
            return res.status(404).send('Todo not found');
        }
        res.status(200).send(todo);
    }
    catch (error) {
        console.error('Error updating timer:', error);
        res.status(500).send('Error updating timer');
    }
}));
exports.default = router;
