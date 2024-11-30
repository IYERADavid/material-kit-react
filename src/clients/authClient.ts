'use client';

import axios from 'axios';
import type { User } from '@/types/user';

function generateToken(): string {
  const arr = new Uint8Array(12);
  window.crypto.getRandomValues(arr);
  return Array.from(arr, (v) => v.toString(16).padStart(2, '0')).join('');
}


export interface SignUpParams {
  fullName: string;
  email: string;
  password: string;
}

export interface SignInWithOAuthParams {
  provider: 'google' | 'discord';
}

export interface SignInWithPasswordParams {
  email: string;
  password: string;
}

export interface ResetPasswordParams {
  email: string;
}

class AuthClient {
  async signUp(params: SignUpParams): Promise<{ error?: string }> {
    const { fullName, email, password } = params;
    let response;
    // Make API request
    try {
      // Send POST request to the API to create the user
      response = await axios.post('/api/user', {
        name: fullName,
        email: email,
        password: password,
      });
      console.log(response);
      
    } catch (error) {
    
    }

    localStorage.setItem('custom-auth-token', response?.data.token);

    return response?.data;
  }

  async signInWithOAuth(_: SignInWithOAuthParams): Promise<{ error?: string }> {
    return { error: 'Social authentication not implemented' };
  }

  async signInWithPassword(params: SignInWithPasswordParams): Promise<{ error?: string }> {
    const { email, password } = params;

    if (email == '' || password == "") {
      return { error: 'Invalid credentials' };
    }

    const authDetails = { email: email, password: password, }
    let response;

    try {
      response = await axios.get('/api/user', {
        params : { authDetails: JSON.stringify(authDetails) }
      });
    } catch (error) {
    
    }

    localStorage.setItem('custom-auth-token', response?.data.token);
    return response?.data;
  }

  async resetPassword(_: ResetPasswordParams): Promise<{ error?: string }> {
    return { error: 'Password reset not implemented' };
  }

  async updatePassword(_: ResetPasswordParams): Promise<{ error?: string }> {
    return { error: 'Update reset not implemented' };
  }

  async getUser(): Promise<{ data?: User | null; error?: string }> {
    const token = localStorage.getItem('custom-auth-token');
    // Make API request
    if (token) {

      let response;
      try {
        response = await axios.get('/api/user', {
          params: { token: token}
        });
        console.log(response);
      } catch (error) {
        
      }

      if (!response?.data) {
        return { data: null };
      }

      return { data: response?.data };
    }
    return { data: null };
  }

  async signOut(): Promise<{ error?: string }> {
    localStorage.removeItem('custom-auth-token');

    return {};
  }
}

export const authClient = new AuthClient();
