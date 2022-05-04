import React, { useState, useEffect } from "react";
import { getUsers } from './GetUsers';
import 'bootstrap/dist/css/bootstrap.css';
 
function RenderUser() {

let usersArray = getUsers();
    
const [newUsersList,setUsersList] = useState(usersArray.map(obj=>({...obj,count:0})));
const [searchTerm, setSearchTerm] = useState("");
const [searchResults, setSearchResults] = useState<any>([]);
const [display, setDisplay] = useState("notdisplayed");

const handleChange = (event:any) => {
    setSearchTerm(event.target.value);
}

useEffect(() => {
    const result = newUsersList.filter((user: any) => {
        if(searchTerm)
            return (user.name.toLowerCase()).includes(searchTerm.toLowerCase())
        });
    setTimeout(() => 
        setSearchResults(result),300);
            clearTimeout()
}, [searchTerm,newUsersList]);
    
    
const handleDelete = (user: any) => {
        setUsersList(newUsersList.filter(elem => elem.id !== user.id))
}

const handleCount= (id:any) => {
    for(let user of newUsersList) {
        user.count++
            if(user.id===id) { 
                user.count--
            }
        setUsersList(newUsersList)
    }
}

const showButton = e => {
    e.preventDefault();
        setDisplay("displayed");
  };

  const hideButton = e => {
    e.preventDefault();
        setDisplay("notdisplayed");
  };

return (
    <div>
        <div>
            <header className="header">
                <h1>List of users:</h1>
                    <input type="search" placeholder="Search User.." value={searchTerm} onChange={handleChange}></input>
                     </header>
                {searchResults.map((user:any) =>
                    <div className="box" key={user.id} onMouseEnter={e => showButton(e)} onMouseLeave={e => hideButton(e)}>                  
                        <p style={{cursor: 'pointer'}} onClick={()=>handleCount(user.id)}>{user.name}</p>
                            <div><p className="dot">{user.count}</p></div>  
                                <div>
                            <button className={display} onClick={()=>handleDelete(user)}>X</button>
                        </div>
                    </div>
                )}
         </div>
    </div>
)}

export default RenderUser;