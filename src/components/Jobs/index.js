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
    activeEmployementTypeIdList: [],
    activeSalaryRangeId: 0,
  }

  componentDidMount() {
    this.getJobItemsData()
  }

  // changeSalaryRange = salary => {
  //   this.setState({activeSalaryRangeId: salary}, this.getJobItemsData) // In this salary = salaryRangeId
  // }

  changeSalary = salary => {
    this.setState({activeSalaryRangeId: salary}, this.getJobItemsData)
  }

  changeEmploymentItem = type => {
    //  this.setState(
    //    prevState => ({
    //     activeEmployementTypeIdList: [
    //      ...prevState.activeEmployementTypeIdList,
    //     type,
    //   ],
    //   }),
    //  this.getJobItemsData,
    //  )

    const {activeEmployementTypeIdList} = this.state
    const isActiveTypeInList = activeEmployementTypeIdList.includes(type)

    //  console.log(isActiveTypeInList)
    if (isActiveTypeInList === false) {
      this.setState(
        prevState => ({
          activeEmployementTypeIdList: [
            ...prevState.activeEmployementTypeIdList,
            type,
          ],
        }),
        this.getJobItemsData,
      )
    } else {
      const filteredData = activeEmployementTypeIdList.filter(
        eachItem => eachItem !== type,
      )
      //   console.log(filteredData)
      this.setState({activeEmployementTypeIdList: filteredData})
    }
  }

  onClickFailureButton = () => {
    this.getJobItemsData()
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

  renderJobItems = () => {
    const {jobItemsList} = this.state
    const renderJobItems = jobItemsList.length > 0

    return renderJobItems ? (
      <ul className="jobitems-list">
        {jobItemsList.map(eachJob => (
          <JobItemCard jobItemDetails={eachJob} key={eachJob.id} />
        ))}
      </ul>
    ) : (
      <div className="no-jobs-view">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          className="no-jobs-img"
          alt="no jobs"
        />
        <h1 className="no-jobs-heading">No Jobs Found</h1>
        <p className="no-jobs-description">
          We could not find any jobs. Try other filters.
        </p>
      </div>
    )
  }

  onEnterSearchInput = event => {
    if (event.key === 'Enter') {
      this.getJobItemsData()
    }
  }

  changeSearchInput = event => {
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
          onChange={this.changeSearchInput}
          onKeyDown={this.onEnterSearchInput}
          value={searchInput}
        />
        <button
          type="button"
          testid="searchButton"
          onClick={this.getJobItemsData}
          className="search-button-container-desktop"
        >
          <BsSearch size="20" className="react-icon" />
        </button>
      </>
    )
  }

  getJobItemsData = async () => {
    const {
      activeEmployementTypeIdList,
      activeSalaryRangeId,
      searchInput,
    } = this.state
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${activeEmployementTypeIdList.join()}&minimum_package=${activeSalaryRangeId}&search=${searchInput}`
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
    const {activeEmployementTypeIdList, searchInput} = this.state
    return (
      <>
        <Header />
        <div className="jobs-container">
          <div className="jobs-content">
            <div className="filter">
              <FilterGroup
                changeEmploymentItem={this.changeEmploymentItem}
                changeSalary={this.changeSalary}
                changeSearchInput={this.changeSearchInput}
                getJobItemsData={this.getJobItemsData}
                employmentTypesList={employmentTypesList}
                salaryRangesList={salaryRangesList}
                activeEmployementTypeIdList={activeEmployementTypeIdList}
                searchInput={searchInput}
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
