import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { fetchData } from "./features/har_slice_reducer"
import './App.css';
import {TableHeader} from "./features/table_header";
import TableBody from "./features/table_body"

function App() {
  const dispatch = useDispatch()
  const har = useSelector( ( state )=>state.har.harData )
  const harStatus = useSelector ( ( state ) => state.har.status )
  useEffect(()=>{
    if( harStatus ==='idle'){
      dispatch(fetchData())
    }
  },[harStatus,dispatch]);
  if(harStatus === "succeeded")
  {
    console.log(har)
    return(
      <React.Fragment>
        
      <TableHeader/>
      <TableBody har={har}/>
      </React.Fragment>
      
    )
  }
  console.log(harStatus)
  return (
    <p>{harStatus}</p>
  )
}

export default App;
