// api/upload.js
import { put } from '@vercel/blob';

export default async function handler(request, response) {
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (request.method === 'OPTIONS') {
    return response.status(200).end();
  }

  if (request.method !== 'POST') {
    return response.status(405).json({ error: '只允许 POST 请求' });
  }

  try {
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      return response.status(500).json({ 
        error: '服务器配置错误：缺少存储令牌' 
      });
    }

    let body;
    if (typeof request.body === 'string') {
      body = JSON.parse(request.body);
    } else if (typeof request.body === 'object') {
      body = request.body;
    } else {
      const chunks = [];
      for await (const chunk of request) {
        chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
      }
      const bodyText = Buffer.concat(chunks).toString('utf-8');
      body = JSON.parse(bodyText);
    }

    const { filename, base64Data } = body;

    if (!filename || !base64Data) {
      return response.status(400).json({ error: '缺少文件名或文件数据' });
    }

    const base64String = base64Data.split(',')[1];
    const buffer = Buffer.from(base64String, 'base64');

    const blob = await put(filename, buffer, {
      access: 'public',
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    return response.status(200).json({ url: blob.url });
    
  } catch (error) {
    return response.status(500).json({ 
      error: '上传失败', 
      details: error.message 
    });
  }
}