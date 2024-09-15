import "./App.css";

import { useAuth } from "./hooks/useAuth";

import AppRouter from "./AppRouter";
import FullScreenLoader from "./components/ui/FullScreenLoader";

function App() {
  const {  isInitializing} = useAuth(()=>{});



  if (isInitializing) {
    return <FullScreenLoader/>;
  }

  return (
    <AppRouter />
  );
}

export default App;
