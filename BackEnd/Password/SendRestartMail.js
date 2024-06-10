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

const SebdRestartMail = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await collection.findOne({email: email});

        console.log(email)
        console.log(user);



        if(user){
          console.log(email, verificationCode)

            const verificationCode = generateRandomString();
            user.restartCode = verificationCode;
            await user.save();




            const msg = {
                to: email,
                from: { name: 'Ploady', email: 'adrian@ploady.com' },
                subject: 'Verification code',
                text: `Your restart link`,
                html: `
                <style>
                @import url('https://fonts.googleapis.com/css2?family=Gabarito:wght@400..900&display=swap');
                @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');
                </style>
                <div style="
                width: 100%;
                height: 100vh;
                display: flex;
                justify-content: center;
                align-items: center;
                background-color: white;
                color: blue;
                font-family: 'Gabarito';
              ">
                <div style="
                  padding: 20px;
                  border: 2px solid #93c5fd;
                  background-color: #bfdbfe;
                  color: blue;
                  text-align: center;
                  border-radius: 10px;
                  margin: auto;
                  width: 300px;
                  font-family: 'Gabarito';
                ">
                  <a href="https://www.ploady.com/restartPassword/restart/${verificationCode}" style="font-size: 28px; font-weight: 900; color: #1e40af;  font-family: 'Roboto';">Restart Password</a>
                </div>
              </div>
                `,
              };
              await sgMail.send(msg);
            res.json({message: 'Email sent'});

        } else{
            res.status(404).json({message: 'User not found'});
        }

    }
    catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports = SebdRestartMail