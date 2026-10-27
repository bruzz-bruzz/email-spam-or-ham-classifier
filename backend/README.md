# Backend

Node.js/Express server for spam prediction.

## Request Flow
```mermaid
graph TD
    Request --> RateLimitCheck{Rate Limit?}
    RateLimitCheck -->|Exceeded| Error[429 Too Many Requests]
    RateLimitCheck -->|Allowed| ValidationCheck{Valid Input?}
    ValidationCheck -->|Invalid| Error400[400 Bad Request]
    ValidationCheck -->|Valid| Process[Predict Spam]
    Process --> Response[200 OK + Prediction]
```

## Features
- Rate Limiting (`express-rate-limit`)
- Request Validation (`express-validator`)

## Setup
1. `cd backend`
2. `npm install`
3. `npm run dev`
