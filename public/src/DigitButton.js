import { ACTIONS } from "./App"

export  function DigitButton({dispatch,digit}){
    return     <button className="num" onClick={()=> dispatch({type:ACTIONS.ADD_DIGIT,payload:{digit}})}>{digit}</button>
}