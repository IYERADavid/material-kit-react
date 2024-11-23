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

    // Make API request

    // We do not handle the API, so we'll check if the credentials match with the hardcoded ones.
    if (email !== 'sofia@devias.io' || password !== 'Secret1') {
      return { error: 'Invalid credentials' };
    }

    const token = generateToken();
    localStorage.setItem('custom-auth-token', token);

    return {};
  }

  async resetPassword(_: ResetPasswordParams): Promise<{ error?: string }> {
    return { error: 'Password reset not implemented' };
  }

  async updatePassword(_: ResetPasswordParams): Promise<{ error?: string }> {
    return { error: 'Update reset not implemented' };
  }

  async getUser(): Promise<{ data?: User | null; error?: string }> {
    // Make API request
    let response;
    try {
      response = await axios.get('/api/user', {
        params: { token: localStorage.getItem('custom-auth-token') }
      });
      console.log(response);
    } catch (error) {
      
    }

    // We do not handle the API, so just check if we have a token in localStorage.
    // const token = localStorage.getItem('custom-auth-token');

    if (!response?.data) {
      return { data: null };
    }

    return { data: response?.data };
  }

  async signOut(): Promise<{ error?: string }> {
    localStorage.removeItem('custom-auth-token');

    return {};
  }
}

export const authClient = new AuthClient();
