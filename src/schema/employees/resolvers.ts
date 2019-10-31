// Imports
import validator = require("validator");

// App Imports
import { Employee } from "../../models/Employee";
import IEmployee from "../../interfaces/IEmployee";
import * as sendEmail from "../../services/mail";
import * as templates from "../../templates/email";

/**
 * Add Employee.
 * @param {args} - containing params sent by graphql expecting (name, email, location, department, imageUrl).
 * @return {id:createdEmployee._id,name:createdEmployee.name,email:createdEmployee.email,location:createdEmployee.location,department:createdEmployee.department,imageUrl:createdEmployee.imageUrl} The created employee.
 */
export async function addEmployee(parentValue: any, args: any, req: any) {
  checkAuth(req.isAuth);
  validateEmployee(args);
  const employee = new Employee({
    name: args.name,
    email: args.email,
    location: args.location,
    department: args.department,
    imageUrl: args.imageUrl
  });
  const createdEmployee = (await employee.save()) as IEmployee;
  sendEmail.send(createdEmployee.email, templates.member(createdEmployee));
  return {
    ...createdEmployee._doc,
    _id: createdEmployee._id.toString(),
    createdAt: createdEmployee.createdAt.toISOString(),
    updatedAt: createdEmployee.updatedAt.toISOString()
  };
}

/**
 * Set Employee.
 * @param {args} - containing params sent by graphql expecting (name, email, location, department, imageUrl).
 * @return {id:updatedEmployee._id,name:updatedEmployee.name,email:updatedEmployee.email,location:updatedEmployee.location,department:updatedEmployee.department,imageUrl:updatedEmployee.imageUrl} The updated employee.
 */
export async function setEmployee(parentValue: any, args: any, req: any) {
  checkAuth(req.isAuth);
  const employee = await Employee.findById(args.id);
  validateEmployee(args);
  employee.set("name", args.name);
  employee.set("email", args.email);
  employee.set("location", args.location);
  employee.set("department", args.department);
  employee.set("imageUrl", args.imageUrl);
  const updatedEmployee = (await employee.save()) as any;
  return {
    ...updatedEmployee._doc,
    _id: updatedEmployee._id.toString(),
    createdAt: updatedEmployee.createdAt.toISOString(),
    updatedAt: updatedEmployee.updatedAt.toISOString()
  };
}

/**
 * Get Employees.
 * @param {args} - containing params sent by graphql expecting (page).
 * @return {employeesList:employeesList,totalEmployees:totalEmployees} contain employees list with total number of employees.
 */
export async function getEmployees(parentValue: any, args: any, req: any) {
  checkAuth(req.isAuth);
  const page = !args.page ? 1 : args.page;
  const perPage = 4;
  const totalEmployees = await Employee.find().countDocuments();
  const employees = await Employee.find()
    .sort({ createdAt: -1 })
    .skip((page - 1) * perPage)
    .limit(perPage);
  return {
    employeesList: employees.map((employee: any) => {
      return {
        ...employee._doc,
        _id: employee._id.toString(),
        createdAt: employee.createdAt.toISOString(),
        updatedAt: employee.updatedAt.toISOString()
      };
    }),
    totalEmployees
  };
}

/**
 * Get Employee.
 * @param {args} - containing params sent by graphql expecting (id).
 * @return {id:foundEmployee._id,name:foundEmployee.name,email:foundEmployee.email,location:foundEmployee.location,department:foundEmployee.department,imageUrl:foundEmployee.imageUrl} contain employees list with total number of employees.
 */
export async function getEmployee(parentValue: any, args: any, req: any) {
  checkAuth(req.isAuth);
  const employee = (await Employee.findById(args.id)) as any;
  return {
    ...employee._doc,
    _id: employee._id.toString(),
    createdAt: employee.createdAt.toISOString(),
    updatedAt: employee.updatedAt.toISOString()
  };
}

/**
 * Search Employees.
 * @param {args} - containing params sent by graphql expecting (page).
 * @return {employeesList:employeesList,totalEmployees:totalEmployees} contain employees list with total number of employees.
 */
export async function searchQuery(parentValue: any, args: any, req: any) {
  checkAuth(req.isAuth);
  const page = !args.page ? 1 : args.page;
  const perPage = 4;
  const queryOptions = {
    $or: [
      { name: { $regex: args.searchValue, $options: "i" } },
      { email: { $regex: args.searchValue, $options: "i" } },
      { location: { $regex: args.searchValue, $options: "i" } },
      { department: { $regex: args.searchValue, $options: "i" } }
    ]
  };
  const totalEmployees = await Employee.find(queryOptions).countDocuments();
  const employees = await Employee.find(queryOptions)
    .sort({ createdAt: -1 })
    .skip((page - 1) * perPage)
    .limit(perPage);
  return {
    employeesList: employees.map((employee: any) => {
      return {
        ...employee._doc,
        _id: employee._id.toString(),
        createdAt: employee.createdAt.toISOString(),
        updatedAt: employee.updatedAt.toISOString()
      };
    }),
    totalEmployees
  };
}

/**
 * Delete Employee.
 * @param {args} - containing params sent by graphql expecting (id).
 * @return {_id:deletedUser.id} id of the deleted employee.
 */
export async function deleteEmployee(parentValue: any, args: any, req: any) {
  checkAuth(req.isAuth);
  const employee = await Employee.findById(args.id);
  await Employee.findByIdAndRemove(employee._id);
  return { _id: employee._id };
}

/**
 * Employee Validator.
 * @param {args} - containing params sent by graphql expecting (name, email, location, department, imageUrl).
 * @return {errors} - containing array of errors if any
 */
export function validateEmployee(args: any) {
  const errors = [];
  if (
    validator.isEmpty(args.name) ||
    !validator.isLength(args.name, { min: 5 })
  ) {
    errors.push({ message: "Name is invalid." });
  }
  if (validator.isEmpty(args.email) || !validator.isEmail(args.email)) {
    errors.push({ message: "Email is invalid." });
  }
  if (
    validator.isEmpty(args.location) ||
    !validator.isLength(args.location, { min: 5 })
  ) {
    errors.push({ message: "Location is invalid." });
  }
  if (
    validator.isEmpty(args.department) ||
    !validator.isLength(args.department, { min: 5 })
  ) {
    errors.push({ message: "Department is invalid." });
  }
  if (errors.length > 0) {
    const error = new Error("Invalid input.") as any;
    error.data = errors;
    error.code = 422;
    throw error;
  }
}

/**
 * Auth checker.
 * @param {requestAuth} - contain if isAuth true set in the "isAuth" middleware
 * throw error if user not authenticated
 */
export function checkAuth(requestAuth: boolean) {
  if (!requestAuth) {
    const error = new Error("User not authenticated.") as any;
    error.code = 401;
    throw error;
  }
}
