import { useState } from "react";

function UrlScanner({ onScan }) {

    const [url, setUrl] = useState("");



    const handleScan = () => {
        try {
            new URL(url);
        } catch {
            alert("Please enter a valid URL");
            return;
        }
        if(url.trim() !== ""){
            onScan(url);
        }
    };

    return (

        <div className="flex justify-center mt-6">

            <input
                className="w-[450px] bg-gray-900 text-white border border-gray-700 p-3 rounded-l-lg"
                placeholder="Enter suspicious URL..."
                value={url}
                onChange={(e)=>setUrl(e.target.value)}
            />

            <button
                onClick={handleScan}
                className="bg-green-500 px-6 rounded-r-lg hover:bg-green-600"
            >
                Scan
            </button>

        </div>
    );
}

export default UrlScanner;