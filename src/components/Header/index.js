import Cookies from 'js-cookie'
import {Link, withRouter} from 'react-router-dom'

import {AiFillHome} from 'react-icons/ai'
import {FiLogOut} from 'react-icons/fi'
import {BsBriefcaseFill} from 'react-icons/bs'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('./login')
  }

  return (
    <nav className="nav-container">
      <div className="nav-content-desktop">
        <Link to="/" className="link-item">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="header-logo"
          />
        </Link>
        <ul className="list">
          <li className="list-item">
            <Link to="/" className="link-item">
              <h1 className="home-text">Home</h1>
            </Link>
          </li>

          <li className="list-item">
            <Link to="/jobs" className="link-item">
              <h1 className="jobs-text">Jobs</h1>
            </Link>
          </li>
        </ul>

        <button
          type="button"
          className="logout-button-desktop"
          onClick={onClickLogout}
        >
          Logout
        </button>
      </div>

      <div className="nav-content-mobile">
        <Link to="/" className="link-item">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="header-logo"
          />
        </Link>
        <ul className="list">
          <li className="list-item">
            <Link to="/" className="link-item">
              <AiFillHome size="30" className="react-icon" />
            </Link>
          </li>

          <li className="list-item">
            <Link to="/jobs" className="link-item">
              <BsBriefcaseFill size="30" className="react-icon" />
            </Link>
          </li>

          <li className="list-item1">
            <button
              type="button"
              className="logout-button-mobile"
              onClick={onClickLogout}
            >
              <FiLogOut size="30" className="react-icon" />
            </button>
          </li>
        </ul>
      </div>
    </nav>
  )
}
export default withRouter(Header)
