import { useState, useEffect } from "react";

export type ApiResponse = {
    data: any;
    loading: boolean;
    status: number;
    statusText: string;
    error: any;
};

export function useFetch(url: string, options?: object): ApiResponse {
    const [data, setData] = useState<any>();
    const [loading, setLoading] = useState<boolean>(true);
    const [status, setStatus] = useState<number>(0);
    const [statusText, setStatusText] = useState<string>("");
    const [error, setError] = useState<any>(null);
    
    async function loadData() {
        setLoading(true);
        try {
            const response = await fetch(url, options);
            const json = await response.json();
            setStatus(response.status);
            setStatusText(response.statusText);
            setData(json);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        console.log("useEffect");
        loadData();
    }, [url]);

    return { data, loading, status, statusText, error };
}