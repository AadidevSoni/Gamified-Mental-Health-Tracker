import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Home from './pages/Home';
import {Route,RouterProvider,createRoutesFromElements,createBrowserRouter} from 'react-router-dom';
import '../index.css';
import { Provider } from 'react-redux';
import store from './pages/redux/store.js'

//Private Route
import PrivateRoute from './components/PrivateRoute.jsx';

//Auth
import Login from './pages/auth/Login.jsx';
import Calendar from './pages/user/Calendar.jsx';
import MonthView from './pages/user/MonthView.jsx';
import Register from './pages/auth/Register.jsx';
import Trends from './pages/user/Trends.jsx'

import Profile from './pages/user/Profile.jsx';

import AdminRoute from './pages/admin/AdminRoute.jsx';
import UserList from './pages/admin/UserList.jsx';
import Leaderboard from './pages/user/Leaderboard.jsx';
import Test from './pages/user/Test.jsx';
import Activity from './pages/user/Activity.jsx';
import Yoga from './pages/videos/Yoga.jsx';
import Read from './pages/videos/Read.jsx';
import Exercise from './pages/videos/Exercise.jsx'
import Art from './pages/videos/Art.jsx'
import Meditation from './pages/videos/Meditation.jsx';
import Socializing from './pages/videos/Socializing.jsx';
import Game from './pages/user/Game.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>

      <Route path ='' element = {<PrivateRoute />}>
        <Route path='/profile' element={<Profile />}/>
        <Route path='/leaderboard' element={<Leaderboard />}/>
        <Route path='/tests' element={<Test />} />
        <Route path="/trends" element={<Trends />} />
        <Route path='/activity' element={<Activity />} />
        <Route path='/calendar' element={<Calendar />} />
        <Route path="/calendar/:month" element={<MonthView />} />
        <Route path="/game" element={<Game />} />
      </Route>

      <Route path='/activity/yoga' element={<Yoga />} />
      <Route path='/activity/reading' element={<Read />} />
      <Route path='/activity/exercise' element={<Exercise />} />
      <Route path='/activity/art' element={<Art />}/>
      <Route path='/activity/meditation' element={<Meditation />}/>
      <Route path='/activity/socializing' element={<Socializing />} />
      
      <Route index={true} path="/" element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />

      {/*Adminn Routes*/}
      <Route path='/admin' element={<AdminRoute />}>
        <Route path='userlist' element={<UserList/>}/>
      </Route>
      
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  //Makes your Redux store available to all nested components using useSelector, useDispatch, etc.
  <Provider store = {store}> 
    <RouterProvider router={router} />
  </Provider>
);