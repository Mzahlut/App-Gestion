import NavBar from "../Components/NavBar.jsx";
import ProductGrid from "../Components/ProductGrid.jsx";
import {FilterControl} from "../Utils/FilterControl.jsx";
import { useEffect, useState } from "react";
import axios from "axios";



export const ProductsPage = () => {
  const token = localStorage.getItem("token");
  const [formData, setFormData] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [products, setProducts] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const fields = [
    { id:1, name: "name", label: "Name", type: "text" },
    { id:2, name: "stock", label: "Stock", type: "number" },
    { id:3, name: "price", label: "Price", type: "number" },
    { id:4, name: "supplier", label: "Supplier", type: "select" },
  ];


  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/suppliers", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSuppliers(response.data);
      } catch (error) {
        console.error("Error fetching suppliers:", error);
      }
    };

    fetchSuppliers();
  }, []);


  useEffect(() => {
  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/products", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  fetchProducts();
  }, []);
  
  console.log(products)


  const handleSubmitDialog = async (data) => {
    try {
      const formData = {
        name: data.name,
        stock: data.stock,
        price: data.price,
        supplier: data.supplier
      };

      const response = await axios.post(
        "http://localhost:4000/api/products",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setProducts((prevProducts) => [...prevProducts, response.data]);

      setOpenDialog(false);
      setFormData({});
    } catch (error) {
      console.error("Error al enviar datos del producto:", error);
    }
  };



   

  return (
    <>
      <NavBar
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        headerName="Products"
        type="products"
        handleSubmitDialog={(data, type) => handleSubmitDialog(data, type)}
        formData={formData}
        setFormData={setFormData}
      />

      <FilterControl label="Products" fields={fields} suppliers={suppliers} />

      <ProductGrid
        products={products}
        setProducts={setProducts}
        formData={formData}
        setFormData={setFormData}
      />
    </>
  );
};
