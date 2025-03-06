const createRoleQuery = `
CREATE TYPE role_type AS 
ENUM ('Manager', 'Developer', 'HR','Sales','Intern');
`;

const createEmployeeTableQuery = `
CREATE TABLE employee_details (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            email VARCHAR(100) NOT NULL UNIQUE,
            age SMALLINT NOT NULL CHECK (age > 17),
            role role_type NOT NULL DEFAULT 'Intern',
            salary DECIMAL(10, 2) NOT NULL
          );
`;

const getAllEmployeeQuery = `
SELECT * FROM employee_details;
`;

const createEmployeeQuery = `
INSERT INTO employee_details (name, email, age, role, salary)
VALUES ($1, $2, $3,COALESCE($4::role_type, 'Intern':: role_type), $5)
RETURNING *;
`;

const getSingleEmployeeQuery = `
SELECT * FROM employee_details WHERE id = $1;
`;

const deleteEmployeeQuery = `
DELETE FROM employee_details WHERE id = $1;
`;

const updateEmployeeQuery = `

UPDATE employee_details 

SET 
name = COALESCE($2, name), 
email = COALESCE($3, email), 
age = COALESCE($4, age), 
role = COALESCE($5::role_type, role), 
salary = COALESCE($6, salary)

WHERE id = $1

RETURNING *;
`;

export {
  createRoleQuery,
  createEmployeeTableQuery,
  getAllEmployeeQuery,
  createEmployeeQuery,
  getSingleEmployeeQuery,
  deleteEmployeeQuery,
  updateEmployeeQuery,
};
