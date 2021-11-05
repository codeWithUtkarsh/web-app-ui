import React, {useState, useEffect} from 'react'

const App = () => {

  const [response, setResponse] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [displayData, setDisplayData] = useState({url:''})
  const [details, setDetails] = useState('');

  
  const getUserGeolocationDetails = () => {
    fetch("/myip")
        .then(response => response.json())
        .then(data => {
          console.log(data)
          setDetails(data.url)
        });
  }

  useEffect(()=>{
    getUserGeolocationDetails()
  },[])

  const handleApiCall = async (e) => {
    const url = 'http://localhost:9999/'+e.target.name;
    // let url = 'http://'+details+':32470/'+e.target.name

    displayData.url=url
    let options = {}
      try {
          setLoading(true)
          const res = await fetch(url, options)
          const json = await res.json()
          setResponse(json)
          setError(null)
      } catch (err) {
          setLoading(false)
          setError(err)
          setResponse(null)
      }
      finally {
          setLoading(false)
      }
  }



  return (
    <>
      <header className="pv5 bg-yellow black-80">
        <h1 className="mt0 mb1 tc">Web App: Sample Distributed System</h1>
        <div className="tc ttc">sample microservice architecture</div>
        <div className="tc ttc"></div>
      </header>
      <div className="pt4 pb1 tc">
        Go save the world with JavaScript
        <br/> <br/> <br/>
        <button name="shoe/shoes" onClick={handleApiCall} style={{margin:'0px 10px'}}>Microservice A</button>
        <button name="offer/offers" onClick={handleApiCall} style={{margin:'0px 10px'}}>Microservice B</button>
        <button name="cart" onClick={handleApiCall} style={{margin:'0px 10px'}}>Microservice C</button>
        <button name="wishlist" onClick={handleApiCall} style={{margin:'0px 10px'}}>Microservice D</button>
        <br/> <br/> <br/>
        <div>
          {response&&<>
            <p>API hit through API Gateway to <span style={{color:'blue', fontSize:'18px'}}>{displayData.url}</span></p>
            <br/> <br/>
            <p>--Response--</p>
            <h3>{JSON.stringify(response)}</h3>
          </>}
        </div>
        <br/> <br/> <br/>
        <div>
          {error&&<>
            <p>API hit through API Gateway to  <span style={{color:'blue', fontSize:'18px'}}>{displayData.url}</span></p>
            <br/> <br/>
            <p>--Error--</p>
            {JSON.stringify(error)}
            <p>Probably one of the microservice is down</p>
          </>}
        </div>
      </div>
    </>
  )
}

export default App
