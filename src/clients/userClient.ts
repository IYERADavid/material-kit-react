'use client'

import axios from 'axios';
import type { updateUser, User } from '@/types/user';


export interface userInterface {
    userId: number,
    fullName: string,
    email: string,
    phone?: string | undefined,
}

class UserClient {
    async getLoggedInUserData(userId: number) {
        let response;
        try {
            response = await axios.get('/api/user', {
                params: { id: userId }
            });
        } catch (error) {
            
        }
        return response?.data
    }

    async updateUser(user: userInterface ) {
        let response;
        try {
            response = await axios.put('/api/user', user);
        } catch (error) {
            
        }
        return response?.data;
    }

}

export const userClient = new UserClient();