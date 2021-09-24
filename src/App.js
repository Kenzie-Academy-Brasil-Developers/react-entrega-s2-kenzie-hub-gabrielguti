import Routes from "./routes";
import GlobalStyle from "./styles/styles";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
function App() {
  return (
    <div className="container">
      <GlobalStyle />
      <ToastContainer
        position="top-left"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        className = 'toast'
      />
      <Routes />
    </div>
  );
}

export default App;
