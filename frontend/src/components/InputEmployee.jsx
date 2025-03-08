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

const InputEmployee = () => {
  const [info, setInfo] = useState({
    name: "",
    email: "",
    age: "",
    salary: "",
    role: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const requiredFields = ["name", "email", "age", "salary"];

  const handleSubmit = () => {
    const isAllFieldsFilled = requiredFields.every((field) =>
      info[field].trim()
    );
    if (!isAllFieldsFilled) {
      toast.error("Missing required fields");
      return;
    }
  };
  //console.log(info);

  return (
    <DialogRoot placement="center" motionPreset="slide-in-bottom">
      <DialogTrigger asChild>
        <Button variant="outline">Add Employee </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Employee</DialogTitle>
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
            Save
          </Button>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
};
export default InputEmployee;
