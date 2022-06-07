import React from 'react'

const useFecth = () => {
    const [data, setData] = React.useState(null);
    const [error, setError] = React.useState(null);
    const [loading, setLoading] = React.useState(null);

    const request = React.useCallback(async (url, options) => {
        let json;
        let response;

        try {
            setData(null);
            setError(null);
            setLoading(true);

            response = await fetch(url, options);
            json = await response.json();

            if(!response.ok) throw new Error(json.message);
        } catch (e) {
            json = null;
            const customMessage = (e.message || e.message.length) ? e.message : true;
            setError(customMessage);
        } finally {
            setLoading(false);
            setData(json);
            
            return {json, response}
        }
    }, []);

  return {data, error, loading, request}
}

export default useFecth;