import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
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
import axios from 'axios';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Slide from '@material-ui/core/Slide';

import history from '../../history';
import Test from './Test/Test.js';
import EmptyList from './EmptyList';
import { languages } from "../../utils/constants";
import { startTimer } from "../../store/actions/TimerAction";
import { startTest } from '../../store/actions/TestAction';
import { endTest } from '../../store/actions/TestAction';

const theme = createMuiTheme({
  palette: {
    primary: { main: blue[500] },
    secondary: { main: "#f44336" },
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

function createData(resId, orderNum, category, totalQuestions, time, deadlineStart) {
  return { resId, orderNum, category, totalQuestions, time, deadlineStart };
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
  const { data,classes, onSelectAllClick, order, orderBy, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  const headCells = [
    { id: 'resId', numeric: true, disablePadding: false, label: '№' },
    { id: 'category', numeric: false, disablePadding: true, label: data.User.Test.CategoryName },
    { id: 'totalQuestions', numeric: true, disablePadding: true, label: data.User.Test.QuestionsAmount },
    { id: 'time', numeric: true, disablePadding: true, label:  data.User.UserTests.Duration},
    { id:  'deadlineStart', numeric: true, disablePadding: true, label: data.User.UserTests.AssignDate },
  ];
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
  }
}));

var toHHMMSS = (secs) => {
    var sec_num = parseInt(secs, 10)
    var hours   = Math.floor(sec_num / 3600)
    var minutes = Math.floor(sec_num / 60) % 60
    var seconds = sec_num % 60

    return [hours,minutes,seconds]
        .map(v => v < 10 ? "0" + v : v)
        .filter((v,i) => v !== "00" || i > 0)
        .join(":")
}

const UserTests = (props) => {

  const {dispatch} = props
  const classes = useStyles();
  const [resRows, setResRows] = React.useState([])
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('orderNum');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [isLoading, setIsLoading] = React.useState(true)
  const [open, setOpen] = React.useState(false);
  const [openCancel, setOpenCancel] = React.useState(false);
  const [openStart, setOpenStart] = React.useState(false);
  const [testDetails, setTestDetails] = React.useState({})
  const [startTest, setStartTest] = React.useState(false)
  const [counter, setCounter] = React.useState();
  const [timeUp, setTimeUp] = React.useState(false)
  const [comment, setComment] = React.useState("")

    function getUserTests(){
        axios({
                method: "GET",
                url: "http://172.16.1.188:8000/users/questionCategories",
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
                setResRows([]);
                setIsLoading(false)
            });
    }

const cancelTest = (e) =>{
              e.preventDefault();
              const body = {
                questionCatId: testDetails.questionCatId,
                comment: comment
              };
                axios({
                    method: "POST",
                    url: "http://172.16.1.188:8000/questions/cancel",
                    headers : {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${sessionStorage.getItem("token")}`
                    },
                    data: body
                }).then((response)=>{
                    if(response.status === 200 || response.status === 201) {
                        setOpenCancel(false)
                        console.log("OK!");
                    }else if(response.status === 400 || response.status === 401){
                        console.log("NOT OK!");
                    }else{
                        console.log("ERROR!")
                    }
                }).catch(e =>{
                    console.log(e);
                });
      }
    
      useEffect(()=>{
        props.endTest(false)
        
        if(props.testState.end) {
          setCounter(0)
        }
      
      }, [props.testState.end]);
      
      useEffect(()=>{
        if(props.testState.end) {
          setCounter(0)
        }
      }, [props.testState.start]);

    useEffect(()=>{
      if(!props.testState.end) {
            counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
            
            // props.startTimer(counter);
            
            }
            if(counter === 1) {
              setTimeUp(true)
            }
    
            
    }, [counter]);
 
    useEffect(()=>{
            getUserTests();
    }, [timeUp, props.testState.end, props.testState.start]);

  const rows = []
  if(resRows){
    resRows.map((row, i) => {
      rows.push(createData(row.questionCatId, i+1, row.questionCat, row.questions, row.time, row.deadline_start))
    });
}

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };


  function handleSelect(id){
    setOpen(true);
    const testInfo = resRows.find(resRow => {
        return resRow.questionCatId === id
    })
    setTestDetails(testInfo)
  };

  const handleOpenCancel = () => {
    setOpen(false)
    setOpenCancel(true)
  }

const handleOpenStart = () => {
    setOpen(false)
    setOpenStart(true)
  }

const handleCloseStart = () => {
    setOpenStart(false)
  }

const handleStartTest = () => {
    setOpenStart(false)
    setStartTest(true)
    props.startTest(true)
    setCounter(testDetails.time * 60)
}

  const handleCloseCancel = () => {
    setOpenCancel(false)
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseTimeUp = () => {
    setTimeUp(false)
    history.push('/user/archive')
    getUserTests()
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
  <ThemeProvider theme={theme}>
  {isLoading ? <ColorLinearProgress /> :
    (Array.isArray(rows) && rows.length) ? 
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
                      <StyledTableCell align="left">{row.time}</StyledTableCell>
                      <StyledTableCell align="left">{row.deadlineStart}</StyledTableCell>
                    </TableRow>
                  );
                })}
        <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} fullWidth={true}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
            {languages[props.language.key].User.UserTests.Testing_Information}
                </DialogTitle>
                <DialogContent>
                  <List className={classes.list}>
                  <ListItem button>
                    <ListItemText primary={languages[props.language.key].User.Test.CategoryName} />
                    <ListItemText className={classes.alignRight} primary={testDetails.questionCat} />
                  </ListItem>
                  <Divider className={classes.divider} />
                  <ListItem button>
                    <ListItemText primary={languages[props.language.key].User.Test.QuestionsAmount} />
                    <ListItemText className={classes.alignRight} primary={testDetails.questions} />
                  </ListItem>
                  <Divider className={classes.divider} />
                  <ListItem button>
                    <ListItemText primary={languages[props.language.key].User.UserTests.Duration} />
                    <ListItemText className={classes.alignRight} primary={testDetails.time + " мин."} />
                  </ListItem>
                  <Divider className={classes.divider} />
                  <ListItem button>
                    <ListItemText primary={languages[props.language.key].User.UserTests.AssignDate} />
                    <ListItemText className={classes.alignRight} primary={testDetails.deadline_start} />
                  </ListItem>
                </List>
                </DialogContent>
                <DialogActions>
                <Button autoFocus onClick={handleOpenCancel} color="secondary">
                    {languages[props.language.key].User.UserTests.Refuse}
                  </Button>
                  
                  <Button autoFocus onClick={handleOpenStart} color="primary">
                    {languages[props.language.key].User.UserTests.Start_test}
                  </Button>

                </DialogActions>
      </Dialog>
      { openCancel ?
                  <Dialog onClose={handleCloseCancel} aria-labelledby="customized-dialog-title" open={openCancel} fullWidth={true}>
                <DialogTitle id="customized-dialog-title" onClose={handleCloseCancel}>
                  {languages[props.language.key].User.UserTests.Test_rejection}
                </DialogTitle>
                <DialogContent>
          <DialogContentText>
            {languages[props.language.key].User.UserTests.Refuse_Text}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label={languages[props.language.key].User.UserTests.ReasonRefuse}
            type="reason"
            fullWidth
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCancel} color="primary">
            {languages[props.language.key].User.UserTests.Cancel}
          </Button>
          <Button onClick={(e) => cancelTest(e)} color="secondary">
            {languages[props.language.key].User.UserTests.Refuse}
          </Button>
        </DialogActions>
              </Dialog>
                :
                <div />
                }
                { openStart ?
                  <Dialog onClose={handleCloseCancel} aria-labelledby="customized-dialog-title" open={openStart} fullWidth={true}>
                <DialogTitle id="customized-dialog-title" onClose={handleCloseStart}>
                  {languages[props.language.key].User.UserTests.Testing}
                </DialogTitle>
                <DialogContent>
          <DialogContentText>
           {languages[props.language.key].User.UserTests.Reallystarttesting}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseStart} color="secondary">
            {languages[props.language.key].User.UserTests.No}
          </Button>
          <Button onClick={handleStartTest} color="primary">
            {languages[props.language.key].User.UserTests.Yes}
          </Button>
        </DialogActions>
              </Dialog>
                :
                <div />
                }
                {props.testState.start ?
                <Dialog fullScreen open={startTest} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar} color={counter > 300 ? "primary" : "secondary"}>
          <Toolbar>

            <Typography variant="h6" className={classes.title}>
            {languages[props.language.key].Admin.QuestionCategory.Category}:{testDetails.questionCat}
            </Typography>
            <Typography variant="h6">
              {languages[props.language.key].User.UserTests.Left}: {toHHMMSS(counter)}
            </Typography>
          </Toolbar>
        </AppBar>
        <Test categoryName={testDetails.questionCat} categoryId={testDetails.questionCatId} counter={counter} />
      </Dialog>
      :
      <div />
     
  }
   { timeUp ?
    <Dialog onClose={handleCloseTimeUp} aria-labelledby="customized-dialog-title" open={timeUp} fullWidth={true}>
                      <DialogTitle id="customized-dialog-title" onClose={handleCloseTimeUp}>
                        {languages[props.language.key].User.UserTests.TimeIsUp}
                      </DialogTitle>
                      <DialogContent>
                <DialogContentText>
                  {languages[props.language.key].User.UserTests.AnswersSaved}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseTimeUp} color="primary">
                  ОК
                </Button>
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
          backIconButtonText={languages[props.language.key].User.UserTests.Previous}
          nextIconButtonText={languages[props.language.key].User.UserTests.Next}
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
    <EmptyList emptyText={languages[props.language.key].User.UserTests.NoTestsYet} />
}
    </ThemeProvider>
  );
}

const mapDispatchToProps = dispatch => ({
  startTimer: (counter) => {dispatch(startTimer(counter))},
  startTest: (val) => {dispatch(startTest(val))},
  endTest: (val) => {dispatch(endTest(val))}
})

const mapStateToProps = ({ isAdmin, timer, testState, router,language }) => ({ isAdmin, timer, testState, router,language });
export default connect(mapStateToProps, mapDispatchToProps)(UserTests);
