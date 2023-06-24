import { connectToDB } from "@/utils/dbConnect";
import Product from "@/models/Product";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const { productId } = params;

    let product = await Product.findById(productId);

    return new Response(JSON.stringify(product), {
      status: 200,
    });
  } catch (error) {
    return new Response("Error Happened", {
      status: 500,
    });
  }
};
