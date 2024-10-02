"use client";
import next from "next";
import styles from "./page.module.css";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

const API_ROOT = "https://app-node.talkcmo.com:3019";
const webPath = 'https://talkcmo.com';

export default function Home() {
  const [data, setData] = useState([]);
  const[nextData,setNext] = useState(null)

  useEffect(() => {
    fetchData();
    dummyData()
  }, []);


 
  const dummyData = async () => {
    try {
      const response = await axios.get('https://backend-c3o6.vercel.app/', { timeout: 10000 }); // Timeout set to 10 seconds
      console.log("Data fetched successfully:", response.data);
      setNext(response.data);
    } catch (err) {
      console.error("Error occurred while fetching data:", err.message);
  
      if (err.response) {
        console.error("Server responded with status:", err.response.status);
      } else if (err.request) {
        console.error("No response received:", err.request);
      } else {
        console.error("Error:", err.message);
      }
    }
  };
  
  

  useEffect(()=>{
    dummyData()
  },[nextData])

  const fetchData = async () => {
    try {
      const response = await fetch(`${API_ROOT}/api/post/homelatest`);
      const data = await response.json();
      setData(data);
      // console.log("datanew", data);
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };
  console.log("next",nextData)

  return (
    <div className="container container-max mt-3 main-page" style={{ overflow: "hidden" }}>
 
      <div className="row">
        <div className="col-12">
   
          <h1 className="fw-bold borderB py-1 h5">Latest Data</h1>
          <h1>{nextData}</h1>
        </div>

        <ul>
          {data?.map((x, i) => (
            <li key={i}>
              <Link href="/krishna">

                <img
                  src={`${webPath}${x?.banner_img}`}
                  alt={x.post_name}
                  style={{
                    width: '30%',
                    borderRadius: '8px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    objectFit: 'cover',
                  }}
                />
                <h2>{x.post_title}</h2>
                <p>{x.post_content}</p>
                <p>{x.post_author} {x.post_date}</p>

              </Link>

            </li>
          ))}
        </ul>
      </div>
    </div >
  );
}
