// app/api/users/user.controller.ts
import { NextResponse } from 'next/server';
import * as userService from './user.service';
import { UserDTO, UpdateUserDTO } from './user.dto';

// Handler for creating a user
export async function createUser(request: Request) {
  try {
    const userData: UserDTO = await request.json();
    const user = await userService.createUser(userData);
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
        return NextResponse.json({ message: 'Error creating user', error: error.message }, { status: 500 });
    } else {
        return NextResponse.json({ message: 'An unknown error occurred' }, { status: 500 });
    }
  }
}

// Handler for fetching all users
export async function getAllUsers() {
  try {
    const users = await userService.getAllUsers();
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
        return NextResponse.json({ message: 'Error fetching users', error: error.message }, { status: 500 });
    } else {
        return NextResponse.json({ message: 'An unknown error occurred' }, { status: 500 });
    }
  }
}

// Handler for fetching a single user by ID
export async function getUserById({ params }: { params: { id: string } }) {
  try {
    const user = await userService.getUserById(params.id);
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
        return NextResponse.json({ message: 'Error fetching users', error: error.message }, { status: 500 });
    } else {
        return NextResponse.json({ message: 'An unknown error occurred' }, { status: 500 });
    }
  }
}
