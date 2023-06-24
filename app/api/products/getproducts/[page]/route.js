import { connectToDB } from "@/utils/dbConnect";
import Product from "@/models/Product";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const { page } = params;

    const currentPage = page;
    const perPage = 5;

    let totalItems = await Product.find().countDocuments();

    let products = await Product.find()
      .skip((currentPage - 1) * perPage)
      .limit(perPage);

    return new Response(JSON.stringify({ products, totalItems }), {
      status: 200,
    });
  } catch (error) {
    return new Response("Error Happened", {
      status: 500,
    });
  }
};
