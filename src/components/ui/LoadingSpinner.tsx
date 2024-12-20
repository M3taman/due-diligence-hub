import { FC } from "react";
import { Loader2 } from "lucide-react";

const LoadingSpinner: FC = () => {
  return (
    <div className="flex items-center justify-center">
      <Loader2 className="animate-spin h-6 w-6 text-gray-500" />
    </div>
  );
};

export default LoadingSpinner;
