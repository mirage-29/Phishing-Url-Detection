function ScanLoader() {

    return (
        <div className="flex justify-center mt-6">

            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-400"></div>

            <p className="ml-4 text-gray-400">Scanning URL...</p>

        </div>
    );
}

export default ScanLoader;