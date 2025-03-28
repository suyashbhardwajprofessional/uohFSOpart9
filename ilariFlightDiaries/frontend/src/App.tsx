import { useState, useEffect } from 'react'
import dairyService from './services/diaryServices'
import { Diary } from './types'

function App() {
  const [diaries, setDiaries] = useState<Diary[]>([])
  const [date, setDate] = useState<string>('')
  const [visibility, setVisibility] = useState<string>('')
  const [weather, setWeather] = useState<string>('')
  const [comment, setComment] = useState<string>('')
  const [notification, setNotification] = useState<string>('')

  const handleFormSubmission = (evt: React.SyntheticEvent) => {
    evt.preventDefault();
    dairyService.createDiary({
      date: date,
      weather: weather,
      visibility: visibility,
      comment: comment
    }).then(newDiary => {
      setDiaries(diaries => [...diaries, newDiary])
      setDate('');
      setVisibility('');
      setWeather('');
      setComment('');
    } )
    .catch(error=>{
      console.log(error.response.data)
      setNotification(error.response.data);
      setTimeout(()=> {
        setNotification('');
      }, 3000);
    })
  }

  useEffect(()=>{
    dairyService.getDiaries()
      .then(data => {
        setDiaries(data)
      });
  },[])

  return (<>
    <p style={{color:"red"}}>{notification}</p>
    <div>
      <h2>Add new entry</h2>
      <form onSubmit={handleFormSubmission}>
        <table>
          <thead></thead>
          <tbody>
            <tr>
              <td>date</td>
              <td><input name='date' type="text" value={date} onChange={(evt)=> setDate(evt.target.value)} /></td>
            </tr>
            <tr>
              <td>visibility</td>
              <td><input name='visibility' type="text" value={visibility} onChange={(evt)=> setVisibility(evt.target.value)} /></td>
            </tr>
            <tr>
              <td>weather</td>
              <td><input name='weather' type="text" value={weather} onChange={(evt)=> setWeather(evt.target.value)} /></td>
            </tr>
            <tr>
              <td>comment</td>
              <td><input name='comment' type="text" value={comment} onChange={(evt)=> setComment(evt.target.value)} /></td>
            </tr>
          </tbody>
        </table>
        <button type="submit">add</button>
      </form>
    </div>
    <hr />
    <h2>Diary Entries</h2>
    <table>
      <thead>
        <tr>
          <td>id</td>
          <td>date</td>
          <td>weather</td>
          <td>visibility</td>
        </tr>
      </thead>
      <tbody>
      {diaries.map((diary, index) => 
        <tr key={index}>
          <td>{diary.id}</td>
          <td>{diary.date}</td>
          <td>{diary.weather}</td>
          <td>{diary.visibility}</td>
        </tr>
      )}
      </tbody>
    </table>
  </>)
}

export default App
