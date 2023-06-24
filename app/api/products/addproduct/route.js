import { connectToDB } from "@/utils/dbConnect";
import Product from "@/models/Product";

export const POST = async (request) => {
  try {
    await connectToDB();

    // console.log(request.nextUrl.searchParams.get('k1'));

    const {
      productName,
      price,
      category,
      brand,
      description,
      specifications,
      forSale,
      photos,
    } = await request.json();

    let newProduct = new Product({
      productName,
      price,
      category,
      brand,
      description,
      specifications,
      forSale,
      photos,
    });
    newProduct = await newProduct.save();

    return new Response(JSON.stringify(newProduct), {
      status: 200,
    });
  } catch (error) {
    return new Response("Error Happened", {
      status: 500,
    });
  }
};
