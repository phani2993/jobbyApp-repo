import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import './index.css'

const apiStatusConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
  initial: 'INITIAL',
}

class JobProfile extends Component {
  state = {jobprofileslist: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getJobProfileData()
  }

  getJobProfileData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)

    //  console.log(response)

    if (response.ok === true) {
      const fetchedData = await response.json()
      const profileData = {
        name: fetchedData.profile_details.name,
        profileImageUrl: fetchedData.profile_details.profile_image_url,
        shortBio: fetchedData.profile_details.short_bio,
      }

      this.setState({
        jobprofileslist: profileData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderFailureView = () => (
    <div className="failure-view">
      <button
        type="button"
        className="profile-failure-button"
        onClick={this.getJobProfileData}
      >
        Retry
      </button>
    </div>
  )

  renderProfileSuccessView = () => {
    const {jobprofileslist} = this.state
    const {name, profileImageUrl, shortBio} = jobprofileslist
    return (
      <div className="jobprofile-success-container">
        <img src={profileImageUrl} className="profile-img" alt="profile" />
        <h1 className="profile-heading">{name}</h1>
        <p className="profile-bio">{shortBio}</p>
      </div>
    )
  }

  renderLoaderView = () => (
    <div className="profile-loader-container">
      <Loader type="ThreeDots" color="#ffffff" height="40" width="40" />
    </div>
  )

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProfileSuccessView()

      case apiStatusConstants.inProgress:
        return this.renderLoaderView()
      case apiStatusConstants.failure:
        return this.renderFailureView()

      default:
        return null
    }
  }
}

export default JobProfile
