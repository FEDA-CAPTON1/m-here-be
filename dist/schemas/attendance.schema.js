"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAttendanceSchema = void 0;
const zod_1 = require("zod");
var AttendanceEnumType;
(function (AttendanceEnumType) {
    AttendanceEnumType["YES"] = "YES";
    AttendanceEnumType["NO"] = "NO";
})(AttendanceEnumType || (AttendanceEnumType = {}));
exports.createAttendanceSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        id: (0, zod_1.number)().optional(),
        attendanceEnum: zod_1.z.nativeEnum(AttendanceEnumType),
        reason: (0, zod_1.string)().optional(),
    })
});
//# sourceMappingURL=attendance.schema.js.map