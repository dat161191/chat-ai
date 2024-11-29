/* eslint-disable @typescript-eslint/no-explicit-any */
import { Outlet } from "react-router-dom";
import SideBar from "./components/SideBar";
import Background from "../src/assets/background.jpg";

function App() {
  return (
    <>
      <div
        className=" bg-cover bg-center h-screen flex"
        style={{
          backgroundImage: `url(${Background})`,
        }}
      >
        <div className="xl:block hidden">
          <SideBar />
        </div>
        <Outlet />
      </div>
    </>
  );
}

export default App;
