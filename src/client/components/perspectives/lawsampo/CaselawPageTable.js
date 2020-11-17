import React from 'react'
import PropTypes from 'prop-types'
import { has } from 'lodash'
import { arrayToObject } from '../../../helpers/helpers'
import { withStyles } from '@material-ui/core/styles'
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

class CaselawPageTable extends React.Component {
  mapDocuments = documents => {
    return documents.map(doc => {
      doc.prefLabel = doc.ecli.replace('ECLI:FI:', '')
      let caselawUrl = '/caselaw/page/' + doc.sf_link.replace('https://data.finlex.fi/ecli/', '')
      caselawUrl = caselawUrl.replace('.html', '')
      doc.dataProviderUrl = caselawUrl // Link to semantic finlex: doc.sf_link
      return doc
    })
  }

  render = () => {
    const { classes, data, externalData } = this.props
    let referencedTerm = null
    if (has(data, 'referencedTerm') && Array.isArray(data.referencedTerm)) {
      referencedTerm = arrayToObject({ array: data.referencedTerm, keyField: 'id' })
    }
    return (
      <Table className={classes.table}>
        <TableBody>
          <TableRow key='judge'>
            <TableCell className={classes.labelCell}>Judge</TableCell>
            <ResultTableCell
              columnId='judge'
              data={data.judge}
              valueType='object'
              makeLink={false}
              externalLink={false}
              sortValues
              numberedList={false}
              minWidth={150}
              container='cell'
              expanded
            />
          </TableRow>
          <TableRow key='court'>
            <TableCell className={classes.labelCell}>Court</TableCell>
            <ResultTableCell
              columnId='court'
              data={data.court}
              valueType='object'
              makeLink={false}
              externalLink={false}
              sortValues
              numberedList={false}
              minWidth={150}
              container='cell'
              expanded
            />
          </TableRow>
          <TableRow key='decisionDate'>
            <TableCell className={classes.labelCell}>Decision date</TableCell>
            <ResultTableCell
              columnId='decisionDate'
              data={data.decisionDate}
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
          <TableRow key='keyword'>
            <TableCell className={classes.labelCell}>Finlex keyword</TableCell>
            <ResultTableCell
              columnId='keyword'
              data={data.keyword}
              valueType='object'
              makeLink={false}
              externalLink
              sortValues
              numberedList={false}
              minWidth={150}
              container='cell'
              expanded
            />
          </TableRow>
          <TableRow key='ecli'>
            <TableCell className={classes.labelCell}>ECLI</TableCell>
            <ResultTableCell
              columnId='ecli'
              data={data.ecli}
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
          <TableRow key='referenceToCourtDecision'>
            <TableCell className={classes.labelCell}>Referenced court decisions</TableCell>
            <ResultTableCell
              columnId='referenceToCourtDecision'
              data={data.referenceToCourtDecision}
              valueType='object'
              makeLink
              externalLink={false}
              sortValues
              numberedList={false}
              minWidth={150}
              container='cell'
              expanded
            />
          </TableRow>
          <TableRow key='referencedStatute'>
            <TableCell className={classes.labelCell}>Referenced legislation</TableCell>
            <ResultTableCell
              columnId='referencedStatute'
              data={data.referencedStatute}
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
          {externalData !== null &&
            <TableRow key='related'>
              <TableCell className={classes.labelCell}>Similar court decisions</TableCell>
              <ResultTableCell
                columnId='related'
                data={this.mapDocuments(externalData)}
                valueType='object'
                makeLink
                externalLink={false}
                sortValues={false}
                numberedList={false}
                minWidth={150}
                container='cell'
                expanded
              />
            </TableRow>}
          <TableRow key='judgementTextHTML'>
            <TableCell className={classes.labelCell}>Text</TableCell>
            <ResultTableCell
              columnId='court'
              data={data.judgementTextHTML}
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
          </TableRow>
          <TableRow key='referencedTerm'>
            <TableCell className={classes.labelCell}>Annotation terms</TableCell>
            <ResultTableCell
              columnId='referencedTerm'
              data={data.referencedTerm}
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
          <TableRow key='judgementTextHTMLAnnotated'>
            <TableCell className={classes.labelCell}>Annotated text</TableCell>
            <ResultTableCell
              columnId='court'
              data={data.judgementTextHTMLAnnotated}
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

CaselawPageTable.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  externalData: PropTypes.array
}

export default withStyles(styles)(CaselawPageTable)
