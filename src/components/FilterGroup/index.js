import './index.css'
import {BsSearch} from 'react-icons/bs'
import JobProfile from '../JobProfile'

const FilterGroup = props => {
  const {changeEmploymentItem, activeEmployementTypeId} = props

  const onChangeSearchInput = event => {
    const {changeSearchInput} = props
    changeSearchInput(event)
  }
  const onEnterSearchInput = event => {
    const {getJobItemsData} = props
    if (event.key === 'Enter') {
      getJobItemsData()
    }
  }

  const renderSalaryRangesList = () => {
    const {salaryRangesList} = props

    return (
      <ul className="ul-list">
        {salaryRangesList.map(salaryRange => {
          const {changeSalary} = props

          const onClickSalary = () => {
            changeSalary(salaryRange.salaryRangeId)
          }

          return (
            <li
              className="list-item"
              key={salaryRange.salaryRangeId}
              onClick={onClickSalary}
            >
              <input
                type="radio"
                className="employement-type-input"
                id={salaryRange.salaryRangeId}
                name="salary"
                value={salaryRange.salaryRangeId}
              />
              <label
                className="employementType-label"
                htmlFor={salaryRange.salaryRangeId}
              >
                {salaryRange.label}
              </label>
            </li>
          )
        })}
      </ul>
    )
  }

  const renderEmployementTypesList = () => {
    const {employmentTypesList} = props

    return (
      <ul className="ul-list">
        {employmentTypesList.map(employmentType => {
          const onChangeEmploymentType = event =>
            changeEmploymentItem(event.target.value)

          return (
            <li
              className="list-item"
              key={employmentType.employmentTypeId}
              onChange={onChangeEmploymentType}
            >
              <input
                type="checkbox"
                className={activeEmployementTypeId}
                id={employmentType.employmentTypeId}
                value={employmentType.employmentTypeId}
              />
              <label
                className="employementType-label"
                htmlFor={employmentType.employmentTypeId}
              >
                {employmentType.label}
              </label>
            </li>
          )
        })}
      </ul>
    )
  }

  const renderSearchInputForMobile = () => {
    const {getJobItemsData, searchInput} = props

    return (
      <div className="searchInput-container-mobile">
        <input
          placeholder="Search"
          type="search"
          className="input"
          value={searchInput}
          onChange={onChangeSearchInput}
          onKeyDown={onEnterSearchInput}
        />
        <button
          type="button"
          onClick={getJobItemsData}
          className="search-button-container-mobile"
        >
          <BsSearch size="20" className="react-icon" />
        </button>
      </div>
    )
  }

  return (
    <div className="filter-group-container">
      {renderSearchInputForMobile()}

      <div className="jobprofile-container">
        <JobProfile />
      </div>

      <div className="filters-container">
        <hr className="line" />
        <h1 className="employementType-list-heading">Type of Employment</h1>
        {renderEmployementTypesList()}
        <hr className="line" />

        <h1 className="employementType-list-heading">Salary Range</h1>
        {renderSalaryRangesList()}
      </div>
    </div>
  )
}

export default FilterGroup
