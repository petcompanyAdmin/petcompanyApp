import { api } from './api';
import { useAuthStore } from '../store/useAuthStore';

export const AuthService = {
    async loginWithGoogle(token: string) {
        return api('/api/users/sync', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
    },

    async logout() {
        const { clearAuth } = useAuthStore.getState();
        await clearAuth();
    },

    linkPhone: async (idToken: string, phoneNumber: string) => {
        const response = await fetch(`/api/users/link-phone`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${idToken}`,
            },
            body: JSON.stringify({ phoneNumber }),
        });
        if (!response.ok) throw new Error(await response.text());
        return await response.json();
    },

}