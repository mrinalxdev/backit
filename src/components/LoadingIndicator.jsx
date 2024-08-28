import { Skeleton } from "@/components/ui/skeleton";

const LoadingIndicator = () => {
  return <Skeleton className="max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl rounded-lg p-3 bg-indigo-900" />;
};

export default LoadingIndicator;
