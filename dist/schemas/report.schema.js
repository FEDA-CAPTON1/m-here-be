"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createReportSchema = void 0;
const zod_1 = require("zod");
// enum RoleEnumType {
//   EIT = "EIT",
//   Instructors = "Intructors",
//   Kitchen ="Kitchen",
//   Security ="Security",
//   Nurse = "Nurses",
//   Admin = "Admin",
// }
exports.createReportSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        id: (0, zod_1.number)().optional(),
        from: (0, zod_1.string)().email('Invalid email address'),
        details: (0, zod_1.string)({
            required_error: 'Enter Details'
        }),
        recipients: (0, zod_1.string)().email('Invalid email address'),
    })
});
//# sourceMappingURL=report.schema.js.map