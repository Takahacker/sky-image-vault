# Backend for Sky Image Vault

This small Express backend provides endpoints used by the `Clientes` page:

- `POST /presigned-url` — returns a presigned S3 URL and stores metadata in DynamoDB
- `GET /images` — lists stored images (metadata from DynamoDB)
- `GET /images/:name` — returns the Base64 contents of the image stored in S3

Environment variables

- `AWS_REGION` (default `us-east-1`)
- `S3_BUCKET` (default `mahoraga-2`)
- `DDB_TABLE` (default `Images`)

Run locally

```bash
cd backend
npm install
AWS_REGION=us-east-1 S3_BUCKET=mahoraga-2 DDB_TABLE=Images node index.js
```

Docker

```bash
docker build -t sky-image-vault-backend .
docker run -e AWS_REGION=us-east-1 -e S3_BUCKET=mahoraga-2 -e DDB_TABLE=Images -p 3000:3000 sky-image-vault-backend
```

IAM policy example (attach to the EC2 instance role or IAM user used by the backend):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:GetObject",
        "s3:ListBucket",
        "s3:PutObjectAcl"
      ],
      "Resource": ["arn:aws:s3:::mahoraga-2", "arn:aws:s3:::mahoraga-2/*"]
    },
    {
      "Effect": "Allow",
      "Action": ["dynamodb:PutItem", "dynamodb:Scan", "dynamodb:GetItem"],
      "Resource": "arn:aws:dynamodb:us-east-1:*:table/Images"
    }
  ]
}
```

Deployment notes

- You can build the Docker image and push it to ECR, then run it on EC2 instances (or use ECS).
- For two instances behind a load balancer, use an Application Load Balancer (ALB) and target group with health checks.
