import { useState, useEffect } from "react";

export default function _useFetch(url) {
    console.log("useFetch");
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log("useEffect");
        async function init() {
            try {
                const response = await fetch(url);
                if (response.ok) {
                    const json = await response.json();
                    setData(json);
                } else {
                    throw response;
                }
            } catch (e) {
                setError(e);
            } finally {
                setLoading(false);
            }
        }
        init();
    }, [url]);

    return { data, loading, error };
}