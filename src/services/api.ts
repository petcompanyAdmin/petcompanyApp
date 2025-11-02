// just like httpclient wrapper in angular, every api call goes thr here.

const BASE_URL = "http://10.0.2.2:5000";

export const api = async (
    endpoint: string,
    options: RequestInit = {}
) => {
    const url = `${BASE_URL}${endpoint}`;
    const headers = {
        'Content-Type': 'application/json',
        ...(options.headers || {})
    };

    const response = await fetch(url, { ...options, headers });
    const data = await response.json();

    if(!response.ok) {
        throw new Error(data?.error || 'API request failed');
    }

    return data;
}