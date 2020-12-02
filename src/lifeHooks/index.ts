import { useState, useCallback, useMemo, useEffect, useRef } from 'react';
// import ERROR_INFO from './ERROR_INFO.js';

type StateType = Record<any, any>;

export function useInitState(state: StateType){
   const [initState, setData ]= useState(state);
   const setState = useCallback((asignState)=>{
       return setData({
           ...initState,
           ...asignState
       })
   }, [initState]);
   return [initState, setState];
}

export function useWillMount(fn){
    return useMemo(()=>{
        return fn();
    }, []);
}


export function useDidMount(fn){
    useEffect(()=>{
        fn();
    }, []);
}

export function useWillUpdate(fn){
    const updateCountRef = useRef(0);
    if(updateCountRef.current){
        fn();
    }
    updateCountRef.current += 1;
}

export function useDidUpdate(fn){
    const updateCountRef = useRef(0);
    useEffect(()=>{
        if(updateCountRef.current > 1){
            fn();
        }
    })
    updateCountRef.current += 1;
}


export function useWillUnmount(fn){
    useEffect(()=>{
        return fn
    }, [])
}