// app/api/users/user.controller.ts
import { NextResponse } from 'next/server';
import * as userService from './user.service';
import { UserDTO, UpdateUserDTO } from './user.dto';
import { updateUser } from '@/types/user';

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

// Handler for fetching a single user by Token
export async function getUserByToken(token: string) {
  try {
    // console.log(params);
    const user = await userService.getUserByToken(token);
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

// Handler for fetching a single user by Id
export async function getUserById(id: number) {
  try {
    const user = await userService.getUserById(id);
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

export async function updateUserById(userData: updateUser) {
  try {
    const user = await userService.updateUserById(userData);
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
        return NextResponse.json({ message: 'Error updating user', error: error.message }, { status: 500 });
    } else {
        return NextResponse.json({ message: 'An unknown error occurred' }, { status: 500 });
    }
  }
}
