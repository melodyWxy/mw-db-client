import React from 'react';
import ReactDOM from 'react-dom';
import { useInitState, useDidMount, useWillMount, useWillUpdate, useDidUpdate, useWillUnmount } from 'melody-cors-utils';

function App(props){
    const [state, setState] = useInitState({
        a: 1,
        b: 2,
        c: 3
    })
      
    useDidMount(()=>{
        console.log('did-mount');
        setState({
            a: 1005
        })
    })

    useWillUnmount(()=>{
        console.log('un-mount');
    })

    useWillMount(()=>{
        console.log('willMount');
    })
    useWillUpdate(()=>{
        console.log('will-update');
    })
    useDidUpdate(()=>{
        console.log('did-update');
    })

    return (
        <div>
            <div >{state.a}</div>
            <div onClick={()=>setState({
                b: state.b+1
            })}>{state.b}   +</div>
            {state.b%2===0?<Child1 /> : <Child2 /> }
        </div>
    )
}

function Child1 (){
    useWillUnmount(()=>{
        console.log('un-mount');
    })
    return 'Child1';
}
function Child2(){
    return 'child2';
}

ReactDOM.render( 
(<App title='app-title---'>
   
</App>), root);
