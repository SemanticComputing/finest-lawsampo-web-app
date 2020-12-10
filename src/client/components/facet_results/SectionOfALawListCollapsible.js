import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Collapse from '@material-ui/core/Collapse'
import ObjectListItem from './ObjectListItem'
import ObjectListItemSources from './ObjectListItemSources'
// import { has } from 'lodash'
import { Link } from 'react-router-dom'

const styles = () => ({
  valueList: {
    paddingLeft: 20,
    maxHeight: 200,
    overflow: 'auto'
  },
  valueListNoBullets: {
    listStyle: 'none',
    paddingLeft: 0
  },
  numberedList: {
    maxHeight: 200,
    overflow: 'auto'
  },
  dateContainer: {
    width: 180,
    display: 'inline-block'
  }
})

const SectionListCollapsible = props => {
  const {
    makeLink, externalLink, linkAsButton, showSource,
    sourceExternalLink, classes
  } = props
  const { data } = props

  const renderItem = ({ collapsed, itemData, isFirstValue = false }) => {
    return (
      <>
        <ObjectListItem
          data={itemData}
          makeLink={makeLink}
          externalLink={externalLink}
          linkAsButton={linkAsButton}
        />
        {collapsed && <span> ...</span>}
        {showSource && itemData.source &&
          <ObjectListItemSources
            data={itemData.source}
            externalLink={sourceExternalLink}
          />}
      </>
    )
  }

  const renderThreeLevelSectionListing = data => {
    if (!props.hasParts) { return '-' }
    let firstLevel = Array.isArray(data) ? data : [data]
    firstLevel = firstLevel.sort((a, b) => a.id - b.id)
    return (
      <ul className={classes.valueList}>
        {firstLevel.map((firstLevelItem, index) => {
          let secondLevel = Array.isArray(firstLevelItem.secondLevel) ? firstLevelItem.secondLevel : [firstLevelItem.secondLevel]
          secondLevel = secondLevel.sort((a, b) => a.id - b.id)
          return (
            <li key={index}>
              {`Osa ${firstLevelItem.id}`}
              <ul>
                {secondLevel.map((secondLevelItem, index) => {
                  let sections = Array.isArray(secondLevelItem.section) ? secondLevelItem.section : [secondLevelItem.section]
                  sections = sections.sort((a, b) => a.sectionNumberInt - b.sectionNumberInt || a.sectionNumber - b.sectionNumber)
                  return (
                    <li key={index}>
                      {`Luku ${secondLevelItem.id}`}
                      <ul>
                        {sections.map((section, index) =>
                          <li key={index}>
                            {section.sectionNumber}.
                            <Link to={section.dataProviderUrl}>
                              {section.prefLabel}
                            </Link>
                          </li>
                        )}
                      </ul>
                    </li>
                  )
                }
                )}
              </ul>
            </li>
          )
        })}
      </ul>
    )
  }

  const renderTwoLevelSectionListing = data => {
    if (!props.hasChapters) { return '-' }
    let firstLevel = Array.isArray(data) ? data : [data]
    firstLevel = firstLevel.sort((a, b) => a.id - b.id)
    return (
      <ul className={classes.valueList}>
        {firstLevel.map((firstLevelItem, index) => {
          if (firstLevelItem.section == null) {
            console.log(firstLevelItem)
          }
          let sections = Array.isArray(firstLevelItem.section) ? firstLevelItem.section : [firstLevelItem.section]
          sections = sections.sort((a, b) => a.sectionNumberInt - b.sectionNumberInt || a.sectionNumber - b.sectionNumber)
          return (
            <li key={index}>
              {`Luku ${firstLevelItem.id}`}
              <ul>
                {sections.map((section, index) =>
                  <li key={index}>
                    {section.sectionNumber}. <Link to={section.dataProviderUrl}>{section.prefLabel}</Link>
                  </li>
                )}
              </ul>
            </li>
          )
        })}
      </ul>
    )
  }

  if (data == null || data === '-') {
    return '-'
  } else if (Array.isArray(data)) {
    return (
      <>
        {!props.expanded && renderItem({ collapsed: true, itemData: data[0], isFirstValue: true })}
        <Collapse in={props.expanded} timeout='auto' unmountOnExit>
          {props.hasParts && renderThreeLevelSectionListing(data)}
          {!props.hasParts && props.hasChapters && renderTwoLevelSectionListing(data)}
        </Collapse>
      </>
    )
  } else {
    return renderItem({ collapsed: false, itemData: data, isFirstValue: true })
  }
}

SectionListCollapsible.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.string]),
  makeLink: PropTypes.bool.isRequired,
  externalLink: PropTypes.bool.isRequired,
  sortValues: PropTypes.bool.isRequired,
  numberedList: PropTypes.bool.isRequired,
  expanded: PropTypes.bool.isRequired,
  columnId: PropTypes.string.isRequired,
  linkAsButton: PropTypes.bool,
  showSource: PropTypes.bool
}

export default withStyles(styles)(SectionListCollapsible)
