import './App.css';
import Chat from './Chat';
import Sidebar from './Sidebar';
import {useSelector, useDispatch} from 'react-redux'
import { selectUser, login, logout } from './features/counter/userSlice';
import Login from './Login';
import React, {useEffect} from 'react'
import { auth } from './firebase';

function App() {

  const user = useSelector(selectUser)
  const dispatch = useDispatch()
  
  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      if(authUser){
        dispatch(login({
          uid: authUser.uid,
          photo: authUser.photoURL,
          email: authUser.email,
          displayName: authUser.displayName
        }))
      } else {
        dispatch(logout());
      }
    })
  }, [])

  return (
    <div className="app">
      {user ? <div className="app__body">
        <Sidebar />
        <Chat />
      </div> : <Login />}
    </div>
  );
}

export default App;
