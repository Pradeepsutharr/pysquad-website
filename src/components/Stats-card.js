import { Users, Package, BarChart2, RefreshCw } from "lucide-react";

const stats = [
  {
    title: "Happy Users",
    value: "50+",
    icon: <Users className="h-6 w-6 text-purple-500" />,
    changeType: "up",
  },
  {
    title: "best products",
    value: "200",
    icon: <Package className="h-6 w-6 text-indigo-500" />,
    changeType: "up",
  },
  {
    title: "User Satisfaction ",
    value: "98%",
    icon: <BarChart2 className="h-6 w-6 text-pink-500" />,
    changeType: "down",
  },
  {
    title: "Industries Served",
    value: "13+",
    icon: <RefreshCw className="h-6 w-6 text-violet-500" />,
    changeType: "up",
  },
];

export default function StatsCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
      {stats.map((item, idx) => (
        <div
          key={idx}
          className="flex py-8 flex-col justify-between rounded-2xl bg-white shadow-lg shadow-slate-200 p-5 hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center justify-between">
            <h4 className="text-gray-500 text-sm font-medium capitalize">
              {item.title}
            </h4>
            {item.icon}
          </div>
          <div className="mt-2">
            <p className="text-2xl font-bold text-gray-900">{item.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
