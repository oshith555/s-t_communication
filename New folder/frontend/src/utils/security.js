import bcrypt from 'bcryptjs';
import CryptoJS from 'crypto-js';

// Password encryption utilities
export const hashPassword = async (password) => {
  const saltRounds = 12;
  return await bcrypt.hash(password, saltRounds);
};

export const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

// Email verification utilities
export const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const generateVerificationToken = () => {
  return CryptoJS.lib.WordArray.random(32).toString();
};

// Email service (simulated - in real app, use actual email service)
export const sendVerificationEmail = async (email, verificationCode, userName) => {
  // In a real application, you would integrate with an email service like SendGrid, AWS SES, etc.
  // For now, we'll simulate the email sending and store the verification code
  
  const emailData = {
    to: email,
    subject: 'Welcome to S & T Communication - Email Verification',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #3b82f6 0%, #ff6b6b 50%, #ffffff 100%); padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0;">Welcome to S & T Communication!</h1>
        </div>
        <div style="padding: 30px; background: #f8f9fa;">
          <h2 style="color: #333; margin-top: 0;">Hello ${userName}!</h2>
          <p style="color: #666; font-size: 16px; line-height: 1.6;">
            Thank you for joining S & T Communication! We're excited to have you as part of our community.
          </p>
          <p style="color: #666; font-size: 16px; line-height: 1.6;">
            To complete your registration, please use the following verification code:
          </p>
          <div style="background: #e3f2fd; border: 2px solid #2196f3; border-radius: 8px; padding: 20px; text-align: center; margin: 20px 0;">
            <h3 style="color: #1976d2; margin: 0; font-size: 32px; letter-spacing: 5px;">${verificationCode}</h3>
          </div>
          <p style="color: #666; font-size: 14px;">
            This code will expire in 10 minutes. If you didn't create an account with us, please ignore this email.
          </p>
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
            <p style="color: #999; font-size: 12px; margin: 0;">
              S & T Communication<br>
              Your trusted mobile communication partner<br>
              📧 S&Tcommunication@gmail.com | 📱 0773551659
            </p>
          </div>
        </div>
      </div>
    `
  };

  // Store verification code in localStorage for demo purposes
  // In a real app, store this in your database
  const verificationData = {
    email,
    code: verificationCode,
    timestamp: Date.now(),
    expiresAt: Date.now() + (10 * 60 * 1000) // 10 minutes
  };
  
  localStorage.setItem(`verification_${email}`, JSON.stringify(verificationData));
  
  // Simulate email sending delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  console.log('Email sent to:', email);
  console.log('Verification code:', verificationCode);
  
  return { success: true, message: 'Verification email sent successfully!' };
};

export const verifyEmailCode = (email, code) => {
  const storedData = localStorage.getItem(`verification_${email}`);
  if (!storedData) {
    return { success: false, message: 'No verification code found for this email.' };
  }
  
  const verificationData = JSON.parse(storedData);
  const now = Date.now();
  
  if (now > verificationData.expiresAt) {
    localStorage.removeItem(`verification_${email}`);
    return { success: false, message: 'Verification code has expired.' };
  }
  
  if (verificationData.code !== code) {
    return { success: false, message: 'Invalid verification code.' };
  }
  
  // Remove verification code after successful verification
  localStorage.removeItem(`verification_${email}`);
  return { success: true, message: 'Email verified successfully!' };
};
