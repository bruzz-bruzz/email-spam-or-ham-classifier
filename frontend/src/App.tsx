import './App.css'
import {useState} from 'react'
import axios from 'axios'
import Github from './Github'

export default function App(){
  const [text,setText] = useState("")
  const [prediction,setPrediction] = useState("")
  async function getPrediction(){
    if(text.length === 0){
      return
    } else {
      try {
        const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/predict`,{
          text:text
        })
        const data = res.data
        setPrediction(data.data)
      }catch(e){
      }
    }
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 p-6 flex flex-col items-center justify-center'>
      <div className='w-full max-w-xl bg-white p-8 rounded-3xl shadow-xl'>
        <h1 className='text-3xl font-black text-slate-900 mb-6 text-center tracking-tight'>AI Powered Spam/Ham Classifier</h1>
        
        <div className='flex flex-col gap-4'>
          <textarea 
            value={text} 
            onChange={(e)=>setText(e.target.value)} 
            placeholder="Paste your email text here..."
            className='w-full h-40 p-4 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition duration-200 outline-none resize-none' 
          />
          
          <button 
            onClick={getPrediction} 
            className='w-full py-3 text-lg font-semibold text-white bg-indigo-600 rounded-2xl shadow-lg hover:bg-indigo-700 active:scale-[0.98] transition-all duration-200'
          >
            Detect Spam
          </button>
        </div>

        {prediction && (
          <div className='mt-8 p-6 bg-indigo-50 rounded-2xl text-center border-2 border-indigo-100'>
            <h2 className='text-sm font-bold text-indigo-400 uppercase tracking-widest mb-2'>Prediction</h2>
            <p className='text-2xl font-bold text-indigo-900'>{prediction}</p>
            <button 
              onClick={() => {setPrediction(""); setText("");}} 
              className='mt-4 text-indigo-600 font-medium hover:text-indigo-800'
            >
              Reset
            </button>
          </div>
        )}
      </div>
      <div className='mt-8'>
        <Github repo={"https://github.com/bruzz-bruzz/spamHamClassifier"} />
      </div>
    </div>
  )
}

