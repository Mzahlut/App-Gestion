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
    const [filteredItems, setFilteredItems] = useState([])
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

const handleFilter = (filters) => {
  let result = [...products];

  const from = parseFloat(filters?.price?.from);
  const to = parseFloat(filters?.price?.to);

  result = result.filter((product) => {
    const price = parseFloat(product.price);

    if (isNaN(price)) return false;

    const desdeOK = isNaN(from) ? true : price >= from;
    const hastaOK = isNaN(to) ? true : price <= to;

    return desdeOK && hastaOK;
  });

  if (filters?.name) {
    const nameLower = filters.name.toLowerCase();
    result = result.filter((product) =>
      product.name.toLowerCase().includes(nameLower)
    );
  }


  if (filters?.stock) {
    const stock = parseInt(filters.stock);
    if (!isNaN(stock)) {
      result = result.filter((product) => product.stock >= stock);
    }
  }

  if (filters?.supplier) {
    result = result.filter(
      (product) => product.supplier?.name === filters.supplier
    );
  }

  setFilteredItems(result)

  console.log("🔍 Filtrado por precio:", { from, to }, result);
  setFilteredItems(result);
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

      <FilterControl label="Products" fields={fields} suppliers={suppliers} products = {products} onFilter = {handleFilter} />

      <ProductGrid
        products={products}
        setProducts={setProducts}
        formData={formData}
        setFormData={setFormData}
        items = {filteredItems}
      />
    </>
  );
};
