import { useState } from "react";

import { SignupPage } from "./components/SignupPage";
import {HomePage} from "./components/HomePage";
import {SimulatorPage} from "./components/SimulatorPage";


const App = () => {
  const [currentPage, setCurrentPage] = useState("home");

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {currentPage === "home" && <HomePage onNavigate={setCurrentPage} />}
      {currentPage === "simulator" && (
        <SimulatorPage onNavigate={setCurrentPage} />
      )}
      {currentPage === "signup" && (
        <SignupPage onComplete={() => setCurrentPage("home")} />
      )}
    </div>
  );
  
};
<SignupPage />;

<HomePage />;

<SimulatorPage />;
export default App;