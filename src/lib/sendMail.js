import nodemailer from "nodemailer"

export default async function sendMailer(opts) {
  const {
    from,
    to,
    subject,
    text,
    html,
    cc,
    ...otherOpts
  } = opts;

  try {
    // Konfigurasi transporter Nodemailer
    let transporter = nodemailer.createTransport({
      // pool: true, // pooling connection
      host: process.env.SMTP_HOST || "smtp.gmail.com", // Ubah sesuai provider SMTP (misalnya: smtp.gmail.com)
      port: process.env.SMTP_PORT || 465,
      secure: process.env.SMTP_SECURE || true, // true untuk port 465, false untuk port 587
      auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASS,
      },
      from: from || process.env.SMTP_FROM, // '"Your Name" <youremail@yourdomain.com>', // Nama dan email pengirim // trying prevent entering spam
    });

    const mailOptions = {
      from: from || process.env.SMTP_FROM, // '"Your Name" <youremail@yourdomain.com>', // Nama dan email pengirim
      to, // Email penerima
      subject, // Subjek email
      text, // Isi email dalam bentuk teks biasa
      html, // Isi email dalam bentuk HTML
      cc,
    };

    // Kirim email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: %s", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending email: ", error);
    throw error;
  }
  
}

// export async function sendBulkMailer(opts) {
//   const {
//     from,
//     to,
//     subject,
//     text,
//     html,
//     cc,
//     maxConnections,
//     ...otherOpts
//   } = opts;

//   try {
//     // Konfigurasi transporter Nodemailer
//     let transporter = nodemailer.createTransport({
//       // pool: true, // pooling connection
//       host: process.env.SMTP_HOST || "smtp.gmail.com", // Ubah sesuai provider SMTP (misalnya: smtp.gmail.com)
//       port: process.env.SMTP_PORT || 465,
//       secure: process.env.SMTP_SECURE || true, // true untuk port 465, false untuk port 587
//       auth: {
//         user: process.env.SMTP_MAIL,
//         pass: process.env.SMTP_PASS,
//       },
//       from: from || process.env.SMTP_FROM, // '"Your Name" <youremail@yourdomain.com>', // Nama dan email pengirim // trying prevent entering spam
//       maxConnections: maxConnections || 50,
//       pool: true,
//     });


//     // Kirim email
//     const info = await transporter.sendMail(queueItem);
//     console.log("Email sent: %s", info.messageId);
//     return info;
//   } catch (error) {
//     console.error("Error sending email: ", error);
//     throw error;
//   }
  
// }