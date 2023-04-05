import loadingcircle from './img/loadingcircle.gif'

export default function LoadingPage() {
  return (
    <div className="loading">
      <img src={loadingcircle} alt="Loading"/>
      <p>Loading...</p>
    </div>
  )
}