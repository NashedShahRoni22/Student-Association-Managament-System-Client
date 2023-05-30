import SyncLoader from "react-spinners/SyncLoader";

export default function LoadingSpinner() {
  return (
    <div className="bg-gray-200 flex justify-center items-center rounded-xl gap-8 h-[100vh]">
      <SyncLoader
        color="#463BFB"
        size={15}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}
