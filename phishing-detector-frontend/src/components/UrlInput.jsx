import { useState } from "react";

function UrlInput({ onCheck }) {

    const [url, setUrl] = useState("");

    const handleSubmit = () => {
        if(url.trim() !== ""){
            onCheck(url);
        }
    };

    return (
        <div style={{marginTop:"20px"}}>

            <input
                type="text"
                placeholder="Enter URL to check"
                value={url}
                onChange={(e)=>setUrl(e.target.value)}
                style={{
                    width:"400px",
                    padding:"10px",
                    fontSize:"16px"
                }}
            />

            <button
                onClick={handleSubmit}
                style={{
                    marginLeft:"10px",
                    padding:"10px 20px"
                }}
            >
                Check
            </button>

        </div>
    );
}

export default UrlInput;