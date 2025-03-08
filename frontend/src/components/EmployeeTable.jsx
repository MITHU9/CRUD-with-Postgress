import { HStack, Stack, Table } from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { useMutation } from "@tanstack/react-query";
import { baseURL } from "../../constants/global-variable";
import toast from "react-hot-toast";
import { queryClient } from "../utils/queryClient";

const EmployeeTable = ({ data }) => {
  const mutation = useMutation({
    mutationFn: async (id) => {
      const response = await fetch(`${baseURL}/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      return response.json();
    },
    onError: (error) => {
      console.log(error.message);
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("Employee deleted successfully");
      queryClient.invalidateQueries({
        queryKey: ["employee_details"],
      });
    },
  });

  if (!data.length) {
    return <div>No data found</div>;
  }

  return (
    <Stack gap="10">
      <Table.Root size="lg" variant="outline">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Id</Table.ColumnHeader>
            <Table.ColumnHeader>Name</Table.ColumnHeader>
            <Table.ColumnHeader>Email</Table.ColumnHeader>
            <Table.ColumnHeader>Age</Table.ColumnHeader>
            <Table.ColumnHeader>Role</Table.ColumnHeader>
            <Table.ColumnHeader>Salary</Table.ColumnHeader>
            <Table.ColumnHeader>Actions</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.map((item) => (
            <Table.Row key={item.id}>
              <Table.Cell>{item.id}</Table.Cell>
              <Table.Cell>{item.name}</Table.Cell>
              <Table.Cell>{item.email}</Table.Cell>
              <Table.Cell>{item.age}</Table.Cell>
              <Table.Cell>{item.role}</Table.Cell>
              <Table.Cell>{item.salary}</Table.Cell>
              <Table.Cell>
                <HStack>
                  <MdDelete
                    onClick={() => mutation.mutate(item.id)}
                    className="cursor-pointer text-red-400
                    hover:text-red-500"
                    size={20}
                  />
                  <FaRegEdit
                    className="cursor-pointer text-yellow-400
                    hover:text-yellow-300"
                    size={20}
                  />
                </HStack>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Stack>
  );
};

export default EmployeeTable;
