import React from  'react';
import {
  BrowserRouter , 
  Route, 
  Routes,  
} from "react-router-dom";
import './App.css';
import ListTodo from './containers/listtodo/ListTodo';  
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd'; 
import ListAltIcon from '@mui/icons-material/ListAlt';
import PageNotFound from './containers/notfound/PageNotFound';


export function App() { 
  const [value, setValue] = React.useState('0');
  const linkRoute = [
    {
      id: 0,
      key: '0',
      text: 'Danh sách Todo',
      icon:<ListAltIcon />,
      url: '/'
    }
  ]
    
  const handleChange = (event, newValue) => { 
    const currLink = linkRoute.find(e => e.id = newValue*1)
    
    if(currLink){
      // navigate(currLink.url)
    }
    setValue(newValue);
  };


  return (
    <BrowserRouter>
      <div>
        <Tabs style={{ marginBottom: '20px'}} value={value} onChange={handleChange} centered aria-label="icon label tabs example">
          {linkRoute.map(e => {
            return <Tab key={e.id} icon={e.icon} iconPosition="start" value={e.key} label={e.text}/>
          })} 
        </Tabs>

        <Routes> 
          <Route exact path="/" element={<ListTodo />}></Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
} 

export default App;
