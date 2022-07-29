import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, Fab, IconButton, TextField, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';  
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';  
import { listType } from '../../common/_variable';  
import moment from 'moment';
import CreateTodo from '../createtodo/CreateTodo';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTodoAsync, selectData } from '../../features/todo/todoSlice';

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
    const handleChange = (x)=>{

    } 
    const handleCreate =()=>{
        setOpen(true);
    }
    const columns = [ 
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
        //   editable: true,
          renderCell: (params)=>{
            const type = listType.find(e=>e.id*1 === params.value*1) 
            return <Chip label={type?.text} color={type?.color} variant="outlined" />
          }
        }, 

        {
            field: 'time',
            headerName: 'Time',
            width: 180,
            renderCell: (params)=>{
                return   <p>{moment(params.value).format('DD/MM/YYYY, h:mm:ss')}</p>
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
                          <DeleteIcon />
                      </IconButton>
                  </Tooltip>
          }, 
        },
    ]; 

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div style={{ background: '#fff',boxShadow: '0px 0px 10px #303030bb', borderRadius: '10px', height: '520px', width: '100%', maxWidth: '820px', margin: '0 auto'}}>
          <DataGrid
            rows={data||[]}
            columns={columns}
            pageSize={10}
            checkboxSelection 
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
      );
}