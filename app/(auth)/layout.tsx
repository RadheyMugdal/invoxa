import React from 'react'

const AuthLayout = ({children}:{children:React.ReactNode}) => {
  return (
    <div className='relative w'>
          <h1 className="font-semibold flex items-center absolute top-2 left-2  tracking-tight font-mono gap-1 text-2xl ml-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" d="M4 3a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v18a1 1 0 0 1-1.65.76l-1.033-.885a1 1 0 0 0-1.301 0l-1.032.884a1 1 0 0 1-1.302 0l-1.031-.884a1 1 0 0 0-1.302 0l-1.031.884a1 1 0 0 1-1.302 0l-1.032-.884a1 1 0 0 0-1.301 0l-1.032.884A1 1 0 0 1 4 21V3Zm5 3a1 1 0 0 0 0 2h6a1 1 0 1 0 0-2H9Zm0 4a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2H9Zm1 5a1 1 0 0 1 1-1h4a1 1 0 1 1 0 2h-4a1 1 0 0 1-1-1Z" clip-rule="evenodd"/></svg>
                  Invoxa</h1>
      {children}
    </div>
  )
}

export default AuthLayout
