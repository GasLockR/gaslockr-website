export default async function handler(request, response) => {
    try {
        const result = await fetch('https://api.exchangerate.host/convert?from=USD&to=EUR');
        const data = await result.json();

        if (data.success) {
            const rate = data.info.rate;
            console.log(`Latest exchange rate (USD to EUR): ${rate}`);
            response.status(200).json({ message: `Exchange rate (USD to EUR) is ${rate}` });
        } else {
            console.error('Error fetching exchange rate:', data);
            response.status(500).json({ error: 'Failed to fetch exchange rate' });
        }
    } catch (error) {
        console.error('Error fetching exchange rate:', error);
        response.status(500).json({ error: 'Failed to fetch exchange rate' });
    }
};