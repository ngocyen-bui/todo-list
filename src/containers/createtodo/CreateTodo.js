import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { listType } from '../../common/_variable';
import { useDispatch } from 'react-redux';
import { createTodoAsync } from '../../features/todo/todoSlice';
import { v4 as uuidv4 } from 'uuid';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'; 

import moment from 'moment';

const validationSchema = yup.object({
    content: yup
      .string('Enter your content')
      .required('Content is required'), 
  });

  
const CreateTodo = (props) => {
 
    const [value, setValue] = React.useState(new Date());
    const dispatch = useDispatch();
    const onClose = props.onClose;
    const formik = useFormik({
        initialValues: {
          content: '',
          type: 3,
          time: moment().format('YYYY-MM-DD HH:mm:ss')
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            const data = {
                id: uuidv4(),
                ...values,
                time: moment(values.time).format('YYYY-MM-DD HH:mm:ss'),
                isDone: false
            }
            try{
                dispatch(createTodoAsync(data))
                onClose();
            }catch(err){
                console.log(err);
            }
        },
        onChange: (values) => {
            console.log(values);
        }
      }); 
    return (
        <div style={{padding: 10}}>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              id="content"
              name="content"
              label="Content"
              value={formik.values.content}
              onChange={formik.handleChange}
              error={formik.touched.content && Boolean(formik.errors.content)}
              helperText={formik.touched.content && formik.errors.content}
              style={{marginBottom: '10px'}}
            />

            <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                    <InputLabel id="type">Type</InputLabel>
                    <Select
                        labelId="type"
                        id="type" 
                        name="type"
                        label="Type"
                        value={formik.values.type}
                        onChange={formik.handleChange}
                        style={{marginBottom: '10px', width: '100%'}} 
                    >
                        {listType.map(e => {
                            return  <MenuItem key={e.id} value={e.id}>{e.text}</MenuItem>
                        })} 
                    </Select>
                </FormControl>
                </Box>
            
            <LocalizationProvider dateAdapter={AdapterDateFns} >
                <DateTimePicker
                    labelId="time"
                    id="time"
                    renderInput={(props) => <TextField {...props} style={{marginBottom: '10px', width: '100%'}} />}
                    label="Date"
                    name="time"
                    value={formik.values.time}
                    // helperText={formik.touched.date && formik.errors.date}               
                    onChange={(value) => {
                        formik.setFieldValue('time', Date.parse(value));
                    }}
                />
            </LocalizationProvider>
            <Button color="primary" variant="contained" fullWidth type="submit">
                    Create
            </Button>
          </form>
        </div>
      );
}

export default CreateTodo;