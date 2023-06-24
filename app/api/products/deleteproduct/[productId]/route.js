import { connectToDB } from "@/utils/dbConnect";
import Product from "@/models/Product";

export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();

    const { productId } = params;

    await Product.findByIdAndDelete(productId);

    return new Response("Deleted", {
      status: 200,
    });
  } catch (error) {
    return new Response("Error Happened", {
      status: 500,
    });
  }
};
