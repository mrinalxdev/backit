import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TaskSystem from "./TaskSystem";

const DashComp = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct1, setSelectedProduct1] = useState("");
  const [selectedProduct2, setSelectedProduct2] = useState("");

  useEffect(() => {
    fetch("/products.json")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error loading products:", error));
  }, []);

  const getComparisonData = () => {
    const product1 = products.find((p) => p.id === selectedProduct1);
    const product2 = products.find((p) => p.id === selectedProduct2);

    if (!product1 || !product2) return [];

    return [
      { name: "Price", product1: product1.price, product2: product2.price },
      { name: "Rating", product1: product1.rating, product2: product2.rating },
      { name: "Stock", product1: product1.stock, product2: product2.stock },
    ];
  };

  return (
    <Card className="w-full mx-auto ">
      <CardHeader>
        <CardTitle>Product Comparison</CardTitle>
        <p className="text-sm font-light text-gray-500">
          Products shown here are updated monthly, we added up a scraper in many
          ecommerce websites to scrape up the data.
        </p>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-4 mb-4">
          <Select onValueChange={setSelectedProduct1} value={selectedProduct1}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select product 1" />
            </SelectTrigger>
            <SelectContent>
              {products.map((product) => (
                <SelectItem key={product.id} value={product.id}>
                  {product.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select onValueChange={setSelectedProduct2} value={selectedProduct2}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select product 2" />
            </SelectTrigger>
            <SelectContent>
              {products.map((product) => (
                <SelectItem key={product.id} value={product.id}>
                  {product.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={getComparisonData()}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="product1" fill="#8884d8" name={selectedProduct1} />
            <Bar dataKey="product2" fill="#82ca9d" name={selectedProduct2} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
      <Card className="w-full border-none">
        <CardContent>
          <TaskSystem height="h-[239px]" />
        </CardContent>
      </Card>
    </Card>
  );
};

export default DashComp;
