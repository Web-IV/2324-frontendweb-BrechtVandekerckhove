import React from "react";
import Maaltijd from "./components/Maaltijden/Maaltijd";

function App() {
  return (
    <Maaltijd
    id="1"
    type="Broodmaaltijd"
    soep="Tomatensoep"
    dessert="Chocoladepudding"
    typeSandwiches="Wit"
    hartigBeleg="Kaas"
    zoetBeleg="Choco"
    vetstof="Ja"
    leverdatum={new Date().toLocaleDateString()}
    />
  );
}
export default App;
