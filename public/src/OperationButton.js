import { ACTIONS } from "./App"

export function OperationButton({dispatch,operation}){
    return <button className="op" onClick={ ()=>dispatch({type:ACTIONS.CHOOSE_OPERATION,payload:{operation}})}>{operation}</button>
}