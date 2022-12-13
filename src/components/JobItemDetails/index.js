import {Component} from 'react'
import Cookies from 'js-cookie'
import {AiFillStar} from 'react-icons/ai'
import {BsBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import {FaExternalLinkAlt} from 'react-icons/fa'
import Loader from 'react-loader-spinner'

import SimilarJobItem from '../SimilarJobItem'

import SkillCard from '../SkillCard'

import './index.css'

const apiStatusConstants = {
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
  success: 'SUCCESS',
  initial: 'INITIAL',
}

class JobItemDetails extends Component {
  state = {
    jobDetailsData: [],
    similarJobsData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobData()
  }

  onClickFailureButton = () => {
    this.getJobData()
  }

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        className="failure-img"
        alt="failure view"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-description">
        We cannot seem to find the page you are looking for
      </p>
      <button
        onClick={this.onClickFailureButton}
        className="failure-button"
        type="button"
        testid="button"
      >
        Retry
      </button>
    </div>
  )

  renderLoaderView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobItemsSuccessView = () => {
    const {jobDetailsData, similarJobsData} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      lifeAtCompany,
      location,
      packagePerAnnum,
      rating,
      skills,
      title,
    } = jobDetailsData
    return (
      <>
        <div className="job-item-details-card">
          <div className="job-item-logo-title-rating-container">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="job-item-card-logo"
            />
            <div className="job-item-title-rating-container">
              <h1 className="job-item-title">{title} </h1>
              <div className="job-item-star-rating-container">
                <AiFillStar size="23" className="job-item-star-icon" />
                <p className="job-item-rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="job-item-loc-intern_package-container">
            <div className="job-item-loc-intern-container">
              <div className="job-item-location-container">
                <MdLocationOn className="job-item-react-icon" size="28" />
                <p className="job-item-icon-text">{location}</p>
              </div>
              <div className="job-item-intern-container">
                <BsBriefcaseFill className="job-item-react-icon" size="28" />
                <p className="job-item-icon-text">{employmentType}</p>
              </div>
            </div>
            <div className="job-item-package">
              <p className="job-item-icon-text">{packagePerAnnum}</p>
            </div>
          </div>
          <hr className="job-item-horizental-line" />
          <div className="desc-heading-visit-link-container">
            <h1 className="job-item-heading">Description</h1>
            <div className="visit-container">
              <a href={companyWebsiteUrl} className="visit-text">
                Visit
              </a>
              <FaExternalLinkAlt size="18" className="visit-react-icon" />
            </div>
          </div>
          <p className="job-item-description-text">{jobDescription}</p>

          <h1 className="job-item-heading">Skills</h1>
          <ul className="skills-list">
            {skills.map(eachSkill => (
              <SkillCard skillDetails={eachSkill} key={eachSkill.name} />
            ))}
          </ul>
          <div className="life-at-company-container">
            <h1 className="life-at-company-heading">Life at Company</h1>
            <div className="life-at-company-content-container">
              <p className="life-at-company-description">
                {lifeAtCompany.description}
              </p>
              <img
                src={lifeAtCompany.imageUrl}
                className="life-at-company-image"
                alt="life at company"
              />
            </div>
          </div>
        </div>
        <h1 className="similar-jobs-heading">Similar Jobs</h1>
        <ul className="similar-jobs-list">
          {similarJobsData.map(eachSimilarJob => (
            <SimilarJobItem
              jobDetails={eachSimilarJob}
              key={eachSimilarJob.id}
            />
          ))}
        </ul>
      </>
    )
  }

  getFormattedSimilarData = data => ({
    companyLogoUrl: data.company_logo_url,
    employmentType: data.employment_type,
    id: data.id,
    jobDescription: data.job_description,
    location: data.location,
    rating: data.rating,
    title: data.title,
  })

  getFormattedData = data => ({
    companyLogoUrl: data.company_logo_url,
    companyWebsiteUrl: data.company_website_url,
    employmentType: data.employment_type,
    id: data.id,
    jobDescription: data.job_description,
    lifeAtCompany: {
      description: data.life_at_company.description,
      imageUrl: data.life_at_company.image_url,
    },
    location: data.location,
    rating: data.rating,
    title: data.title,
    packagePerAnnum: data.package_per_annum,
    skills: data.skills.map(eachSkill => ({
      imageUrl: eachSkill.image_url,
      name: eachSkill.name,
    })),
  })

  getJobData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      // console.log(data)
      const updatedData = this.getFormattedData(data.job_details)
      // console.log(updatedData)
      const updatedSimilarJobsData = data.similar_jobs.map(eachSimilarJob =>
        this.getFormattedSimilarData(eachSimilarJob),
      )
      // console.log(updatedData)
      // console.log(updatedSimilarJobsData)
      this.setState({
        jobDetailsData: updatedData,
        similarJobsData: updatedSimilarJobsData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderCorrespondingView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoaderView()
      case apiStatusConstants.success:
        return this.renderJobItemsSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()

      default:
        return null
    }
  }

  render() {
    return <div className="bg-container">{this.renderCorrespondingView()}</div>
  }
}

export default JobItemDetails
