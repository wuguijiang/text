// api/moments.js
import { neon } from '@neondatabase/serverless';

function getDb() {
  const databaseUrl = process.env.POSTGRES_URL;
  if (!databaseUrl) {
    throw new Error('缺少数据库配置 POSTGRES_URL');
  }
  return neon(databaseUrl);
}

export default async function handler(request, response) {
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (request.method === 'OPTIONS') {
    return response.status(200).end();
  }

  try {
    const sql = getDb();
    
    if (request.method === 'GET') {
      await sql`
        CREATE TABLE IF NOT EXISTS moments (
          id SERIAL PRIMARY KEY,
          text TEXT NOT NULL,
          images TEXT[] DEFAULT '{}',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `;

      const moments = await sql`
        SELECT * FROM moments 
        ORDER BY created_at DESC
      `;

      return response.status(200).json(moments);
    }

    if (request.method === 'POST') {
      let body;
      if (request.body && typeof request.body === 'object' && !Buffer.isBuffer(request.body)) {
        body = request.body;
      } else {
        const bodyText = await getRawBody(request);
        body = JSON.parse(bodyText);
      }

      const { text, images } = body;

      if (!text && (!images || images.length === 0)) {
        return response.status(400).json({ error: '内容不能为空' });
      }

      const result = await sql`
        INSERT INTO moments (text, images)
        VALUES (${text || ''}, ${images || []})
        RETURNING *
      `;

      return response.status(200).json(result[0]);
    }

    return response.status(405).json({ error: '不支持的请求方法' });
  } catch (error) {
    return response.status(500).json({ 
      error: '服务器错误', 
      details: error.message
    });
  }
}

async function getRawBody(request) {
  if (request.body instanceof Buffer) {
    return request.body.toString('utf-8');
  } else if (request.body && typeof request.body.text === 'function') {
    return await request.body.text();
  } else if (request.body && typeof request.body.arrayBuffer === 'function') {
    const arrayBuffer = await request.body.arrayBuffer();
    return Buffer.from(arrayBuffer).toString('utf-8');
  } else if (request.body && request.body[Symbol.asyncIterator]) {
    const chunks = [];
    for await (const chunk of request.body) {
      chunks.push(chunk);
    }
    return Buffer.concat(chunks).toString('utf-8');
  } else {
    throw new Error('无法读取请求体');
  }
}
