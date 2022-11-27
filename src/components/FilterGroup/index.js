import './index.css'
import {BsSearch} from 'react-icons/bs'
import JobProfile from '../JobProfile'

const FilterGroup = props => {
  const {
    onChangeSeachInput,
    onEnterSearchInput,
    getJobItemsData,
    changeEmployementItem,
    changeSalaryRange,
    activeEmployementtypeId,
    activeSalaryRangeId,
  } = props

  const renderSalaryRangesList = () => {
    const {salaryRangesList} = props

    return (
      <ul className="ul-list">
        {salaryRangesList.map(salaryRange => {
          const onChangeSalaryRange = () =>
            changeSalaryRange(salaryRange.salaryRangeId)

          return (
            <li
              className="list-item"
              key={salaryRange.salaryRangeId}
              onChange={onChangeSalaryRange}
            >
              <input
                type="radio"
                className="employement-type-input"
                id={salaryRange.salaryRangeId}
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
        {employmentTypesList.map(employementType => {
          const onChangeEmploymentType = () =>
            changeEmployementItem(employementType.employementTypeId)

          const employementClassName =
            activeEmployementtypeId === employementType.activeEmployementtypeId
              ? 'kk active'
              : 'kk'
          return (
            <li
              className="list-item"
              key={employementType.employementTypeId}
              onChange={onChangeEmploymentType}
            >
              <input
                type="checkbox"
                className="employement-type-input"
                id={employementType.employementTypeId}
                value={employementType.employementTypeId}
              />
              <label
                className="employementType-label"
                htmlFor={employementType.employementTypeId}
              >
                {employementType.label}
              </label>
            </li>
          )
        })}
      </ul>
    )
  }

  return (
    <div className="filter-group-container">
      <div className="searchInput-container-mobile">
        <input
          placeholder="Search"
          type="search"
          className="input"
          onChange={onChangeSeachInput}
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

      <div className="jobprofile-container">
        <JobProfile />
      </div>

      <hr className="line" />
      <div className="filters-container">
        <h1 className="employementType-list-heading">Type of Employment</h1>
        {renderEmployementTypesList()}
        <hr className="line" />
        {renderSalaryRangesList()}
        <h1 className="employementType-list-heading">Salary Range</h1>
      </div>
    </div>
  )
}

export default FilterGroup
