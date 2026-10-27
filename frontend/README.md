# Frontend

React application for spam detection UI.

## Workflow
```mermaid
graph TD
    User --> Input[Enter Email Text]
    Input --> Click[Click 'Detect Spam']
    Click --> Fetch[POST /predict]
    Fetch --> Result{Result Received?}
    Result -->|Success| Show[Display Prediction]
    Result -->|Error| Toast[Show Error Toast]
```

## Features
- Tailwind CSS styling
- Responsive design
- Toast notifications

## Setup
1. `cd frontend`
2. `npm install`
3. `npm run dev`
