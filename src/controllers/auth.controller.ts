import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { generateToken } from "../utils/jwt.util";

const prisma = new PrismaClient();

type Login = {
  username: string;
  password: string;
};

const login = async (req: Request, res: Response) => {
  const { username, password }: Login = req.body;

  try {
    const customer = await prisma.customer.findUnique({ where: { username } });
    // If customer doesn't exist, use a dummy password hash to prevent timing attacks
    const isPasswordValid = await bcrypt.compare(
      password,
      customer?.password || "$2b$10$dummyhashdummyhashdummyhashdummyha"
    );

    if (!customer || !isPasswordValid) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const token = generateToken(customer.username);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
};

export { login };
