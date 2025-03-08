import { VStack } from "@chakra-ui/react";
import EmployeeTable from "./components/EmployeeTable";
import { useQuery } from "@tanstack/react-query";
import { baseURL } from "../constants/global-variable";
import InputEmployee from "./components/InputEmployee";

const App = () => {
  const fetchEmployeeDetails = async () => {
    const response = await fetch(baseURL);
    if (!response.ok) {
      throw new Error("Something went wrong!");
    }
    return response.json();
  };

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["employee_details"],
    queryFn: fetchEmployeeDetails,
  });

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  //console.log(data);

  return (
    <div className="flex justify-center items-center h-screen">
      <VStack gap="6" align="flex-start">
        <InputEmployee />
        <EmployeeTable data={data} />
      </VStack>
    </div>
  );
};
export default App;
