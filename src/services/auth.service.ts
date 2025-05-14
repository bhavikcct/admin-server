import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../config/db';
import nodemailer from "nodemailer";

const JWT_SECRET = process.env.JWT_SECRET!;

export const register = async (req: Request, res: Response)=> {
    const { name, email, password } = req.body;
    
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }
  
    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
  
    res.status(201).json({ message: 'User registered successfully' });
  };
  

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1d' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err });
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail", 
    auth: {
      user: process.env.EMAIL_USER, 
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '15m' });

    const resetLink = `${process.env.CLIENT_URL}/reset-password/${token}`;

    const mailOptions = {
        from: `"Support" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Password Reset Request",
        html: `
          <h2>Password Reset Request</h2>
          <p>Hello ${user.name || ""},</p>
          <p>You requested to reset your password. Click the link below to reset it:</p>
          <a href="${resetLink}">${resetLink}</a>
          <p>This link will expire in 15 minutes.</p>
          <p>If you did not request this, please ignore this email.</p>
        `,
      };
  
      await transporter.sendMail(mailOptions);
  
      res.json({ message: "Password reset email sent successfully" });
  } catch (err) {
    res.status(500).json({ message: 'Failed to generate reset token' });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  const { token, newPassword } = req.body;

  try {
    const decoded: any = jwt.verify(token, JWT_SECRET);
    const hashed = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { id: decoded.id },
      data: { password: hashed },
    });

    res.json({ message: 'Password reset successful' });
  } catch (err) {
    debugger;
    console.log(err)
    res.status(400).json({ message: 'Invalid or expired token' });
  }
};
