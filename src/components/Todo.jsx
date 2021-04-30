import React, { useState, useEffect } from 'react';
import image from '../one piece.jpeg';


  const toGetLs = () => {
    let list = localStorage.getItem('lists');
    
    if (list) {
      return JSON.parse(localStorage.getItem('lists'));
    }else {
      return [];
    }
  }
  

const Todo = () => {
  
  const [inputData, setInputdata] = useState("");
  const [items, setitems] = useState(toGetLs());
  const [toggleSubmit, setToggleSubmit] = useState(true);
  const [isEditItem, setIsEditItem] = useState(null);
  
  const addItems = () => {
     if (!inputData) {
       alert('Error ⚠️ Type something');
     } else if(inputData && !toggleSubmit) {
       setitems(
         items.map((elem) => {
           if (elem.id === isEditItem) {
             return{...elem, name:inputData}
           }
          return elem;
         })
         );
         
        setToggleSubmit(true);
        setInputdata('');
       setIsEditItem(null);
     }
     
     else {
       const allInputData = {id: new Date().getTime().toString(), name: inputData}
      setitems([...items, allInputData]);
      setInputdata('');
     }
  } 
  
  const deleteItems = (index) => {
    
    const updatedData = items.filter((elem) => {
      return index !== elem.id;
    });
    setitems(updatedData);
  }
  
  const editItems = (id) => {
    let newEditItem = items.find((elem) => {
      return elem.id === id
    });
    setToggleSubmit(false);
    setInputdata(newEditItem.name);
    setIsEditItem(id);
  }
  
  const removeAll = () => {
    setitems([]);
  }
  
  useEffect(() => {
    localStorage.setItem('lists', JSON.stringify(items))
  },[items]);
  
    return (
        <>
        <div className="main-div"> 
         <div className="child-div"> 
          <figure> 
          <img src={image} alt="todo_img"/>
          <figcaption> Add Your List Here </figcaption>
          </figure>
          <div className="addItems">
          <input type="text" placeHolder="Add Items here" value={inputData} onChange={(e) => setInputdata(e.target.value)}/>
          {
            
            toggleSubmit ? <i className="fa fa-plus add-btn" title="AddItems" onClick={addItems}></i> :
           <i className="fa fa-edit add-btn" title="EditItems" onClick={addItems}></i>
   
          }
          </div>
          
          <div className="showItems">
          
          {
             items.map((elem) => {
             return(
             <div className="eachItem" key={elem.id}> 
               <h3> {elem.name} </h3>
            <div className="todo-btn">
            <i className="far fa-edit add-btn" title="EditItems" onClick={() => {editItems(elem.id)}}></i>
              <i className="far fa-trash-alt add-btn" title="DeleteItems" onClick={() => {deleteItems(elem.id)}}></i>
            </div>
            </div>
            )
             })
          }
        </div>
          
          <div className="showItems">
             <button className="btn effect04" data-sm-link-text="Remove All" onClick={removeAll}> <span> Check List </span> </button>
          </div>
          
         </div>
        </div>
        </>
    )
}

export default Todo;