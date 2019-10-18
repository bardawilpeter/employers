// Imports
import validator = require('validator');

// App Imports
import { Employee } from '../../models/employee';

/**
   * Add Employee.
   * @param {args} - containing params sent by graphql expecting (name, email, location, department, imageUrl).
   * @return {id:createdEmployee._id,name:createdEmployee.name,email:createdUser.email,location:createdEmployee.location,department:createdEmployee.department,imageUrl:createdEmployee.imageUrl} The created employee.
*/
export async function addEmployee(parentValue: any, args: any, req: any) {
  validateEmployee(args);
  const employee = new Employee({
    name: args.name,
    email: args.email,
    location: args.location,
    department: args.department,
    imageUrl: args.imageUrl
  });
  return await employee.save();
}

/**
   * Set Employee.
   * @param {args} - containing params sent by graphql expecting (name, email, location, department, imageUrl).
   * @return {id:createdEmployee._id,name:createdEmployee.name,email:createdUser.email,location:createdEmployee.location,department:createdEmployee.department,imageUrl:createdEmployee.imageUrl} The updated employee.
*/
export async function setEmployee(parentValue: any, args: any, req: any) {
  const employee = await Employee.findById(args._id);
  validateEmployee(args);
  employee.set("name", args.name);
  employee.set("email", args.email);
  employee.set("location", args.location);
  employee.set("department", args.department);
  employee.set("imageUrl", args.imageUrl);
  const updatedEmployee = await employee.save() as any;
  return {
    ...updatedEmployee._doc,
    _id: updatedEmployee._id.toString(),
    createdAt: updatedEmployee.get("createdAt").toISOString(),
    updatedAt: updatedEmployee.get("updatedAt").toISOString()
  };
}

/**
   * Employee Validator.
   * @param {args} - containing params sent by graphql expecting (name, email, location, department, imageUrl).
   * @return {errors} - containing array of errors if any
*/
export function validateEmployee(args: any) {
  const errors = [];
  if (validator.isEmpty(args.name)||validator.isLength(args.name,{min:5}))
  {
    errors.push({ message: 'Title is invalid.' });
  }
  if (validator.isEmpty(args.email) || !validator.isEmail(args.email))
  {
    errors.push({ message: 'Email is invalid.' });
  }
  if (validator.isEmpty(args.location)||validator.isLength(args.name,{min:5}))
  {
    errors.push({ message: 'Location is invalid.' });
  }
  if (validator.isEmpty(args.department)||validator.isLength(args.name,{min:5}))
  {
    errors.push({ message: 'Department is invalid.' });
  }
  if (errors.length > 0) {
    const error = new Error('Invalid input.') as any;//TODO add interface for custom error
    error.data = errors;
    error.code = 422;
    throw error;
  }
}
