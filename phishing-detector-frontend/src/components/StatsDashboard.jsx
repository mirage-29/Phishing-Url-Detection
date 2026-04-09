import { useEffect, useState } from "react";
import axios from "axios";

function StatsDashboard(){

    const [stats,setStats] = useState(null);

    useEffect(()=>{

        axios.get("http://localhost:8080/api/url/stats")
            .then(res => setStats(res.data))
            .catch(err => console.error(err));

    },[])

    if(!stats) return null;

    return(

        <div className="mt-16 flex justify-center gap-10">

            <div className="bg-gray-900 p-6 rounded-lg text-center">
                <h3 className="text-gray-400">Total Scans</h3>
                <p className="text-2xl text-green-400">{stats.total}</p>
            </div>

            <div className="bg-gray-900 p-6 rounded-lg text-center">
                <h3 className="text-gray-400">Phishing</h3>
                <p className="text-2xl text-red-400">{stats.phishing}</p>
            </div>

            <div className="bg-gray-900 p-6 rounded-lg text-center">
                <h3 className="text-gray-400">Safe</h3>
                <p className="text-2xl text-green-400">{stats.safe}</p>
            </div>

        </div>

    )
}

export default StatsDashboard;