"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _Email_first_name, _Email_to, _Email_from;
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
class Email {
    constructor(user, url) {
        this.user = user;
        this.url = url;
        _Email_first_name.set(this, void 0);
        _Email_to.set(this, void 0);
        _Email_from.set(this, void 0);
        __classPrivateFieldSet(this, _Email_first_name, user.first_name.split(' ')[0], "f");
        __classPrivateFieldSet(this, _Email_to, user.email, "f");
        __classPrivateFieldSet(this, _Email_from, `M-HERE <dev.farmzoneafrica@gmail.com`, "f");
    }
    newTransport() {
        return nodemailer_1.default.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });
    }
    async send(template, subject) {
        const html = `
<div style="max-width: 700px;text-align: center; text-transform: uppercase;
     margin:auto; border: 10px solid #DE3D6D; padding: 50px 20px; font-size: 110%;">
     <h2 style="color: #03435F;">Welcome to <span style="color : #DE3D6D";>M-<span><span style="color:#F5844C;">-HERE<span></h2>
     <p>Hello ${__classPrivateFieldGet(this, _Email_first_name, "f")}, Please Follow the link by clicking on the button to get Otp
      </p>
      <div style="text-align:center ;">
        <a href=${this.url}
       style="background: #03435F; text-decoration: none; color: white;
        padding: 10px 20px; margin: 10px 0;
       display: inline-block;">Click here</a>
      </div>
</div>
`;
        const mailOptions = {
            from: __classPrivateFieldGet(this, _Email_from, "f"),
            to: __classPrivateFieldGet(this, _Email_to, "f"),
            subject,
            text: html,
            html,
        };
        const info = await this.newTransport().sendMail(mailOptions);
        console.log(nodemailer_1.default.getTestMessageUrl(info));
    }
    async sendOtp() {
        await this.send('Otp', 'Your OTP code');
    }
    async sendPasswordResetToken() {
        await this.send('resetPassword', 'Your password reset token (valid for only 10 minutes)');
    }
}
exports.default = Email;
_Email_first_name = new WeakMap(), _Email_to = new WeakMap(), _Email_from = new WeakMap();
//# sourceMappingURL=email.service.js.map