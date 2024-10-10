export const VERIFICATION_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; display: flex; justify-content: center; align-items: center; height: 100vh;">

    <div style="background-color: white; width: 100%; max-width: 600px; padding: 40px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); text-align: center;">
        <h1 style="color: #333; font-size: 24px; font-weight: bold; margin-bottom: 20px;">Verify Your Email</h1>
        
        <img src="https://via.placeholder.com/100x100" alt="Email Icon" style="margin-bottom: 20px;">
        
        <p style="font-size: 18px; color: #333; margin-bottom: 20px; font-weight: bold;">Hello</p>
        
        <p style="font-size: 16px; color: #555; line-height: 1.5; margin-bottom: 30px;">
        Thank you for signing up! Your verification code is
        </p>

        <div href="#" style="display: inline-block; padding: 15px 30px; background-color: #007BFF; color: white; text-decoration: none; border-radius: 5px; font-size: 16px; font-weight: bold; margin-bottom: 30px;">
            {verificationCode}
        </div>

        <p style="font-size: 14px; color: #888; margin-top: 15px;">
            Enter this code on the verification page to complete registration
        </p>
        <p style="font-size: 14px; color: #888; margin-top: 15px;">
            This code will expire in 15 minutes for security reason
        </p>
        <p style="font-size: 14px; color: #888; margin-top: 15px;">
            If you didn't create an account with us, please ignore this email
        </p>
        <p style="font-size: 14px; color: #888; margin-top: 15px;">
            Best regards
            Syed Mushahid
        </p>
    </div>

</body>
</html>`






export const PASSWORD_RESET_REQUEST_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Password</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; display: flex; justify-content: center; align-items: center; height: 100vh;">

    <div style="background-color: white; width: 100%; max-width: 600px; padding: 40px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); text-align: center;">
        <h1 style="color: #333; font-size: 24px; font-weight: bold; margin-bottom: 20px;">Reset your Password</h1>
          <p style="font-size: 14px; color: #888; margin-top: 15px;">
            Click the Reset button.
        </p>
        <a href="{resetURL}" style="display: inline-block; padding: 15px 30px; background-color: #007BFF; color: white; text-decoration: none; border-radius: 5px; font-size: 16px; font-weight: bold; margin-bottom: 30px;">
            Reset
        </a>

        <p style="font-size: 14px; color: #888; margin-top: 15px;">
            This reset link will expire in 1 hour for security reason
        </p>
    </div>

</body>
</html>
`



export const PASSWORD_RESET_SUCCESS_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Password Successful!</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; display: flex; justify-content: center; align-items: center; height: 100vh;">

    <div style="background-color: white; width: 100%; max-width: 600px; padding: 40px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); text-align: center;">
        <h1 style="color: #333; font-size: 24px; font-weight: bold; margin-bottom: 20px;">Your Password Reset Successfully!</h1>
        
        <a href="{loginURL}" style="display: inline-block; padding: 15px 30px; background-color: #007BFF; color: white; text-decoration: none; border-radius: 5px; font-size: 16px; font-weight: bold; margin-bottom: 30px;">
            Login Now
        </a>
    </div>

</body>
</html>
`