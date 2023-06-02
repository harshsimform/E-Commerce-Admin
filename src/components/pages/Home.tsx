import React, { useMemo } from "react";
import { Box, Link, useColorMode } from "@chakra-ui/react";
import { ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useState, useEffect } from "react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { ImageCellProps } from "../../interface/interface";
import axios from "axios";

const environment = import.meta.env;

const ImageCell: React.FC<ImageCellProps> = ({ value }) => {
  const handleClick = () => {
    window.open(value, "_blank");
  };

  return (
    <Link
      onClick={handleClick}
      color="blue.600"
      _hover={{ textDecoration: "none" }}
    >
      View Image
    </Link>
  );
};

const Home = () => {
  const { colorMode } = useColorMode();

  const [rowData, setRowData] = useState([]);

  const [columnDefs, setColumnDefs] = useState([
    { field: "_id" },
    { field: "name" },
    { headerName: "Image", field: "image", cellRenderer: ImageCell },
    { field: "description" },
    { field: "discountedPrice" },
    { field: "originalPrice" },
    { field: "quantity" },
    { field: "displaySection" },
    { field: "gender" },
    { field: "category" },
    { field: "recordDate" },
  ]);

  const fetchProductDetails = async () => {
    try {
      const response = await axios.get(environment.VITE_API_BASE_URL);
      setRowData(response.data.productDetails);
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, []);

  const defaultColDef = useMemo<ColDef>(() => {
    return {
      sortable: true,
      filter: true,
      flex: 1,
      minWidth: 100,
      resizable: true,
    };
  }, []);

  return (
    <>
      <center>
        <Box
          width={10 / 12}
          textAlign={"center"}
          justifyContent={"center"}
          display={"flex"}
          fontWeight={500}
          color={"teal.400"}
          fontSize="3xl"
        >
          <h1>Product Summary</h1>
        </Box>
        <Box
          mt={5}
          className={
            colorMode === "light" ? "ag-theme-alpine" : "ag-theme-alpine-dark"
          }
          style={{ height: "40.3rem", width: "90%" }}
        >
          <AgGridReact
            rowData={rowData}
            columnDefs={columnDefs}
            animateRows={true}
            defaultColDef={defaultColDef}
            enableCellTextSelection={true}
            pagination={true}
            paginationPageSize={13}
          />
        </Box>
      </center>
    </>
  );
};

export default Home;
