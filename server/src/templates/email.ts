export function confirm(verifyToken: string, userName: string): any {
  return {
    subject: "Confirm your email",
    html: `
        <table cellspacing="0" style="width:600px">
            <tr>
                <td style="border-top:1px solid #1f2866;text-align:center;padding:20px">
                    <img style="width:160px" src="https://employers-postlight.s3-eu-west-1.amazonaws.com/postlight-email.png"/>
                </td>
            </tr>
            <tr>
                <td style="color:#fff;background:#1f2866;padding:40px 20px;font-size:15px">
                    Hi ${userName},<br><br>

                    Thank you for being part of us please click on the below link to verify your email.
                </td>
            <tr>
            <tr>
                <td style="padding:20px 0;text-align:center;color:#fff;background:#1f2866">
                    <a href='${process.env.CLIENT_URL}/confirm/${verifyToken}' style="background:#fff;padding:10px 20px;color:#1f2866;text-decoration:none">Verify email</a>
                </td>
            </tr>
            <tr>
                <td style="padding:10px 20px 20px;color:#fff;font-size:15px;background:#1f2866;">
                    Regards,<br>
                    Postlight Team
                </td>
            </tr>
        </table>
        `
  };
}

export function member(createdEmployee: any): any {
  return {
    subject: "New employer",
    html: `
         <table cellspacing="0" style="width:600px">
             <tr>
                 <td style="border-top:1px solid #1f2866;text-align:center;padding:20px;">
                     <img style="width:160px" src="https://employers-postlight.s3-eu-west-1.amazonaws.com/postlight-email.png"/>
                 </td>
             </tr>
             <tr>
                 <td style="color:#fff;background:#1f2866;padding:40px 20px;padding-bottom:70px;font-size:15px">
                     Hi ${createdEmployee.name},<br><br>
 
                     We are happy that you are now a member of our employers system below are your info.
                 </td>
             <tr>
             <tr>
                <td style="text-align:center;background:#1f2866;">
                    <img style="width:400px;border:2px #fff solid" src="${createdEmployee.imageUrl}"/>
                </td>
             </tr>
             <tr>
                <td style="padding:20px;color:#fff;font-size:15px;background:#1f2866;">
                    Location:&nbsp; ${createdEmployee.location}<br>
                    Department: ${createdEmployee.department}<br>
                </td>
             </tr>
             <tr>
                <td style="padding:10px 20px 20px;color:#fff;font-size:15px;background:#1f2866;">
                    Regards,<br>
                    Postlight Team
                </td>
             </tr>
         </table>
         `
  };
}
