// app/api/users/user.dto.ts

// DTO for creating a new user
export interface UserDTO {
    name: string;
    email: string;
    password: string;
  }
  
  // DTO for updating an existing user (fields may be optional)
  export interface UpdateUserDTO {
    name?: string;
    email?: string;
    password?: string;
  }
  
  // DTO for user response (for returning user data)
  export interface UserResponseDTO {
    id: number;
    name: string;
    email: string;
  }
  