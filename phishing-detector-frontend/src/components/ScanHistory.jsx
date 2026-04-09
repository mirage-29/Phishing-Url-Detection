import { useEffect, useState } from "react";
import axios from "axios";

function ScanHistory() {

    const [history, setHistory] = useState([]);

    useEffect(() => {

        axios.get("http://localhost:8080/api/url/history")
            .then(res => setHistory(res.data))
            .catch(err => console.error(err));

    }, []);

    return (

        <div className="mt-20 max-w-4xl mx-auto">

            <h2 className="text-2xl text-green-400 mb-4">
                Recent Scans
            </h2>

            <table className="w-full text-left border border-gray-700">

                <thead className="bg-gray-800">
                <tr>
                    <th className="p-3">URL</th>
                    <th>Status</th>
                    <th>Risk</th>
                    <th>Source</th>
                </tr>
                </thead>

                <tbody>

                {history.map((scan) => (

                    <tr key={scan.id} className="border-t border-gray-700">

                        <td className="p-3">{scan.url}</td>
                        <td className={
                            scan.status === "PHISHING"
                                ? "text-red-400"
                                : "text-green-400"
                        }>
                            {scan.status}
                        </td>

                        <td>{scan.riskScore}%</td>
                        <td>{scan.source}</td>

                    </tr>

                ))}

                </tbody>

            </table>

        </div>
    );
}

export default ScanHistory;