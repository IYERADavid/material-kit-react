// app/api/users/user.services.ts
import * as userModel from './user.model';
import { UserDTO, UpdateUserDTO } from './user.dto';

// Service method for creating a user
export async function createUser(userData: UserDTO) {
  const { name, email, password } = userData;
  // Business logic (e.g., password hashing, validation) can be added here
  return userModel.createUser(name, email, password);  // Calls the model to insert the user into the DB
}

// Service method for getting all users
export async function getAllUsers() {
  return userModel.getAllUsers();  // Calls the model to fetch all users
}

// Service method for getting a user by ID
export async function getUserById(id: string) {
  return userModel.getUserById(id);  // Calls the model to fetch the user by ID
}
