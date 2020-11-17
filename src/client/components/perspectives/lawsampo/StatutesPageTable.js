import React from 'react'
import PropTypes from 'prop-types'
import { has } from 'lodash'
import { withStyles } from '@material-ui/core/styles'
import { arrayToObject } from '../../../helpers/helpers'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import ResultTableCell from '../../facet_results/ResultTableCell'

const styles = theme => ({
  root: {
    overflow: 'auto',
    width: '100%',
    height: 'auto',
    display: 'flex',
    justifyContent: 'center'
  },
  content: {
    padding: theme.spacing(1),
    minWidth: 800,
    maxWidth: 1200
  },
  labelCell: {
    width: 240
  }
})

class StatutesPageTable extends React.Component {
  render = () => {
    const { classes, data } = this.props
    let referencedTerm = null
    if (has(data, 'referencedTerm') && Array.isArray(data.referencedTerm)) {
      referencedTerm = arrayToObject({ array: data.referencedTerm, keyField: 'id' })
    }
    return (
      <Table className={classes.table}>
        <TableBody>
          <TableRow key='documentType'>
            <TableCell className={classes.labelCell}>Document type</TableCell>
            <ResultTableCell
              columnId='documentType'
              data={data.documentType}
              valueType='string'
              makeLink={false}
              externalLink={false}
              sortValues
              numberedList={false}
              minWidth={150}
              container='cell'
              expanded
            />
          </TableRow>
          <TableRow key='statuteYear'>
            <TableCell className={classes.labelCell}>Year</TableCell>
            <ResultTableCell
              columnId='statuteYear'
              data={data.statuteYear}
              valueType='string'
              makeLink={false}
              externalLink={false}
              sortValues
              numberedList={false}
              minWidth={150}
              container='cell'
              expanded
            />
          </TableRow>
          <TableRow key='eu'>
            <TableCell className={classes.labelCell}>EU Directive</TableCell>
            <ResultTableCell
              columnId='eu'
              data={data.eu}
              valueType='string'
              makeLink={false}
              externalLink={false}
              sortValues
              numberedList={false}
              minWidth={150}
              container='cell'
              expanded
            />
          </TableRow>
          <TableRow key='uri'>
            <TableCell className={classes.labelCell}>URI</TableCell>
            <ResultTableCell
              columnId='uri'
              data={data.uri}
              valueType='object'
              makeLink
              externalLink
              sortValues
              numberedList={false}
              minWidth={150}
              container='cell'
              expanded
            />
          </TableRow>
          {/* <TableRow key='statuteTextHTML'>
            <TableCell className={classes.labelCell}>Text</TableCell>
            <ResultTableCell
              columnId='statuteTextHTML'
              data={data.statuteTextHTML}
              valueType='string'
              renderAsHTML
              makeLink={false}
              externalLink={false}
              sortValues
              numberedList={false}
              minWidth={150}
              container='cell'
              expanded
            />
          </TableRow> */}
          <TableRow key='statuteTextHTMLAnnotated'>
            <TableCell className={classes.labelCell}>Annotated text</TableCell>
            <ResultTableCell
              columnId='statuteTextHTMLAnnotated'
              data={data.statuteTextHTMLAnnotated}
              valueType='string'
              renderAsHTML
              HTMLParserTask='addAnnotationTooltips'
              annotationData={referencedTerm}
              makeLink={false}
              externalLink={false}
              sortValues
              numberedList={false}
              minWidth={150}
              container='cell'
              expanded
            />
          </TableRow>
        </TableBody>
      </Table>
    )
  }
}

StatutesPageTable.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired
}

export default withStyles(styles)(StatutesPageTable)
