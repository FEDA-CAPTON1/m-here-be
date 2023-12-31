import nodemailer from 'nodemailer';

export default class Email {
  #first_name: string;
  #to: string | any;
  #from: string;
  constructor(private user: any, private url: string) {
    this.#first_name = user.first_name.split(' ')[0];
    this.#to = user.email;
    this.#from = `M-HERE <dev.farmzoneafrica@gmail.com`;
  }

  private newTransport() {

    return nodemailer.createTransport({
       service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  private async send(template: string, subject: string) {
    const html = `
<div style="max-width: 700px;text-align: center; text-transform: uppercase;
     margin:auto; border: 10px solid #DE3D6D; padding: 50px 20px; font-size: 110%;">
     <h2 style="color: #03435F;">Welcome to <span style="color : #DE3D6D";>M-<span><span style="color:#F5844C;">-HERE<span></h2>
     <p>Hello ${this.#first_name}, Please Follow the link by clicking on the button to get Otp
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
      from: this.#from,
      to: this.#to,
      subject,
      text: html,
      html,
    };

    const info = await this.newTransport().sendMail(mailOptions);
    console.log(nodemailer.getTestMessageUrl(info));
  }

  async sendOtp() {
    await this.send('Otp', 'Your OTP code');
  }

  async sendPasswordResetToken() {
    await this.send(
      'resetPassword',
      'Your password reset token (valid for only 10 minutes)'
    );
  }
}
