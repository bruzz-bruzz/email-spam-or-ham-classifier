from fastapi import FastAPI
from pydantic import BaseModel
import joblib
model = joblib.load('spamHamClassifier.pkl')
app = FastAPI()
class TextReq(BaseModel):
    text:str
@app.post('/predict')
def predict(text:TextReq):
    prediction = model.predict([text.text])
    return {'prediction': str(prediction[0])}