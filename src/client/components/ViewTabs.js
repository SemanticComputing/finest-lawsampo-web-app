import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import CalendarViewDayIcon from '@material-ui/icons/CalendarViewDay';
import AddLocationIcon from '@material-ui/icons/AddLocation';
import RedoIcon from '@material-ui/icons/Redo';
import PieChartIcon from '@material-ui/icons/PieChart';
import { Link } from 'react-router-dom';


const styles = {
  root: {
    width: 'calc(100% - 8px)',
    position: 'absolute',
    top: 64,
    //backgroundColor: 'rgb(238, 238, 238)',
  },
};

class ViewTabs extends React.Component {
  constructor(props) {
    super(props);
    let value = 0;
    switch (this.props.pathname) {
      case '/manuscripts/creation_places':
        value = 1;
        break;
      case '/manuscripts/migrations':
        value = 2;
        break;
      case '/manuscripts/statistics':
        value = 3;
        break;
      default:
        value = 0;
    }
    this.state = { value };
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;


    return (
      <Paper square className={classes.root}>
        <Tabs
          value={this.state.value}
          onChange={this.handleChange}
          fullWidth
          indicatorColor="secondary"
          textColor="secondary"
        >
          <Tab icon={<CalendarViewDayIcon />} label="table" component={Link} to="/manuscripts/table" />
          <Tab icon={<AddLocationIcon />} label="creation places" component={Link} to="/manuscripts/creation_places" />
          <Tab icon={<RedoIcon />} label="migrations" component={Link} to="/manuscripts/migrations" />
          <Tab icon={<PieChartIcon />} label="statistics" component={Link} to="/manuscripts/statistics"/>
        </Tabs>
      </Paper>
    );
  }
}

ViewTabs.propTypes = {
  classes: PropTypes.object.isRequired,
  pathname: PropTypes.string.isRequired
};

export default withStyles(styles)(ViewTabs);