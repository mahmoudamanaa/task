import { connectToDB } from "@/utils/dbConnect";
import User from "@/models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const POST = async (request) => {
  try {
    await connectToDB();

    const { username, password } = await request.json();

    const user = await User.findOne({ username });

    const isPassword = await bcrypt.compare(password, user.password);

    if (!isPassword) {
      return new Response("Wrong Password", {
        status: 500,
      });
    }

    const token = jwt.sign({ userId: user._id }, "secret");

    return new Response(
      JSON.stringify({
        userId: user._id,
        username: user.username,
        email: user.email,
        token,
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    return new Response("Error Happened", {
      status: 500,
    });
  }
};
