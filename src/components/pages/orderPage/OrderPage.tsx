import {
  Box,
  Center,
  HStack,
  Text,
  VStack,
  useBreakpointValue,
  useColorMode,
} from "@chakra-ui/react";
import { useGetCheckoutQuery } from "../../../redux/apiSlice/apiSlice";
import { useNavigate } from "react-router-dom";
import {
  DateParam,
  GetCheckoutData,
  ProdTable,
} from "../../../interface/interface";
import { ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useState, useEffect, useMemo } from "react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const OrderPage = () => {
  const { colorMode } = useColorMode();
  const isScreenFixed = useBreakpointValue({ base: false, md: true });
  const { data: checkouts, isLoading } = useGetCheckoutQuery();
  const navigate = useNavigate();

  const [rowData, setRowData] = useState<GetCheckoutData[]>([]);
  useEffect(() => {
    if (checkouts) {
      setRowData(checkouts);
    }
  }, [checkouts]);

  const columnDefs = useMemo(() => {
    return [
      {
        field: "_id",
        headerName: "Order Id",
        cellRenderer: function IdCellRenderer(params: DateParam & ProdTable) {
          const order = params.data;
          const handleClick = () => {
            navigate(`/order/${order._id}`, { state: { order } });
          };
          return (
            <Text onClick={handleClick} cursor="pointer" color={"blue.500"}>
              {params.value}
            </Text>
          );
        },
      },
      { field: "userId" },
      {
        field: "recordDate",
        cellRenderer: function DateCellRenderer(params: DateParam) {
          const formattedDate = new Date(params.value).toLocaleString("en-IN");
          return <span>{formattedDate}</span>;
        },
      },
    ];
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

  if (isLoading) {
    return (
      <Center marginTop={isScreenFixed ? "12rem" : "2rem"}>
        <Text>Please wait, We are fetching your order details!</Text>
      </Center>
    );
  }

  return (
    <Box overflowX="auto" width={"90%"} mx={"auto"}>
      {checkouts?.length === 0 ? (
        <Center>
          <VStack mt={8}>
            <Text fontSize="lg" fontWeight="bold">
              You have not made any purchase yet
            </Text>
            <HStack>
              <Text
                as="button"
                color="teal.500"
                fontWeight="600"
                onClick={() => navigate("/")}
              >
                Click here
              </Text>
              <Text>to Continue Shopping</Text>
            </HStack>
          </VStack>
        </Center>
      ) : (
        <Center>
          <Box
            mt={5}
            justifyContent="center"
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
        </Center>
      )}
    </Box>
  );
};

export default OrderPage;
