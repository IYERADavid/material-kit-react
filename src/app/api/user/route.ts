// app/api/users/route.ts
import { createUser, getAllUsers, getUserById } from './user.controller';

export async function POST(request: Request) {
    console.log("reached");
    
  return createUser(request);  // Handles creating a user
}

export async function GET() {
  // if (params) {
  //   return getUserById({ params });  // Handles fetching a user by ID
  // }
  // return getAllUsers();
}
