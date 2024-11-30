// app/api/users/route.ts
import { updateUser } from '@/types/user';
import { createUser, getUserById, getAllUsers, signUserIn, getUserByToken, updateUserById } from './user.controller';

export async function POST(request: Request) {
    console.log("reached");
    
  return createUser(request);  // Handles creating a user
}

export async function GET(req: Request) {

  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  const token = searchParams.get('token');
  const authDetails = searchParams.get('authDetails');

  if (id && !isNaN(Number(id))) {
    return getUserById(parseInt(id));
  } else if(token) {
    return getUserByToken(token);
  } else if (authDetails)  {
    let userAuthDetails = JSON.parse(authDetails);
    return signUserIn(userAuthDetails);
  }
  return;
}  

export async function PUT(req: Request) {

  const body = await req.json();
  const { userId, fullName, email, phone } = body;

  if( userId  && !isNaN(Number(userId)) && fullName && email && phone ) {
  
    const user: updateUser = {
      userId: parseInt(userId),
      names: fullName,
      email: email,
      phone: phone, // Optional
    };
    
    return updateUserById(user);
  }
}

// export async function GET() {
  // if (params) {
  //   return getUserById({ params });  // Handles fetching a user by ID
  // }
  // return getAllUsers();
// }
