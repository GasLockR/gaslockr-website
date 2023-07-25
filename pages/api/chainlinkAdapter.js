// pages/api/chainlinkAdapter.js

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end()
  }

  try {
    const { productId, quantity, productName, productDescription } = req.body

    // 如果你想将数据发送到另一个服务，可以使用下面的代码
    /*
        const response = await fetch('YOUR_SERVICE_URL', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                productId, 
                quantity, 
                productName, 
                productDescription
            })
        });

        if (!response.ok) {
            throw new Error(`Server responded with ${response.status}`);
        }

        const data = await response.json();
        */

    // 返回预期的 Chainlink 响应格式
    res.json({
      jobId: req.body.id,
      data: {
        productId,
        quantity,
        productName,
        productDescription
      }
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
