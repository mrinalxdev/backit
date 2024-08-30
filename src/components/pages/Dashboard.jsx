import { useUser } from "@clerk/clerk-react";
import { Calendar } from "lucide-react";
import DashComp from "../dashboard/DashComp";

const Dashboard = () => {
  const { user } = useUser();
  const today = new Date();
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = today.toLocaleDateString(undefined, options);
  return (
    <div className="mt-8">
      {/* Banner  */}
      <div className="w-[90%] mx-auto p-2 flex justify-between items-center">
        <div>
          <h1 className="text-3xl">
            Hi, <span className="font-bold">{user.firstName}</span> 👋
          </h1>
          <p className="text-sm text-gray-400">
            Discover Trends, Tools, and Top Suppliers All in One Place!
          </p>
        </div>

        <div className="flex gap-3 items-center max-sm:hidden">
          <p className="text-gray-500">{formattedDate}</p>
          <div className="bg-gray-300 p-2 rounded-full">
            <Calendar />
          </div>
        </div>
      </div>

      <div className="w-[90%] mx-auto mt-[2rem]">
        <div className="grid grid-cols-5 grid-rows-10 gap-2 max-sm:block">
          <div className="col-span-3 row-span-4 shadow-2xl rounded-md">
            <DashComp />
          </div>
          <div className="col-span-3 row-span-4 col-start-1 row-start-5 bg-gray-500">
            2
          </div>
          <div className="col-span-2 row-span-8 col-start-4 row-start-1 bg-gray-500">
            3
          </div>
          <div className="col-span-5 row-span-2 row-start-9 bg-gray-500">4</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
