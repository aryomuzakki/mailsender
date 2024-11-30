// import sendMail from "@/lib/sendMail";

export function GET(request, { params }) {
  return Response.json(
    { message: `Method '${request.method}' Not Supported at '/api/${request.nextUrl.pathname}'` },
    { status: 400 },
  )
}
const sleep = (ms = 1000) => new Promise(res => setTimeout(res, ms));

const randomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

export async function POST(request, { params }) {
  try {
    const reqBody = await request.json();

    const { bulkData, mainCC, } = reqBody;

    const bulkInfo = [];
    const failedInfo = [];
    let failedCount = 0;
    let successCount = 0;

    for (let idx = 0; idx < bulkData.length; idx++) {

      const delay = randomNumber(7000, 22000);
      
      console.log(`waiting ${delay} ms ...`);
      await sleep(delay);

      const bulkDataItem = bulkData[idx];

      const {
        from,
        to,
        subject,
        text,
        html,
        htmlTemplatesTag,
        recipientdata,
      } = bulkDataItem;

      const cc = mainCC;

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
                  
                  <a class="downloadBtn" target="_blank" href="${recipientdata?.link}" style="text-decoration: none; padding: 1rem 2rem; background: #03a; color: white; border-radius: 12px;">Lihat Sertifikat</a>
                  
                  </div>
                  <p style="font-style: italic;font-size: 12px;">
                  Gunakan link berikut jika tidak ada file terlampir atau tombol tidak dapat di klik
                  ${recipientdata?.link}
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

      try {
        const info = await sendMail({
          to: to || recipientdata?.email,
          subject: `Hai ${recipientdata?.name}, berikut sertifikat kamu`,
          html: htmlMessage,
          cc,
        })

        console.log(info)

        bulkInfo.push(info);
        successCount++;
      } catch (err) {
        failedInfo.push({
          recipientdata,
          reason: err?.message || err,
        })
        failedCount++;
      }

    }

    // const htmlMessage = html || htmlTemplatesTag || text || `Hai <b>${recipientdata?.name}</b>!\n\nSilahkan download sertifikat kamu yang ada di lampiran, atau klik tombol dibawah\n\n${linkButton}`;

    return Response.json(
      {
        message: `send bulk done`,
        successCount,
        failedCount,
        bulkInfo,
        failedInfo,
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


// asdfl;jasldkfjsd
// export async function POST(request, { params }) {
//   try {
//     const { bulkData, mainCC, } = reqBody;

//     const bulkInfo = [];
//     const failedInfo = [];
//     let failedCount = 0;
//     let successCount = 0;

    
//     for (let idx = 0; idx < bulkData.length; idx++) {

//       const delay = randomNumber(16000, 32000);
      
//       console.log(`waiting ${delay} ms ...`);
//       await sleep(delay);

//       const bulkDataItem = bulkData[idx];

//       const {
//         from,
//         to,
//         subject,
//         text,
//         html,
//         htmlTemplatesTag,
//         recipientdata,
//       } = bulkDataItem;

//       const cc = mainCC;

//       const htmlMessage = html || htmlTemplatesTag || text || `
// <!DOCTYPE HTML
//   PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
// <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
//   xmlns:o="urn:schemas-microsoft-com:office:office">
// <head>
//     <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <meta name="x-apple-disable-message-reformatting">
//     <!--[if !mso]><!-->
//     <meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->
//     <title></title>
    
//     <style type="text/css">
//       .downloadBtn:hover {
//         opacity: 0.75;
//       }
      
//       .downloadBtn:active {
//         opacity: 0.85;
//       }
//       .downloadBtn:focus {
//         outline-color: #777;
//         outline-offset: 2px;
//       }
//     </style>
// </head>
// <body style="font-family: 'Poppins', Arial, sans-serif; margin: 0; padding: 0;">

// <table width="100%" cellpadding="0" cellspacing="0" border="0">
//     <tr>
//         <td align="center">
//             <table width="100%" cellpadding="0" cellspacing="0" border="0">
//               <tr>
//                 <td class="body">
                
//                   <div style="width: 100%; max-width: 520px; border: 1px solid #cccccc; border-radius: 20px; overflow-wrap:break-word;word-break:break-word;padding:20px; text-align: left; font-size: 16px; line-height: 1.6;">
                
//                   <p>
//                     Hai <b>${recipientdata?.name}</b>!
//                   </p>
                  
//                   <p>
//                   Silahkan download sertifikat kamu yang ada di lampiran, atau klik tombol dibawah
//                   </p>
                  
//                   <div style="padding: 1rem;">
                  
//                   <a class="downloadBtn" target="_blank" href="${recipientdata?.link}" style="text-decoration: none; padding: 1rem 2rem; background: #03a; color: white; border-radius: 12px;">Lihat Sertifikat</a>
                  
//                   </div>
//                   <p style="font-style: italic;font-size: 12px;">
//                   Gunakan link berikut jika tidak ada file terlampir atau tombol tidak dapat di klik
//                   ${recipientdata?.link}
//                   </p>
                  
//                   <p>
//                   Terima Kasih 😊
//                   </p>
                  
//                 </td>
//               </tr>
//             </table>
//         </td>
//     </tr>
// </table>

// </body>
// </html>
// `
      
//       await fetch("/api/mail", {
//         body: JSON.stringify({
//           to: recipientdata?.name,
//           recipientdata,
//           cc,
//         })
//       })

//     }
      
//     return Response.json(
//       {
//         message: `send bulk done`,
//         successCount,
//         failedCount,
//         bulkInfo,
//         failedInfo,
//       },
//       {
//         status: 200,
//       }
//     );
//   } catch (err) {
//     process.env.NODE_ENV === "development" && console.error(err?.message || err);

//     return Response.json(
//       {
//         message: err?.message || err,
//         success: false,
//       },
//       { status: 500 }
//     );
//   }
// }
// als;dkfjlakjsd