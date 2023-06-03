import SyncLoader from "react-spinners/SyncLoader";

export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center rounded-xl gap-8 h-[100vh]">
      <SyncLoader
        color="#ffffff"
        size={15}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}
