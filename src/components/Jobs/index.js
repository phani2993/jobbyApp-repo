import {Component} from 'react'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import {BsSearch} from 'react-icons/bs'

import JobItemCard from '../JobItemCard'

import FilterGroup from '../FilterGroup'

import Header from '../Header'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {
    jobItemsList: [],
    apiStatus: apiStatusConstants.initial,
    searchInput: '',
    activeEmployementtypeId: [],
    activeSalaryRangeId: '',
  }

  componentDidMount() {
    this.getJobItemsData()
  }

  changeSalaryRange = activeSalaryRangeId => {
    this.setState({activeSalaryRangeId}, this.getJobItemsData)
  }

  changeEmployementItem = id => {
    this.setState(
      prevState => ({
        activeEmployementtypeId: [...prevState.activeEmployementtypeId, id],
      }),
      this.getJobItemsData,
    )
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
        We cannot seem to find the page ypu are looking for
      </p>
    </div>
  )

  renderLoaderView = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobItems = () => {
    const {jobItemsList} = this.state
    return (
      <ul className="jobitems-list">
        {jobItemsList.map(eachJob => (
          <JobItemCard jobItemDetails={eachJob} key={eachJob.id} />
        ))}
      </ul>
    )
  }

  onEnterSearchInput = event => {
    if (event.key === 'ENTER') {
      this.getJobItemsData()
    }
  }

  onChangeSeachInput = event => {
    this.setState({searchInput: event.target.value})
  }

  renderInputElement = () => {
    const {searchInput} = this.state
    return (
      <>
        <input
          placeholder="Search"
          type="search"
          className="input"
          onChange={this.onChangeSeachInput}
          onKeyDown={this.onEnterSearchInput}
          value={searchInput}
        />
        <button
          type="button"
          onClick={this.getJobItemsData}
          className="search-button-container-desktop"
        >
          <BsSearch size="20" className="react-icon" />
        </button>
      </>
    )
  }

  getJobItemsData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/jobs'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)

    //  console.log(response)

    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
      }))
      this.setState({
        jobItemsList: updatedData,
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
        return this.renderJobItems()
      case apiStatusConstants.failure:
        return this.renderFailureView()

      default:
        return null
    }
  }

  render() {
    const {activeEmployementtypeId, activeSalaryRangeId} = this.state
    return (
      <>
        <Header />
        <div className="jobs-container">
          <div className="jobs-content">
            <div className="filter">
              <FilterGroup
                changeEmployementItem={this.changeEmployementItem}
                changeSalaryRange={this.changeSalaryRange}
                onChangeSeachInput={this.onChangeSeachInput}
                onEnterSearchInput={this.onEnterSearchInput}
                getJobItemsData={this.getJobItemsData}
                employmentTypesList={employmentTypesList}
                salaryRangesList={salaryRangesList}
                activeEmployementtypeId={activeEmployementtypeId}
                activeSalaryRangeId={activeSalaryRangeId}
              />
            </div>
            <div className="input-jobItems-container">
              <div className="searchInput-container-desktop">
                {this.renderInputElement()}
              </div>
              <div className="jobItems-container">
                {this.renderCorrespondingView()}
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
