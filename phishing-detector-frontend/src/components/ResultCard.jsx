function ResultCard({ result }) {

    if (!result) return null;

    const phishing = result.status === "PHISHING";

    return (

        <div className="mt-8 p-6 rounded-xl text-center shadow-lg bg-gray-900 w-[450px]">

            <h2 className={`text-2xl font-bold ${
                phishing ? "text-red-400" : "text-green-400"
            }`}>

                {phishing ? "⚠️ Phishing Detected" : "✅ URL Safe"}

            </h2>

            <div className="mt-4 text-gray-300">

                <p>Source: {result.source}</p>
                <p>Domain: {result.domain}</p>
                <p>Subdomains: {result.subdomains}</p>

            </div>

            <div className="mt-6">

                <p className="text-gray-400 mb-2">Risk Score</p>

                <div className="w-full bg-gray-700 rounded-full h-4">

                    <div
                        className="bg-red-500 h-4 rounded-full"
                        style={{ width: `${result.riskScore}%` }}
                    ></div>

                </div>

                <p className="mt-1 text-gray-300">{result.riskScore}%</p>

            </div>

        </div>
    );
}

export default ResultCard;