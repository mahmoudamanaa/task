"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const AddProductForm = ({ mode = "new", productId }) => {
  const router = useRouter();

  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [specTitle1, setSpecTitle1] = useState("");
  const [specValue1, setSpecValue1] = useState("");
  const [specTitle2, setSpecTitle2] = useState("");
  const [specValue2, setSpecValue2] = useState("");
  const [specTitle3, setSpecTitle3] = useState("");
  const [specValue3, setSpecValue3] = useState("");
  const [forSaleState, setForSaleState] = useState();
  const [notForSale, setNotForSale] = useState();
  const [photo1, setPhoto1] = useState("");
  const [photo2, setPhoto2] = useState("");
  const [photo3, setPhoto3] = useState("");

  useEffect(() => {
    if (mode === "update") {
      const getProduct = async () => {
        const response = await fetch(
          `/api/products/getproduct/${productId}`
        );
        const data = await response.json();

        setProductName(data.productName);
        setPrice(data.price);
        setCategory(data.category);
        setBrand(data.brand);
        setDescription(data.description);
        setSpecTitle1(data.specifications[0].title);
        setSpecValue1(data.specifications[0].value);
        setSpecTitle2(data.specifications[1].title);
        setSpecValue2(data.specifications[1].value);
        setSpecTitle3(data.specifications[2].title);
        setSpecValue3(data.specifications[2].value);
        setPhoto1(data.photos[0]);
        setPhoto2(data.photos[1]);
        setPhoto3(data.photos[2]);
        setForSaleState(data.forSale);
        setNotForSale(!data.forSale);
      };
      getProduct();
    }
  }, [mode, productId]);

  const submitHandler = async (event) => {
    event.preventDefault();

    const specifications = [
      {
        title: specTitle1,
        value: specValue1,
      },
      {
        title: specTitle2,
        value: specValue2,
      },
      {
        title: specTitle3,
        value: specValue3,
      },
    ];
    const forSale = forSaleState === "on" ? true : false;
    const photos = [photo1, photo2, photo3];

    if (mode === "new") {
      const response = await fetch(
        "/api/products/addproduct?k1=v1",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            productName,
            price,
            category,
            brand,
            description,
            specifications,
            forSale,
            photos,
          }),
        }
      );

      const data = await response.json();
    } else {
      const response = await fetch(
        `/api/products/updateproduct/${productId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            productName,
            price,
            category,
            brand,
            description,
            specifications,
            forSale,
            photos,
          }),
        }
      );
      const data = await response.json();
    }

    router.push("/products");

    setProductName("");
    setPrice(0);
    setCategory("");
    setBrand("");
    setDescription("");
    setSpecTitle1("");
    setSpecValue1("");
    setSpecTitle2("");
    setSpecValue2("");
    setSpecTitle3("");
    setSpecValue3("");
    setForSaleState();
    setNotForSale();
    setPhoto1("");
    setPhoto2("");
    setPhoto3("");
  };

  return (
    <section className="flex justify-center flex-col items-center m-5">
      <h1 className="text-2xl">
        {mode === "new" ? "Add New Product" : "Update Product"}
      </h1>
      <form
        className="flex flex-col items-center w-full lg:w-1/2 m-5"
        onSubmit={submitHandler}
      >
        <div className="w-full items-center text-center">
          <input
            className="w-full p-3 bg-white rounded-md outline-rose-700 border-2 border-black-200 text-black placeholder:text-black-200 mb-3"
            type="text"
            id="productName"
            name="productName"
            placeholder="productName"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>
        <div className="w-full items-center text-center">
          <input
            className="w-full p-3 bg-white rounded-md outline-rose-700 border-2 border-black-200 text-black placeholder:text-black-200 mb-3"
            type="number"
            id="price"
            name="price"
            placeholder="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="w-full items-center text-center">
          <input
            className="w-full p-3 bg-white rounded-md outline-rose-700 border-2 border-black-200 text-black placeholder:text-black-200 mb-3"
            type="text"
            id="category"
            name="category"
            placeholder="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div className="w-full items-center text-center">
          <input
            className="w-full p-3 bg-white rounded-md outline-rose-700 border-2 border-black-200 text-black placeholder:text-black-200 mb-3"
            type="text"
            id="brand"
            name="brand"
            placeholder="brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />
        </div>
        <div className="w-full items-center text-center">
          <textarea
            className="w-full p-3 bg-white rounded-md outline-rose-700 border-2 border-black-200 text-black placeholder:text-black-200 mb-3"
            type="text"
            id="description"
            name="description"
            placeholder="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="w-full flex justify-between">
          <input
            className="w-[49%] p-3 bg-white rounded-md outline-rose-700 border-2 border-black-200 text-black placeholder:text-black-200 mb-3"
            type="text"
            id="specification1title"
            name="specification1title"
            placeholder="specification1title"
            value={specTitle1}
            onChange={(e) => setSpecTitle1(e.target.value)}
          />
          <input
            className="w-[49%] p-3 bg-white rounded-md outline-rose-700 border-2 border-black-200 text-black placeholder:text-black-200 mb-3"
            type="text"
            id="specification1value"
            name="specification1value"
            placeholder="specification1value"
            value={specValue1}
            onChange={(e) => setSpecValue1(e.target.value)}
          />
        </div>
        <div className="w-full flex justify-between">
          <input
            className="w-[49%] p-3 bg-white rounded-md outline-rose-700 border-2 border-black-200 text-black placeholder:text-black-200 mb-3"
            type="text"
            id="specification2title"
            name="specification2title"
            placeholder="specification2title"
            value={specTitle2}
            onChange={(e) => setSpecTitle2(e.target.value)}
          />
          <input
            className="w-[49%] p-3 bg-white rounded-md outline-rose-700 border-2 border-black-200 text-black placeholder:text-black-200 mb-3"
            type="text"
            id="specification2value"
            name="specification2value"
            placeholder="specification2value"
            value={specValue2}
            onChange={(e) => setSpecValue2(e.target.value)}
          />
        </div>
        <div className="w-full flex justify-between">
          <input
            className="w-[49%] p-3 bg-white rounded-md outline-rose-700 border-2 border-black-200 text-black placeholder:text-black-200 mb-3"
            type="text"
            id="specification3title"
            name="specification3title"
            placeholder="specification3title"
            value={specTitle3}
            onChange={(e) => setSpecTitle3(e.target.value)}
          />
          <input
            className="w-[49%] p-3 bg-white rounded-md outline-rose-700 border-2 border-black-200 text-black placeholder:text-black-200 mb-3"
            type="text"
            id="specification3value"
            name="specification3value"
            placeholder="specification3value"
            value={specValue3}
            onChange={(e) => setSpecValue3(e.target.value)}
          />
        </div>
        <div className="w-full flex justify-between text-black-200 mb-3">
          <div className="w-[49%] p-3 bg-white border-2 border-black-200 rounded-md">
            <input
              className="mr-3"
              type="radio"
              id="forSale"
              name="forSale"
              checked={forSaleState}
              onChange={(e) => setForSaleState(e.target.value)}
            />
            <label htmlFor="forSale">For Sale</label>
          </div>
          <div className="w-[49%] p-3 bg-white border-2 border-black-200 rounded-md">
            <input
              className="mr-3"
              type="radio"
              id="notForSale"
              name="forSale"
              checked={notForSale}
              onChange={(e) => setNotForSale(e.target.value)}
            />
            <label htmlFor="notForSale">Not For Sale</label>
          </div>
        </div>
        <div className="w-full items-center text-center">
          <input
            className="w-full p-3 bg-white rounded-md outline-rose-700 border-2 border-black-200 text-black placeholder:text-black-200 mb-3"
            type="text"
            id="photo1"
            name="photo1"
            placeholder="photo1"
            value={photo1}
            onChange={(e) => setPhoto1(e.target.value)}
          />
          <input
            className="w-full p-3 bg-white rounded-md outline-rose-700 border-2 border-black-200 text-black placeholder:text-black-200 mb-3"
            type="text"
            id="photo2"
            name="photo2"
            placeholder="photo2"
            value={photo2}
            onChange={(e) => setPhoto2(e.target.value)}
          />
          <input
            className="w-full p-3 bg-white rounded-md outline-rose-700 border-2 border-black-200 text-black placeholder:text-black-200 mb-3"
            type="text"
            id="photo3"
            name="photo3"
            placeholder="photo3"
            value={photo3}
            onChange={(e) => setPhoto3(e.target.value)}
          />
        </div>
        <button
          className="w-full bg-black text-white rounded-md outline-none p-3"
          type="submit"
        >
          {mode === "new" ? "Add Product" : "Update Product"}
        </button>
      </form>
    </section>
  );
};

export default AddProductForm;
