"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import express from 'express';
const express_1 = __importDefault(require("express"));
const test_controller_1 = require("../controllers/test.controller");
const test_schema_1 = require("../schemas/test.schema");
const validate_1 = require("../middleware/validate");
const testRouter = express_1.default.Router();
testRouter.post('/', (0, validate_1.validate)(test_schema_1.createTestSchema), test_controller_1.createTestHandler);
exports.default = testRouter;
//# sourceMappingURL=attendance.route.js.map