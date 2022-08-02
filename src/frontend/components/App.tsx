import { store } from 'frontend/redux/store';
import Router from 'frontend/routes';
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
// import AdminProtaction from './AdminProtaction';
import './App.css';
// import EventForAll from './EventForAll.js';
// import Events from './Events.js';
// import Login from './Login.js';
// import Profile from './Profile.js';
// import Protected from './Protected ';
// import Routes_Marketplace from './Routes_Marketplace.js';
// // import Home from './Home.js';
// import Signup from './Signup.js';
// import TicketCreate from './TicketCreate.js';

function App() {
  // const [userEmail, setuserEmail] = useState('');
  // const [chainId, serChainId] = useState('');
  // const [WalletAddress, setWalletAddress] = useState('');

  // const setLogintrue = () => {
  //   setLoggedin(true);
  // };

  // const setAdmin = () => {
  //   setisAdmin(true);
  // };

  // const setEmail = (email) => {
  //   setuserEmail(email);
  // };

  // const setmychainId = (chainId) => {
  //   serChainId(chainId);
  // };

  // const setmywalletaddress = (address) => {
  //   setWalletAddress(address);
  // };

  return (
    <ReduxProvider store={store}>
      <BrowserRouter>
        {/* <SnackbarProvider> */}
        <Router />
        {/* </SnackbarProvider> */}
      </BrowserRouter>
    </ReduxProvider>
  );
}

export default App;

// <Route path="/buytoken" element={<h1>Buy Ticket</h1>} />

// {/* if You Want to Make Any Page Password Protacted with Login Then Do Routing Like This */}
// <Route
//   path="/marketplace/*"
//   element={
//     <Routes_Marketplace logout={setLoginfalse} isAdmin={isadmin} islogin={loggedin} />
//   }
// />

// <Route
//   path="/ticketcreate"
//   element={
//     <Protected
//       cmp={TicketCreate}
//       pagename="ticketcreate"
//       logout={setLoginfalse}
//       isAdmin={isadmin}
//       islogin={loggedin}
//     />
//   }
// />

// {/* Admin Login Route */}
// <Route
//   path="/admin"
//   element={<AdminProtaction loggedin={loggedin} isAdmin={isadmin} />}
// />