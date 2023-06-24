"use client";

import { setLogout } from "@/app/redux/features/auth/authSlice";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import Product from "./Product";
import { useEffect, useState } from "react";

const Products = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [sortDir, setSortDir] = useState("");
  const [filter, setFilter] = useState("");
  const [totalItems, setTotalItems] = useState(0);
  const [page, setPage] = useState(1);
  const [numOfPages, setNumOfPages] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [productPhotos, setProductPhotos] = useState([]);
  const [effectChange, setEffectChange] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filterParameter, setFilterParameter] = useState("");
  const [isClicked, setIsClicked] = useState("");

  useEffect(() => {
    const getProducts = async () => {
      const response = await fetch(
        `http://localhost:3000/api/products/getproducts/${page}`
      );
      const data = await response.json();
      setProducts(data.products);
      setFilteredProducts(data.products);
      setTotalItems(data.totalItems);
    };
    getProducts();
  }, [page, effectChange]);

  useEffect(() => {
    setNumOfPages(Math.ceil(totalItems / 5));
  }, [totalItems]);

  function dynamicSort(property) {
    var sortOrder = 1;
    if (property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
    }
    return function (a, b) {
      var result =
        a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
      return result * sortOrder;
    };
  }

  useEffect(() => {
    const l = filter.length;
    setFilteredProducts([...products]);
    if (filterParameter === "id") {
      setFilteredProducts((preState) =>
        preState.filter((product) => product._id.slice(0, l) === filter)
      );
    } else if (filterParameter === "name") {
      setFilteredProducts((preState) =>
        preState.filter(
          (product) =>
            product.productName.slice(0, l).toLowerCase() ===
            filter.toLowerCase()
        )
      );
    } else if (filterParameter === "price") {
      setFilteredProducts((preState) =>
        preState.filter(
          (product) => product.price.toString().slice(0, l) === filter
        )
      );
    } else if (filterParameter === "brand") {
      setFilteredProducts((preState) =>
        preState.filter(
          (product) =>
            product.brand.slice(0, l).toLowerCase() === filter.toLowerCase()
        )
      );
    } else if (filterParameter === "category") {
      setFilteredProducts((preState) =>
        preState.filter(
          (product) =>
            product.category.slice(0, l).toLowerCase() === filter.toLowerCase()
        )
      );
    }
  }, [filter, filterParameter]);

  const sortHandler = (sortParam) => {
    setSortDir((prevState) => (prevState === "" ? "-" : ""));
    setFilteredProducts((prevState) =>
      prevState.sort(dynamicSort(sortDir + sortParam))
    );
  };

  const logoutHandler = () => {
    dispatch(setLogout());
    localStorage.clear();
    router.replace("/");
  };

  const refreshHandler = (deletedProductId) => {
    const newProducts = products.filter(
      (product) => product._id !== deletedProductId
    );
    setProducts(newProducts);
    setEffectChange(!effectChange);
  };

  const modalHandler = (productPhotos) => {
    setOpenModal(true);
    setProductPhotos(productPhotos);
  };

  return (
    <section className="relative">
      {openModal && (
        <div
          className="fixed left-0 top-0 w-full h-full z-10 bg-slate-400 flex justify-center items-center"
          onClick={() => setOpenModal(false)}
        >
          {productPhotos.map((photo, i) => (
            <div className="m-8 w-1/3" key={i}>
              <img src={photo} alt="photo" className="w-full" />
            </div>
          ))}
        </div>
      )}
      <header className="flex justify-between items-center p-4">
        <h1 className="text-3xl">Dashboard</h1>
        <h2 className="lg:block hidden">Hello,</h2>
        <div>
          <button
            className="bg-rose-700 text-white rounded-md outline-none p-3 mr-2"
            onClick={() => router.push("/products/addproduct")}
          >
            Add Product
          </button>
          <button
            className="bg-black text-white rounded-md outline-none p-3"
            onClick={logoutHandler}
          >
            Logout
          </button>
        </div>
      </header>
      <div className="flex flex-col items-center">
        <h1 className="text-lg">Products Table</h1>
        <input
          type="text"
          className="p-3 bg-white rounded-md outline-rose-700 border-2 border-black-200 text-black placeholder:text-black-200 mt-2"
          placeholder="filter..."
          onChange={(e) => setFilter(e.target.value)}
          value={filter}
        />
        <div className="m-2 flex flex-wrap justify-center">
          <span
            className={`m-2 cursor-pointer p-2 rounded ${
              isClicked === "id" ? "bg-green-300" : "bg-rose-300"
            }`}
            onClick={() => {
              setFilterParameter("id");
              setIsClicked("id");
            }}
          >
            By Id
          </span>
          <span
            className={`m-2 cursor-pointer p-2 rounded ${
              isClicked === "name" ? "bg-green-300" : "bg-rose-300"
            }`}
            onClick={() => {
              setFilterParameter("name");
              setIsClicked("name");
            }}
          >
            By Name
          </span>
          <span
            className={`m-2 cursor-pointer p-2 rounded ${
              isClicked === "price" ? "bg-green-300" : "bg-rose-300"
            }`}
            onClick={() => {
              setFilterParameter("price");
              setIsClicked("price");
            }}
          >
            By Price
          </span>
          <span
            className={`m-2 cursor-pointer p-2 rounded ${
              isClicked === "brand" ? "bg-green-300" : "bg-rose-300"
            }`}
            onClick={() => {
              setFilterParameter("brand");
              setIsClicked("brand");
            }}
          >
            By Brand
          </span>
          <span
            className={`m-2 cursor-pointer p-2 rounded ${
              isClicked === "category" ? "bg-green-300" : "bg-rose-300"
            }`}
            onClick={() => {
              setFilterParameter("category");
              setIsClicked("category");
            }}
          >
            By Category
          </span>
        </div>
        {filteredProducts.length <= 0 ? (
          <div>No products available.</div>
        ) : (
          <div className="overflow-x-scroll w-full mx-2 mt-6 border-4 p-3 lg:m-6 lg:w-[1200px] rounded-xl">
            <table className="w-full overflow-x-scroll">
              <thead className="text-rose-700">
                <tr className="border-b-2 text-left">
                  <th className="p-2" onClick={() => sortHandler("_id")}>
                    ID
                  </th>
                  <th
                    className="p-2"
                    onClick={() => sortHandler("productName")}
                  >
                    Product Name
                  </th>
                  <th className="p-2" onClick={() => sortHandler("price")}>
                    Price
                  </th>
                  <th className="p-2" onClick={() => sortHandler("brand")}>
                    Brand
                  </th>
                  <th className="p-2" onClick={() => sortHandler("category")}>
                    Category
                  </th>
                  <th
                    className="p-2"
                    onClick={() => sortHandler("description")}
                  >
                    Description
                  </th>
                  <th className="p-2" onClick={() => sortHandler("photos")}>
                    Photos
                  </th>
                  <th className="p-2" onClick={() => sortHandler("forSale")}>
                    For Sale
                  </th>
                  <th className="p-2" onClick={() => sortHandler("options")}>
                    Options
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <Product
                    product={product}
                    key={product._id}
                    refreshHandler={refreshHandler}
                    modalHandler={modalHandler}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className="m-4">
          {Array.from(Array(numOfPages)).map((x, i) => (
            <span
              className="bg-rose-300 m-2 p-2 rounded"
              key={i}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
