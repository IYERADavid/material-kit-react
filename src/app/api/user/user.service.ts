import * as userModel from './user.model';
import { UserDTO, UpdateUserDTO } from './user.dto';
import { updateUser } from '@/types/user';

// Service method for creating a user
export async function createUser(userData: UserDTO) {
  const { name, email, password } = userData;
  return userModel.createUser(name, email, password);
}

// Service method for getting all users
export async function getAllUsers() {
  return userModel.getAllUsers();  // Calls the model to fetch all users
}

// Service method for getting a user by TOKEN
export async function getUserByToken(token: string) {
  return userModel.getUserByToken(token);  // Calls the model to fetch the user by ID
}

// Service method for getting a user by ID
export async function getUserById(id: number) {
  return userModel.getUserById(id);  // Calls the model to fetch the user by ID
}

// Service method for updating a user by ID
export async function updateUserById(user: updateUser) {
  return userModel.updateUserById(user);  // Calls the model to fetch the user by ID
}