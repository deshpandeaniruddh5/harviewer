import React from "react"
export function TableHeader(){
    return(
        <div class="har-contents" style={{backgroundColor:'#ebebe0',border:'5px solid black',borderRight:'0px',fontFamily: 'Arial, Helvetica, sans-serif'}}>
		<div class='type' style={{textAlign:"center", height:'50px',borderRight:'5px solid black',paddingTop:'10px'}}>
    		REQUEST TYPE
  		</div>
  		<div class='url'style={{textAlign:"center" , height:'50px',borderRight:'5px solid black',paddingTop:'10px'}}>
    		URL
  		</div>
  		<div class='rtype' style={{textAlign:"center", height:'50px',borderRight:'5px solid black',paddingTop:'10px'}}>
    		RESPONSE TYPE
  		</div>
  		<div class='time' style={{textAlign:"center", height:'50px',borderRight:'5px solid black',paddingTop:'10px'}}>
    		LOAD TIME
  		</div>
  		<div style={{textAlign:"center", height:'50px',borderRight:'5px solid black',paddingTop:'10px'}}>
    		WATERFALL
  		</div>
	    </div>
    )
}