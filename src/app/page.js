"use client";
import styles from "./page.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";

const API_ROOT = "https://app-node.talkcmo.com:3019";
const webPath = 'https://talkcmo.com';

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`${API_ROOT}/api/post/homelatest`);
      const data = await response.json();
      setData(data);
      console.log("datanew", data);
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };

  return (
    <div className="container container-max mt-3 main-page" style={{ overflow: "hidden" }}>
      <div className="row">
        <div className="col-12">
          <h1 className="fw-bold borderB py-1 h5">Updated Latest Data</h1>
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
