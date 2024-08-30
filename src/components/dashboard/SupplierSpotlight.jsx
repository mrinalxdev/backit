import React, { useState, useEffect } from "react";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

const supplierData = [
  { id: 1, name: "CJDropshipping", rating: 4.9 },
  { id: 2, name: "AliExpress", rating: 4.8 },
  { id: 3, name: "SaleHoo", rating: 4.8 },
  { id: 4, name: "Modalyst", rating: 4.8 },
  { id: 5, name: "Spocket", rating: 4.7 },
  { id: 6, name: "Doba", rating: 4.7 },
  { id: 7, name: "Printful", rating: 4.6 },
  { id: 8, name: "Megagoods", rating: 4.6 },
  { id: 9, name: "Wholesale2B", rating: 4.6 },
  { id: 10, name: "Worldwide Brands", rating: 4.5 },
  { id: 11, name: "TheWholesaler.co.uk", rating: 4.5 },
  { id: 12, name: "eSources", rating: 4.4 },
];

const SupplierSpotlight = () => {
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    setSuppliers(supplierData);
  }, []);

  const renderStars = (rating) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < Math.floor(rating)
              ? "text-yellow-400 fill-yellow-400"
              : "text-gray-300"
          }`}
        />
      ));
  };

  const renderSupplierCard = (supplier, index) => {
    const isTopThree = index < 3;
    const rankColors = ["bg-yellow-500", "bg-gray-400", "bg-orange-400"];

    return (
      <div className="flex items-center mb-8 relative">
        <div
          className={`absolute left-0 w-1 h-full ${
            isTopThree ? rankColors[index] : "bg-gray-200"
          }`}
        />
        <Badge
          variant="outline"
          className={`
            ${isTopThree ? "text-2xl border-4" : "text-lg border-2"} 
            ${isTopThree ? rankColors[index] : "border-gray-200"} 
            rounded-full w-12 h-12 flex items-center justify-center font-bold z-10 bg-white
          `}
        >
          {index + 1}
        </Badge>
        <Card className="ml-4 w-full max-w-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <h3 className={`${isTopThree ? "text-xl" : "text-lg"} font-bold`}>
                {supplier.name}
              </h3>
              <div className="flex items-center space-x-2">
                <div className="flex">{renderStars(supplier.rating)}</div>
                <span className="text-sm font-medium text-gray-600">
                  {supplier.rating.toFixed(1)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <Card className="h-full">
      <CardTitle>
        <h2 className="text-3xl font-bold my-6 underline underline-offset-4 text-center text-gray-800">
          Supplier Spotlight
        </h2>
      </CardTitle>
      <CardContent>
        <div className="max-w-3xl mx-auto">
          {suppliers.map((supplier, index) =>
            renderSupplierCard(supplier, index)
          )}
        </div>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-gray-500">
          This all data are provided by{" "}
          <span className="font-semibold">@preplexityai</span> and the ratings
          are scraped from different resources available on{" "}
          <span className="font-semibold">reddit</span> and the{" "}
          <span className="font-semibold">internet</span>
        </p>
      </CardFooter>
    </Card>
  );
};

export default SupplierSpotlight;
