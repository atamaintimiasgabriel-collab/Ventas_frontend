import { createContext, useState } from 'react';
import type { ReactNode } from 'react';
// Mantiene una sesión de presentación en memoria; no es autenticación productiva.
// eslint-disable-next-line react-refresh/only-export-components
export const DemoSessionContext = createContext<{signedIn:boolean;login:()=>void;logout:()=>void}>({signedIn:false,login:()=>{},logout:()=>{}});
export function DemoSessionProvider({children}:{children:ReactNode}) { const [signedIn,setSignedIn]=useState(false); return <DemoSessionContext.Provider value={{signedIn,login:()=>setSignedIn(true),logout:()=>setSignedIn(false)}}>{children}</DemoSessionContext.Provider>; }
