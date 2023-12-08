import { useReducer } from 'react';
import './App.css';
import {DigitButton} from "./DigitButton";
import {OperationButton} from "./OperationButton"

export const ACTIONS = {
  ADD_DIGIT:'add-digit',
  CHOOSE_OPERATION:'choose-operation',
  CLEAR:'clear',
  DELETE_DIGIT:'delete-digit',
  EVALUATE:'evaluate'
}

function reducer(state,{type,payload}){
  console.log(state.currentOperand);
  switch(type){
    case ACTIONS.ADD_DIGIT:
      if(state.overwrite==true){
        return{
          ...state,
          previousOperand:null,
          operation:null,
          currentOperand:`${payload.digit}`,
          overwrite:false,
         
        }
      }
      if (payload.digit=="0" &&state.currentOperand=="0" ) return state;
      if (payload.digit=="." && state.currentOperand==null ){
        return {
              currentOperand:`${"0"}${payload.digit}`,
          }
      }
      if (payload.digit=="." && state.currentOperand.includes(".") ) return state;

      return{
        ...state,
         currentOperand:`${state.currentOperand ||"" }${payload.digit}`,
      }

    case ACTIONS.CHOOSE_OPERATION:
      if(state.currentOperand==null && state.previousOperand==null) return state;
      console.log(state.previousOperand,payload.operation);

      if(state.previousOperand==null){
        console.log("hii")
        return{
          ...state,
          operation:`${payload.operation}`,
          previousOperand:`${state.currentOperand||""}`,
         
          currentOperand:null,
        }
        
      }

      if(state.currentOperand==null){
        return{
          ...state,
        operation:`${payload.operation}`,
        }
      }
      
    // return{
    //   ...state,
    //   previousOperand:`${state.currentOperand ||""}${payload.operation}`,
    //   currentOperand:null,
    // }

    return{
        ...state,
        operation:payload.operation,
        previousOperand:`${evaluate(state)}`,
        currentOperand:null,
      }

    case ACTIONS.CLEAR:
      return{}

    case ACTIONS.EVALUATE:
      return{
        ...state,
        overwrite:true,
        currentOperand:evaluate(state),
        previousOperand:null,
        operation:null,
      }

    case ACTIONS.DELETE_DIGIT:
      return{
        ...state,
        currentOperand:state.currentOperand.slice(0,-1),
      }  
    default:
      
  }
}

function evaluate({currentOperand,previousOperand,operation}){
  const prev=parseFloat(previousOperand);
  const current=parseFloat(currentOperand);
  let computation = ""

  // if(NaN(prev)|| NaN(current)) return "";
  
  switch(operation){
    case '+':
      computation=prev+current;
      break;
    
    case '-':
      computation=prev-current;
      break;
    case '*':
      computation=prev*current;
      break;
    case '/':
      computation=prev/current;
      break;
    default:
      computation=""  
    
  }
console.log(computation,previousOperand,current);
  return computation.toString();


}

function App() {
const [{currentOperand,previousOperand,operation},dispatch]= useReducer(reducer,{})




// dispatch({type:ACTIONS.ADD_DIGIT,payload:{digit:1}})
  return (
    <div className="Calculator-grid">
        <div className="output">
          <div className="previous-operand">{previousOperand}{operation} </div>
          <div className="current-operand">{currentOperand} </div>
        </div>
      <div className="buttons">
        <button className="span-two spl" onClick={()=>dispatch({type:ACTIONS.CLEAR})}>AC</button>
        <button className="spl " onClick={()=>dispatch({type:ACTIONS.DELETE_DIGIT})}>DEL</button>
       <OperationButton operation="/"  dispatch={dispatch}/>
        <DigitButton digit="1" dispatch={dispatch}/>
        <DigitButton digit="2" dispatch={dispatch}/>
        <DigitButton digit="3" dispatch={dispatch}/>
        {/* <button className="num">1</button> */}
        <OperationButton operation="*"  dispatch={dispatch}/>
        <DigitButton digit="4" dispatch={dispatch}/>
        <DigitButton digit="5" dispatch={dispatch}/>
        <DigitButton digit="6" dispatch={dispatch}/>
        <OperationButton operation="+"  dispatch={dispatch}/>
        <DigitButton digit="7" dispatch={dispatch}/>
        <DigitButton digit="8" dispatch={dispatch}/>
        <DigitButton digit="9" dispatch={dispatch}/>
        <OperationButton operation="-"  dispatch={dispatch}/>
        <DigitButton digit="." dispatch={dispatch}/>
        <DigitButton digit="0" dispatch={dispatch}/>
        <button className="span-two op" onClick={()=>dispatch({type:ACTIONS.EVALUATE})}>=</button> 
      </div>
       

    </div>
  );
}


export default App;
