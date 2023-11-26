import { Request, Response } from "express";

const verifyPayment = async (req: Request, res: Response) => {
  try {
    const { token, amount, secretKey } = req.body;
    res.status(200).json({ message: "Payment verification successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default {
  verifyPayment,
};
