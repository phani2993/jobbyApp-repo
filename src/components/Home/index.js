import {Redirect, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Header from '../Header'
import './index.css'

const Home = () => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }

  return (
    <>
      <Header />
      <div className="home-container">
        <div className="content-container">
          <h1 className="heading">Find The Job That Fits Your Life</h1>
          <p className="description">
            Millions of peopple are searching for jobs, salary
            information,company reviews. Find the job that fits your abilities
            and potential
          </p>
          <Link to="/jobs" className="link-item">
            <button className="button" type="button">
              Find Jobs
            </button>
          </Link>
        </div>
      </div>
    </>
  )
}
export default Home