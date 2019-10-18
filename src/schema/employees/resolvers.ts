// App Imports
import { Employee } from '../../models/employee';

/**
   * Add Employee.
   * @param {args} - containing params sent by graphql expecting (name, email, location, department, imageUrl).
   * @return {id:createdEmployee._id,name:createdEmployee.name,email:createdUser.email,location:createdEmployee.location,department:createdEmployee.department,imageUrl:createdEmployee.imageUrl} The created employee.
*/
export async function addEmployee(parentValue: any, args: any, req: any) {
  const errors = [];

  const employee = new Employee({
    name: args.name,
    email: args.email,
    location: args.location,
    department: args.department,
    imageUrl: args.imageUrl
  });
  return await employee.save();
}
