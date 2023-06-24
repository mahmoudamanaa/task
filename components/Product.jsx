"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Product = ({ product, refreshHandler, modalHandler }) => {
  const router = useRouter();

  const deleteHandler = async () => {
    await fetch(
      `http://localhost:3000/api/products/deleteproduct/${product._id}`,
      { method: "DELETE" }
    );
    refreshHandler(product._id);
  };

  const updateHandler = () => {
    router.push(`/products/updateproduct/${product._id}`);
  };

  return (
    <React.Fragment>
      <tr className="border-b-2">
        <td className="p-2">{product._id}</td>
        <td className="p-2">{product.productName}</td>
        <td className="p-2">{product.price}</td>
        <td className="p-2">{product.brand}</td>
        <td className="p-2">{product.category}</td>
        <td className="p-2">{product.description.slice(0, 16)}...</td>
        <td className="p-2">
          <h3
            className="bg-green-300 text-center rounded"
            onClick={() => modalHandler(product.photos)}
          >
            Gallery
          </h3>
        </td>
        <td className="p-2">
          {product.forSale ? (
            <h3 className="bg-green-300 text-center rounded">Active</h3>
          ) : (
            <h3 className="bg-rose-300 text-center rounded">Inactive</h3>
          )}
        </td>
        <td className="text-center">
          <FontAwesomeIcon
            icon={faTrash}
            className="mr-6 hover:text-rose-700 cursor-pointer"
            onClick={deleteHandler}
          />
          <FontAwesomeIcon
            className="cursor-pointer hover:text-green-300"
            icon={faPen}
            onClick={updateHandler}
          />
        </td>
      </tr>
    </React.Fragment>
  );
};

export default Product;
