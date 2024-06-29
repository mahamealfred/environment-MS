import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

export const receiveComplaintNotification = async(firstName,lastName,email) => {
// Create a transporter object using SMTP transport
let transporter =await nodemailer.createTransport({
    service: 'Outlook', // You can use other services like Yahoo, Outlook, etc.
    auth: {
        user: 'mahamealfred@outlook.com',
        pass: '' // Be cautious about sharing your password
    }
});

// Set up email data
let mailOptions = {
    from: 'mahamealfred@outlook.com', // Sender address
    to:`${email}`, // List of receivers
    subject: 'Environement Complaints and Grievences MS-Complaint Acknowledgement', // Subject line
    text: 'Complaint Acknowledgement', // Plain text body
    html: `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Template</title>
        <style>
            /* General styles */
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
                background-color: #f4f4f4;
            }
            table {
                border-collapse: collapse;
            }
            .container {
                width: 100%;
                padding: 20px;
            }
            .content {
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            .header {
                text-align: center;
                padding-bottom: 20px;
            }
            .header h1 {
                margin: 0;
            }
            .body {
                padding: 20px 0;
            }
            .footer {
                text-align: center;
                padding: 20px 0;
                color: #888888;
                font-size: 12px;
            }
            /* Responsive styles */
            @media (max-width: 600px) {
                .content {
                    padding: 10px;
                }
                .body {
                    padding: 10px 0;
                }
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="content">
                <div class="header">
                    <h1>Environement Complaints and Grievences MS</h1>
                </div>
                <div class="body">
                    <p>Hello ${firstName} ${lastName}</p>
                    <p>Thank you for contacting us and bringing this matter to our attention. We have received your complaint and are currently processing it.</p>
                    <p>Please be assured that we are investigating the issue thoroughly. We will inform you of any updates and notify you of the outcome as soon as the process is complete.</p> 
                    <p>If you have any further questions or need additional information in the meantime, please do not hesitate to contact us.</p>
                    <p>Thank you for your patience and understanding.</p>
                </div>
                <div class="footer">
                    <p>&copy; 2024 Environement Complaints and Grievences MS. All rights reserved.</p>
                </div>
            </div>
        </div>
    </body>
    </html>` // HTML body
};

// Send mail with defined transport object
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
});
};


export const complaintResolution= async(firstName,lastName,email) => {
    // Create a transporter object using SMTP transport
    let transporter =await nodemailer.createTransport({
        service: 'Outlook', // You can use other services like Yahoo, Outlook, etc.
        auth: {
            user: 'mahamealfred@outlook.com',
            pass: '' // Be cautious about sharing your password
        }
    });
    
    // Set up email data
    let mailOptions = {
        from: 'mahamealfred@outlook.com', // Sender address
        to: `${email}`, // List of receivers
        subject: 'Environement Complaints and Grievences MS-Complaint Resolution Notification', // Subject line
        text: 'Complaint Resolution Notification', // Plain text body
        html: `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Email Template</title>
            <style>
                /* General styles */
                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                    background-color: #f4f4f4;
                }
                table {
                    border-collapse: collapse;
                }
                .container {
                    width: 100%;
                    padding: 20px;
                }
                .content {
                    max-width: 600px;
                    margin: 0 auto;
                    background-color: #ffffff;
                    padding: 20px;
                    border-radius: 10px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
                .header {
                    text-align: center;
                    padding-bottom: 20px;
                }
                .header h1 {
                    margin: 0;
                }
                .body {
                    padding: 20px 0;
                }
                .footer {
                    text-align: center;
                    padding: 20px 0;
                    color: #888888;
                    font-size: 12px;
                }
                /* Responsive styles */
                @media (max-width: 600px) {
                    .content {
                        padding: 10px;
                    }
                    .body {
                        padding: 10px 0;
                    }
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="content">
                    <div class="header">
                        <h1>Environement Complaints and Grievences MS</h1>
                    </div>
                    <div class="body">
                        <p>Hello ${firstName} ${lastName}</p>
                        <p>We are pleased to inform you that your complaint has been successfully resolved.</p>
                        <p>After a thorough investigation, we have taken the necessary actions to address the issue you raised. We appreciate your patience and understanding throughout this process.</p> 
                        <p>If you have any further questions or concerns, please do not hesitate to contact us.</p>
                        <p>Thank you for bringing this matter to our attention and allowing us the opportunity to improve our services.</p>
                    </div>
                    <div class="footer">
                        <p>&copy; 2024 Environement Complaints and Grievences MS. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </body>
        </html>` // HTML body
    };
    
    // Send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });
    };
    
    