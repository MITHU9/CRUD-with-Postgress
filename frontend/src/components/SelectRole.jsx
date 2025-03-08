import { createListCollection } from "@chakra-ui/react";
import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "./ui/select";

const SelectRole = ({ setInfo }) => {
  return (
    <SelectRoot
      collection={roles}
      size="sm"
      width="320px"
      onChange={(e) => setInfo((prev) => ({ ...prev, role: e.target.value }))}
    >
      <SelectLabel>Select Role</SelectLabel>
      <SelectTrigger>
        <SelectValueText placeholder="Select movie" />
      </SelectTrigger>
      <SelectContent className="select">
        {roles.items.map((role) => (
          <SelectItem item={role} key={role.value}>
            {role.label}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectRoot>
  );
};
export default SelectRole;

const roles = createListCollection({
  items: [
    { label: "HR", value: "HR" },
    { label: "Developer", value: "Developer" },
    { label: "Manager", value: "Manager" },
    { label: "Sales", value: "Sales" },
    { label: "Intern", value: "Intern" },
  ],
});
