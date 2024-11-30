import sendMail from "@/lib/sendMail";

export function GET(request, { params }) {
  return Response.json(
    { message: `Method '${request.method}' Not Supported at '/api/${request.nextUrl.pathname}'` },
    { status: 400 },
  )
}

export async function POST(request, { params }) {
  try {
    const reqBody = await request.json();

    const {
      from,
      to,
      subject,
      text,
      html,
      htmlTemplatesTag,
      recipientdata,
      cc,
    } = reqBody;

    const htmlMessage = html || htmlTemplatesTag || text || `
<!DOCTYPE HTML
  PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
  xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="x-apple-disable-message-reformatting">
    <!--[if !mso]><!-->
    <meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->
    <title></title>
    
    <style type="text/css">
      .downloadBtn:hover {
       opacity: 0.75;
      }
      
      .downloadBtn:active {
        opacity: 0.85;
      }
      .downloadBtn:focus {
        outline-color: #777;
        outline-offset: 2px;
      }
    </style>
</head>
<body style="font-family: 'Poppins', Arial, sans-serif; margin: 0; padding: 0;">

<table width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr>
        <td align="center">
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td class="body">
                
                  <div style="width: 100%; max-width: 520px; border: 1px solid #cccccc; border-radius: 20px; overflow-wrap:break-word;word-break:break-word;padding:20px; text-align: left; font-size: 16px; line-height: 1.6;">
                
                  <p>
                    Hai <b>${recipientdata?.name}</b>!
                  </p>
                  
                  <p>
                  Silahkan download sertifikat kamu yang ada di lampiran, atau klik tombol dibawah
                  </p>
                  
                  <div style="padding: 1rem;">
                  
                  <a class="downloadBtn" target="_blank" href="https://drive.google.com/file/d/1mTfxfFCU64lfLiYzHQr3zFZg0kLgns5z/view?usp=drive_link" style="text-decoration: none; padding: 1rem 2rem; background: #03a; color: white; border-radius: 12px;">Lihat Sertifikat</a>
                  
                  </div>
                  <p style="font-style: italic;font-size: 12px;">
                  Gunakan link berikut jika tidak ada file terlampir atau tombol tidak dapat di klik
                  https://drive.google.com/file/d/1mTfxfFCU64lfLiYzHQr3zFZg0kLgns5z/view?usp=drive_link
                  </p>
                  
                  <p>
                  Terima Kasih 😊
                  </p>
                  
                </td>
              </tr>
            </table>
        </td>
    </tr>
</table>

</body>
</html>
`

    // const htmlMessage = html || htmlTemplatesTag || text || `Hai <b>${recipientdata?.name}</b>!\n\nSilahkan download sertifikat kamu yang ada di lampiran, atau klik tombol dibawah\n\n${linkButton}`;

    const info = await sendMail({
      to: to || recipientdata?.email,
      subject: `Hai ${recipientdata?.name}, berikut sertifikat kamu`,
      html: htmlMessage,
      cc,
    })

    console.log(info)

    return Response.json(
      {
        message: `send to ${info.messageId}`,
        info,
      },
      {
        status: 200,
      }
    );
  } catch (err) {
    process.env.NODE_ENV === "development" && console.error(err?.message || err);

    return Response.json(
      {
        message: err?.message || err,
        success: false,
      },
      { status: 500 }
    );
  }
}