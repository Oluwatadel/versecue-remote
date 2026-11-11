import React,{createContext,useContext} from 'react';
import {Text} from 'react-native';
export const Navigation=createContext({path:'/',navigate:(_path:string)=>{}});
export function usePathname(){return useContext(Navigation).path;}
export function Link({href,children,replace,...props}:any){const{navigate}=useContext(Navigation);return <Text {...props} onPress={()=>navigate(href)}>{children}</Text>;}
