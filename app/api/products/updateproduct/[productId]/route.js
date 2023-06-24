import { connectToDB } from "@/utils/dbConnect";
import Product from "@/models/Product";

export const PATCH = async (request, { params }) => {
  try {
    await connectToDB();

    const { productId } = params;

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

    let product = await Product.findById(productId);

    product.productName = productName;
    product.price = price;
    product.category = category;
    product.brand = brand;
    product.description = description;
    product.specifications = specifications;
    product.forSale = forSale;
    product.photos = photos;

    product = await product.save();

    return new Response(JSON.stringify(product), {
      status: 200,
    });
  } catch (error) {
    return new Response("Error Happened", {
      status: 500,
    });
  }
};
