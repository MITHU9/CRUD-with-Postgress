import { Button, Input, VStack } from "@chakra-ui/react";
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Field } from "./ui/field";
import SelectRole from "./SelectRole";
import { useState } from "react";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { baseURL } from "../../constants/global-variable";
import { queryClient } from "../utils/queryClient";

const InputEmployee = ({ children, type = "add", data }) => {
  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState(
    type === "add"
      ? {
          name: "",
          email: "",
          age: "",
          salary: "",
          role: "",
        }
      : data
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addEmployeeMutation = useMutation({
    mutationFn: async (info) => {
      const response = await fetch(baseURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(info),
      });

      //console.log(response);

      if (!response.ok) {
        throw new Error(response.message);
      }
      return response.json();
    },
    onError: (error) => {
      console.log(error.message);
      toast.error(error.message);
    },
    onSuccess: () => {
      setOpen(false);
      setInfo({
        name: "",
        email: "",
        age: "",
        salary: "",
        role: "",
      });
      toast.success("Employee added successfully");
      queryClient.invalidateQueries({
        queryKey: ["employee_details"],
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (info) => {
      const response = await fetch(`${baseURL}/${info.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(info),
      });

      //console.log(response);

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
      setOpen(false);
      setInfo({
        name: "",
        email: "",
        age: "",
        salary: "",
        role: "",
      });
      toast.success("Employee updated successfully");
      queryClient.invalidateQueries({
        queryKey: ["employee_details"],
      });
    },
  });

  const requiredFields = ["name", "email", "age", "salary"];

  const handleSubmit = () => {
    const isAllFieldsFilled = requiredFields.every((field) =>
      info[field].toString().trim()
    );
    if (!isAllFieldsFilled) {
      toast.error("Missing required fields");
      return;
    }

    const updatedInfo = {
      ...info,
      role: info.role || null,
    };
    if (type === "add") {
      addEmployeeMutation.mutate(updatedInfo);
      return;
    }
    updateMutation.mutate(updatedInfo);
  };
  //console.log(info);

  return (
    <DialogRoot
      placement="center"
      motionPreset="slide-in-bottom"
      open={open}
      onOpenChange={(e) => setOpen(e.open)}
    >
      {children}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {type === "add" ? "Add Employee" : "Edit Employee"}
          </DialogTitle>
        </DialogHeader>
        <DialogBody>
          <VStack gap="4" align="flex-start">
            <Field label="Username" required>
              <Input
                placeholder="Enter username"
                name="name"
                value={info.name}
                onChange={handleChange}
              />
            </Field>
            <Field label="Email" required>
              <Input
                placeholder="Enter email"
                name="email"
                value={info.email}
                onChange={handleChange}
              />
            </Field>
            <Field label="Age" required>
              <Input
                placeholder="Enter age"
                name="age"
                type="number"
                value={info.age}
                onChange={handleChange}
              />
            </Field>
            <Field label="Salary" required>
              <Input
                placeholder="Enter salary"
                name="salary"
                value={info.salary}
                onChange={handleChange}
              />
            </Field>
            <SelectRole setInfo={setInfo} />
          </VStack>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="outline">Cancel</Button>
          </DialogActionTrigger>
          <Button colorScheme="blue" onClick={handleSubmit}>
            {type === "add" ? "Add" : "Update"}
          </Button>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
};
export default InputEmployee;
