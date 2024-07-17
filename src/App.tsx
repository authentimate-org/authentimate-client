import "./App.css";

import { useAuth } from "./hooks/useAuth";

import AppRouter from "./AppRouter";

function App() {
  const {  isInitializing} = useAuth(()=>{});



  if (isInitializing) {
    return <div>Loading</div>;
  }

  return (
    <AppRouter />
  );
}

export default App;
