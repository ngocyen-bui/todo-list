import * as React from 'react';
import { DataGrid, useGridApiContext } from '@mui/x-data-grid';
import { Card, Chip, Dialog, DialogContent, DialogTitle, Fab, IconButton, Select, TextField, Tooltip, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';   
import AddIcon from '@mui/icons-material/Add';  
import { listType } from '../../common/_variable';  
import moment from 'moment';
import PropTypes from 'prop-types';
import CreateTodo from '../createtodo/CreateTodo';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTodoAsync, selectData } from '../../features/todo/todoSlice';
import { id } from 'date-fns/locale';
import Checkbox from '@mui/joy/Checkbox';
import Close from '@mui/icons-material/Close';
import { BookmarkAdd, CheckBox, CheckBoxOutlineBlankOutlined } from '@mui/icons-material';
import { Box } from '@mui/system';

export default function ListTodo(){  
    const [open, setOpen] = React.useState(false); 
    const data = useSelector(selectData); 
    const dispatch = useDispatch()

    const handleDelete = (x)=>{
        let arr = data;
        let result = arr.filter(e => e.id !== x.row.id) 
        try { 
            dispatch(deleteTodoAsync(result))
        } catch (error) {
            
        }
    } 
    const handleCreate =()=>{
        setOpen(true);
    }
    const renderSelectEditInputCell = (params) => {
      return <SelectEditInputCell {...params} />;
    };
    const renderCheckEditCell = (params) => {
      return <CheckedEditInputCell {...params}></CheckedEditInputCell>
    }
    const columns = [ 

        {
          field: 'isDone',
          headerName: 'isDone?',
          width: 100, 
          // editable: true, 
          renderCell: (params)=>{
            return <Checkbox   />;
          },
          // renderEditCell: renderCheckEditCell,
        }, 
        {
          field: 'content',
          headerName: 'Content',
          width: 300,
          editable: true,
        },
        {
          field: 'type',
          headerName: 'Type',
          width: 150, 
          editable: true, 
          renderCell: (params)=>{
            const type = listType.find(e=>e.id*1 === params.value*1) 
            return <Chip label={type?.text} color={type?.color} variant="outlined"/>
          },
          renderEditCell: renderSelectEditInputCell,
        },  
        {
            field: 'time',
            headerName: 'Time',
            width: 180,
            editable: true,
            type: 'dateTime',
            renderCell: (params)=>{
              return <p>{moment(params?.value).format('YYYY-MM-DD HH:mm A')}</p>
            }
        }, 
        {
          field: 'action',
          headerName: 'Action', 
          sortable: false,
          width: 130,
          renderCell: (params)=>{
              return <Tooltip title="Delete" onClick={()=>handleDelete(params)}>
                      <IconButton aria-label="delete">
                          <DeleteIcon style={{color: 'red'}} />
                      </IconButton>
                  </Tooltip>
          }, 
        },
    ]; 

    const handleClose = () => {
        setOpen(false);
    };

    return (
      <>
       {/* <Card variant="outlined" sx={{  maxWidth: '870px', margin: '0 auto', borderRadius: '8px' }}> 
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
            <Typography level="h2" fontSize="md" sx={{ alignItem: 'center', alignSelf: 'flex-start' }}>
              Yosemite National Park
            </Typography> 
          </Box> 
         </Card> */}
        <div style={{ background: '#fff', borderRadius: '10px', height: '520px', width: '100%', maxWidth: '870px', margin: '0 auto'}}>  
              <DataGrid
                rows={data||[]}
                columns={columns}
                pageSize={8}  
                rowsPerPageOptions={[8]}
                experimentalFeatures={{ newEditingApi: true }}
                // onCellEditStop={(params, event) => {
                //   console.log(params,event)
                //   if (params.reason === GridCellEditStopReasons.cellFocusOut) {
                //     event.defaultMuiPrevented = true;
                //   }
                // }} 
                // loading={loading}
              />
              <div style={{textAlign: 'right', marginTop: '20px'}}>
                  <Fab onClick={handleCreate}  color="primary" aria-label="add">
                      <AddIcon />
                  </Fab> 
              </div>  
         <div>
         <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                {"Create Todo..."}
                </DialogTitle>
                <DialogContent>
                    <CreateTodo onClose={handleClose}/>
                </DialogContent> 
            </Dialog>
         </div> 
        </div>
      </>
        
      );
}

function SelectEditInputCell(props) {
  const { id, value, field } = props;
  const apiRef = useGridApiContext();

  const handleChange = async (event) => {
    await apiRef.current.setEditCellValue({ id, field, value: event.target.value });
    apiRef.current.stopCellEditMode({ id, field });
  };

  return (
    <Select
      value={value}
      onChange={handleChange}
      size="small"
      sx={{ height: 1 }}
      native 
      fullWidth
    >
      {listType.map(e =>{
        return <option key={e.id} value={e.id}>{e.text}</option>
      })} 
    </Select>
  );
}

SelectEditInputCell.propTypes = {
  field: PropTypes.string.isRequired,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  value: PropTypes.any,
};


function CheckedEditInputCell(props) {
  const { id, value, field } = props; 
  const apiRef = useGridApiContext();

  const handleChange = async (event) => {
    await apiRef.current.setEditCellValue({ id, field, value: event.target.value });
    apiRef.current.stopCellEditMode({ id, field }); 
  };

  return (
    <div style={{textAlign: 'center'}}>
      <Checkbox uncheckedIcon={<Close />} onChange={handleChange} />
    </div>

    )
}

CheckedEditInputCell.propTypes = {
  field: PropTypes.string.isRequired,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  value: PropTypes.any,
};