import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getReports } from "../utils/storage";

import "./Home.module.css";

const Home = () => {
  const navigate = useNavigate();

  const [latestReports, setLatestReports] = useState([]);

  useEffect(() => {
    const reports = getReports();

    // Latest 4 reports
    setLatestReports(reports.slice(0, 4));
  }, []);

  return (
    <>
      

      <div className="page">
        <center>
          <h1>LOST AND FOUND MANAGEMENT SYSTEM</h1>

          <h4>
            "Every lost thing holds a story — let's bring those stories home again"
          </h4>

          <button className="btnmain" onClick={() => navigate("/found-item")}>
            Find Item
          </button>
           
           <button className="btnmain" onClick={() => navigate("/lost-item")}>
            Lost Item
          </button>




          <h2 style={{ marginTop: "40px" }}>Reports Summary</h2>

        <div className="blocks">
          <p>Total Lost Reports: </p>
          <p>Total Found Reports: </p>
        </div>

          
        </center>
      </div>
    </>
  );
};

export default Home;
