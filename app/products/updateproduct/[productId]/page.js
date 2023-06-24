"use client";

import AddProductForm from "@/components/AddProductForm";
import { useParams } from "next/navigation";

const page = () => {
  const params = useParams();
  return (
    <div>
      <AddProductForm mode="update" productId={params.productId} />
    </div>
  );
};

export default page;
