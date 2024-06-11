const collection = require('../DataBase/MongoDB');

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SEND_GRID_API_KEY);

function generateRandomString() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 36; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

const SendRestartMail = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await collection.findOne({email: email});





        if(user){

            const verificationCode = generateRandomString();
            user.restartCode = verificationCode;
            await user.save();




            const msg = {
              to: email,
              from: { name: 'Ploady', email: 'adrian@ploady.com' },
              subject: 'Password Reset',
              text: `Click the button below to reset your password.`,
              html: `
                <div style="font-family: Arial, sans-serif; width: 100%; background-color: #f5f5f5; padding: 50px 0;">
                  <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 20px; text-align: center; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                    <h2 style="color: #333; font-size: 24px; margin-bottom: 20px;">Password Reset</h2>
                    <p style="font-size: 16px; color: #555; margin-bottom: 20px;">Click the button below to reset your password:</p>
                    <a href="https://www.ploady.com/restartPassword/restart/${verificationCode}" style="display: inline-block; padding: 10px 20px; font-size: 16px; color: white; background-color: #007BFF; border-radius: 5px; text-decoration: none;">Reset Password</a>
                  </div>
                </div>
              `,
            };
              await sgMail.send(msg);
            res.json({message: 'Email sent'});

        } else{
            res.json({message: 'Email not found'});
        }

    }
    catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports = SendRestartMail