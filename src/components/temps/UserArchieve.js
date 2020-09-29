import React, {useEffect} from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import { withStyles, makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import LinearProgress from '@material-ui/core/LinearProgress';
import blue from '@material-ui/core/colors/blue';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Slide from '@material-ui/core/Slide';

import TestDetails from './TestDetails/TestDetails.js'
import EmptyList from './EmptyList'
import { languages } from "../../utils/constants";

const theme = createMuiTheme({
  palette: {
    primary: { main: blue[500] },
    secondary: { main: "#f44336" },
  },
  status: {
    danger: 'orange',
  },
});

const ColorLinearProgress = withStyles({
  colorPrimary: {
    backgroundColor: '#b2dfdb',
  },
  barColorPrimary: {
    backgroundColor: '#0066FF',
  },
})(LinearProgress);

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#fafafa",
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.common.gray,
    },
  },
}))(TableRow);

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

function createData(resId, orderNum, category, totalQuestions, passedDate, score, passed) {
  return { resId, orderNum, category, totalQuestions, passedDate, score, passed };
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});




function EnhancedTableHead(props) {
  const {data,classes, onSelectAllClick, order, orderBy, rowCount, onRequestSort } = props;
  const headCells = [
    { id: 'resId', numeric: true, disablePadding: false, label: '№' },
    { id: 'category', numeric: false, disablePadding: true, label: data.User.Test.CategoryName },
    { id: 'totalQuestions', numeric: true, disablePadding: true, label: data.User.Test.QuestionsAmount },
    { id: 'passedDate', numeric: true, disablePadding: true, label: data.User.UserArchieve.FinishTime },
    { id: 'score', numeric: true, disablePadding: true, label: data.User.Test.Score },
    { id: 'passed', numeric: false, disablePadding: true, label: data.User.Test.Passed },
  ];
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <StyledTableRow>
        {headCells.map((headCell) => (
          <StyledTableCell
            key={headCell.id}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </StyledTableCell>
        ))}
      </StyledTableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    padding: theme.spacing(2),
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  divider: {
    width: '100%'
  },
  alignRight: {
    textAlign: 'right'
  },
  appBar: {
    position: 'sticky'
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  list: {
    width: '100%',
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingTop: 0,
    marginTop: 0
  },
}));

function UserArchieve(props) {
  const classes = useStyles();
  const [resRows, setResRows] = React.useState([])
  const [order, setOrder] = React.useState('desc');
  const [orderBy, setOrderBy] = React.useState('passedDate');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [isLoading, setIsLoading] = React.useState(true)
  const [open, setOpen] = React.useState(false);
  const [resultDetails, setResultDetails] = React.useState({})
  const [questionCat, setQuestionCat] = React.useState("")
  const [seeTest, setSeeTest] = React.useState(false)
  const[detailedAnswers, setDetailedAnswers] = React.useState([])

    useEffect(()=>{
      axios({
        method: "GET",
        url: "http://172.16.1.188:8000/users/questionCategories/archive",
        headers : {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${sessionStorage.getItem("token")}`
        }
    }).then((response) => {
        if(response.status === 200 || response.status === 201) {
            setResRows(response.data.rows);
            setIsLoading(false)
        } else if(response.status === 400 || response.status === 401){
            setResRows([]);
            setIsLoading(false)
        } else{
            setResRows([]);
            setIsLoading(false)
        }
    }).catch(e => {
        console.log(e);
    });
    },[]);

 
  const rows = []
  resRows.map((row, i) => {
    rows.push(createData(row.id, i+1, row.questionCategory.category, row.total_questions, row.end_time, row.score, row.passed ? languages[props.language.key].User.Test.Passed : (row.attempted === "1" ? languages[props.language.key].User.Test.Failure : languages[props.language.key].User.Test.Refused)))
  })

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  function handleSelect(id){
    setOpen(true);
    const detailedResult = resRows.find(resRow => {
        return resRow.id === id
    })
    setResultDetails(detailedResult)
    

      axios({url:`http://172.16.1.188:8000/users/questionCategories/archive/details/${detailedResult.questionCategory.id}`,
              method: "GET",
              headers : {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${sessionStorage.getItem("token")}`
              }
          }).then(res => {
            setQuestionCat(detailedResult.questionCategory)
            setDetailedAnswers(res.data.rows)
            // console.log(sessionStorage.getItem("token"))
          }).catch(e => {
              console.log(e);
          });
    
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

	const handleSeeTest = () => {
      setSeeTest(true)
      setOpen(false)
	}

	const handleSeeTestClose = () => {
      setSeeTest(false)
	}

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
  <ThemeProvider theme={theme}>
  {isLoading ? <ColorLinearProgress /> :
  	(Array.isArray(rows) && rows.length !== 0) ? 
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            aria-label="enhanced table"
            stickyHeader={true}
          >
            <EnhancedTableHead
              classes={classes}
              order={order}
              data={languages[props.language.key]}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={index}
                      onClick={() => handleSelect(row.resId)}
                    >
                    <StyledTableCell component="th" id={labelId} scope="row">
                        {row.orderNum}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {row.category}
                      </StyledTableCell>
                      <StyledTableCell align="left">{row.totalQuestions}</StyledTableCell>
                      <StyledTableCell align="left">{row.passedDate}</StyledTableCell>
                      <StyledTableCell align="left">{row.score}</StyledTableCell>
                      <StyledTableCell align="left">{row.passed}</StyledTableCell>
                    </TableRow>
                  );
                })}
        <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} fullWidth={true}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          {languages[props.language.key].User.UserArchieve.Test_results}
        </DialogTitle>
        <DialogContent>
          <List className={classes.list}>
          <ListItem button>
            <ListItemText primary={languages[props.language.key].User.UserArchieve.Category} />
            <ListItemText className={classes.alignRight} primary={questionCat.category} />
          </ListItem>
          <Divider className={classes.divider} />
          <ListItem button>
            <ListItemText primary={languages[props.language.key].User.Test.QuestionsAmount} />
            <ListItemText className={classes.alignRight} primary={resultDetails.total_questions} />
          </ListItem>
          <Divider className={classes.divider} />
          <ListItem button>
            <ListItemText primary={languages[props.language.key].User.UserArchieve.StartTime} />
            <ListItemText className={classes.alignRight} primary={resultDetails.start_time} />
          </ListItem>
          <Divider className={classes.divider} />
          <ListItem button>
            <ListItemText primary={languages[props.language.key].User.UserArchieve.FinishTime} />
            <ListItemText className={classes.alignRight} primary={resultDetails.end_time} />
          </ListItem>
          <Divider className={classes.divider} />
          <ListItem button>
            <ListItemText primary={languages[props.language.key].User.Test.CorrectAnswersAmount} />
            <ListItemText className={classes.alignRight} primary={resultDetails.correct_answers} />
          </ListItem>
          <Divider className={classes.divider} />
          <ListItem button>
            <ListItemText primary={languages[props.language.key].User.Test.InCorrectAnswersAmount} />
            <ListItemText className={classes.alignRight} primary={resultDetails.wrong_answers} />
          </ListItem>
          <Divider className={classes.divider} />
          <ListItem button>
            <ListItemText primary={languages[props.language.key].User.Test.Score} />
            <ListItemText className={classes.alignRight} primary={parseInt(resultDetails.score).toFixed(2)} />
          </ListItem>
          <Divider className={classes.divider} />
          <ListItem button>
            <ListItemText primary={languages[props.language.key].User.Test.Status} />
            <ListItemText className={classes.alignRight} primary={resultDetails.score <= 69 ? languages[props.language.key].User.Test.UnsatisfactoryStatus : (resultDetails.score <= 80 ? languages[props.language.key].User.Test.SatisfactoryStatus : (resultDetails.score <= 99 ? languages[props.language.key].User.Test.Good : languages[props.language.key].User.Test.ExcellentStatus) ) } />
          </ListItem>
        </List>
        </DialogContent>
        <DialogActions>
        {
        resultDetails.attempted !== "0" && detailedAnswers.length !== 0 ?
          <Button autoFocus onClick={handleSeeTest} color="primary">
            {languages[props.language.key].User.UserArchieve.View_Details}
          </Button>
          :
          <div />
      }
        </DialogActions>
      </Dialog>
      {seeTest ?
                <Dialog fullScreen open={seeTest} onClose={handleSeeTestClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar} color="primary">
          <Toolbar>

            <Typography variant="h6" className={classes.title}>
              {languages[props.language.key].Admin.QuestionCategory.Category}: {questionCat.category}
            </Typography>
            <Typography variant="h6">
             {languages[props.language.key].User.Test.CorrectAnswersAmount}: {resultDetails.correct_answers} / {resultDetails.total_questions}
            </Typography>
          </Toolbar>
        </AppBar>
        <TestDetails categoryId={questionCat.id}/>
        <DialogActions>
        <div className="container float-right">
          <Button variant="contained" onClick={handleSeeTestClose} className={classes.marginRight} color="primary">
            {languages[props.language.key].User.UserArchieve.Close}
          </Button>
          </div>
        </DialogActions>
      </Dialog>
      :
      <div />
  }
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          backIconButtonText={languages[props.language.key].User.UserArchieve.Previous}
          nextIconButtonText={languages[props.language.key].User.UserArchieve.Next}
          labelRowsPerPage={languages[props.language.key].User.UserTests.LinesAmount}
          labelDisplayedRows={
            ({ from, to, count }) => {
              return '' + from + '-' + to + '/' + count
            }
          }
        />
      </Paper>
    </div>
    :
    <EmptyList emptyText={languages[props.language.key].User.UserArchieve.NoArchieveYet} />
}
    </ ThemeProvider>
  );
}

const mapStateToProps = ({ language }) => ({ language });
export default connect(mapStateToProps)(withRouter(UserArchieve));