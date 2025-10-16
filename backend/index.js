const express = require('express');
const cors = require('cors');
const { S3Client, PutObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, PutCommand, ScanCommand, GetCommand } = require('@aws-sdk/lib-dynamodb');
const stream = require('stream');

const app = express();
app.use(cors());
app.use(express.json());

const REGION = process.env.AWS_REGION || 'us-east-1';
const BUCKET = process.env.S3_BUCKET || 'mahoraga-2';
const TABLE = process.env.DDB_TABLE || 'Images';

const s3 = new S3Client({ region: REGION });
const ddbClient = new DynamoDBClient({ region: REGION });
const ddb = DynamoDBDocumentClient.from(ddbClient);

app.get('/health', (req, res) => res.json({ ok: true }));

// create presigned URL for PUT
app.post('/presigned-url', async (req, res) => {
  const { fileName, fileType } = req.body;
  if (!fileName || !fileType) return res.status(400).json({ error: 'fileName and fileType required' });

  const key = `uploads/${Date.now()}-${fileName}`;
  try {
    const command = new PutObjectCommand({ Bucket: BUCKET, Key: key, ContentType: fileType });
    const url = await getSignedUrl(s3, command, { expiresIn: 3600 });

    // store metadata in DynamoDB (without base64)
    await ddb.send(new PutCommand({ TableName: TABLE, Item: { name: key, date: new Date().toISOString() } }));

    res.json({ url, key });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'failed to create presigned url' });
  }
});

// list images
app.get('/images', async (req, res) => {
  try {
    const result = await ddb.send(new ScanCommand({ TableName: TABLE }));
    const items = (result.Items || []).map(i => ({ name: i.name, date: i.date }));
    res.json({ images: items });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'failed to list images' });
  }
});

// get base64 for a given image key
app.get('/images/:name', async (req, res) => {
  const name = req.params.name;
  try {
    // fetch object from S3
    const get = new GetObjectCommand({ Bucket: BUCKET, Key: name });
    const resp = await s3.send(get);
    // stream to buffer
    const chunks = [];
    for await (const chunk of resp.Body) chunks.push(chunk);
    const buffer = Buffer.concat(chunks);
    const base64 = buffer.toString('base64');
    res.json({ base64 });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'failed to get base64' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
