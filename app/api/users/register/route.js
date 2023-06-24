import { connectToDB } from "@/utils/dbConnect";
import User from "@/models/User";
import bcrypt from "bcrypt";

export const POST = async (request) => {
  try {
    await connectToDB();

    const { username, email, password } = await request.json();

    const hashedPassword = await bcrypt.hash(password, 10);

    let newUser = new User({ username, email, password: hashedPassword });
    newUser = await newUser.save();

    return new Response(
      JSON.stringify({
        userId: newUser._id,
        username: newUser.username,
        email: newUser.email,
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
