import { useState } from "react";
import axios from "axios";

import Hero from "./components/Hero";
import UrlScanner from "./components/UrlScanner";
import ScanLoader from "./components/ScanLoader";
import ResultCard from "./components/ResultCard";
import CyberInfo from "./components/CyberInfo";
import Footer from "./components/Footer";
import ScanHistory from "./components/ScanHistory";
import StatsDashboard from "./components/StatsDashboard";

function App() {

    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const scanUrl = async (url) => {

        setLoading(true);

        try {

            const response = await axios.post(
                "http://localhost:8080/api/url/check",
                { url }
            );

            setResult(response.data);

        } catch (error) {
            console.error(error);
        }

        setLoading(false);
    };

    return (

        <div className="min-h-screen bg-black text-white">

            <Hero />

            <StatsDashboard />

            <UrlScanner onScan={scanUrl} />

            {loading && <ScanLoader />}

            <div className="flex justify-center">
                <ResultCard result={result} />
            </div>

            <ScanHistory />

            <CyberInfo />

            <Footer />

        </div>

    );
}

export default App;