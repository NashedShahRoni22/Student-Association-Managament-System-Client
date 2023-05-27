import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";

export default function LoadingSpinner() {
  return (
    <div className="bg-white flex justify-center items-center rounded-xl gap-8 h-[100vh]">
      <ClimbingBoxLoader
        color="#463BFB"
        size={30}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}
