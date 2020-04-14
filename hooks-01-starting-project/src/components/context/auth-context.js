import React, {useState} from 'react';

export const AuthContext = React.createContext({
  isLoggedIn: false,
  login: () => {}
})

const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const loginHandler = () => setIsLoggedIn(true)

  return (
    <AuthContext.Provider value={{
      isLoggedIn: isLoggedIn,
      login: loginHandler
    }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider;