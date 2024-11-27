import React, { useCallback, useEffect, useState } from "react";
import ApiExecute from "../../../api";
import Actions from "../../components/Actions";
import swal from "sweetalert";
import LaravelPagination from "../../components/LaravelPagination";
import { Link } from "react-router-dom";

const ProductScreen = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [entries, setEntries] = useState(10);
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState({});

  const [limit, setLimit] = useState(10);

  const toggleModal = (product = null) => {
    setSelectedCategory(product);
    setIsModalOpen(!isModalOpen);
  };

  const fetchProducts = useCallback(
    async (page = 1) => {
      const apiResponse = await ApiExecute(
        `product?page=${page}&limit=${limit}`
      );

      if (apiResponse.status) setProducts(apiResponse.data);
    },
    [limit]
  );

  const deleteCategory = async (productSlug) => {
    swal({
      title: "Are you sure?",
      text: "Are you sure you want to delete this product?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        const apiResponse = await ApiExecute(`product/${productSlug}`, {
          method: "POST",
          data: {
            _method: "DELETE",
          },
        });
        if (apiResponse.status) {
          swal("Deleted!", "Category deleted successfully!", "success");
          fetchProducts(); // Reload products after deletion
        } else {
          swal(
            "OOPS!",
            "Failed to delete the product. Please try again.",
            "warning"
          );
        }
      }
    });
  };

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search here..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded-lg p-2"
          />
        </div>
        <Link
          to={"/transresin-panel/add-product"}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          + Add Product
        </Link>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">All Products</h2>
        {/* {JSON.stringify(products.data)} */}
        <LaravelPagination
          items={products}
          fetchData={fetchProducts}
          limit={limit}
          setLimit={setLimit}
        >
          <table className="table">
            <thead>
              <tr>
                <th>S.No.</th>
                <th colSpan={2}>Item Details</th>
                <th>Attributes</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products?.data?.map((product, index) => {
                const hasChildren = products.data.some(
                  (cat) => cat.parent?.id === product.id
                );
                return (
                  <tr key={index}>
                    <td>{index + products.from}.</td>
                    <td>
                      <img
                        src={product.image}
                        alt=""
                        className="size-24 rounded border border-3 border-black object-contain"
                      />
                    </td>
                    <td>
                      <div>
                        <div className="font-bold text-lg capitalize whitespace-nowrap">
                          {product.name}
                        </div>
                        <div className="text-sm">
                          <div>
                            <strong>HSN: </strong> {product.hsn_code?.code}
                          </div>
                          <div>
                            <strong>GST: </strong> {product.hsn_code?.gst_rate}%
                          </div>
                          <div>
                            <strong>HSN: </strong> {product.hsn_code?.code}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="border-b px-4 py-3 text-sm">
                      <div>
                        <strong>Category: </strong> {product.category?.name}
                      </div>
                      <div>
                        <strong>Industry: </strong>{" "}
                        {product.industry_category?.name}
                      </div>
                      <div>
                        <strong>Application: </strong>{" "}
                        {product.application?.name}
                      </div>
                      <div>
                        <strong>Brand: </strong> {product.brand?.name}
                      </div>
                    </td>
                    <td>
                      <div>
                        <div className="text-sm">
                          <div>
                            <strong>Regular: </strong> ₹{product.regular_price}
                          </div>
                          <div>
                            <strong>Discount: </strong> {product.discount}%
                          </div>
                          <div>
                            <strong>Trade Price: </strong>₹{product.trade_price}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <Actions
                        preventDelete={hasChildren}
                        editCallback={() => toggleModal(product)}
                        deleteCallback={() => deleteCategory(product.slug)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </LaravelPagination>
      </div>
    </div>
  );
};

export default ProductScreen;
