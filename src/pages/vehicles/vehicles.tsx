import { Search, Plus } from "lucide-react";

const vehicles = [
  {
    id: "TRK-101",
    type: "Truck",
    driver: "Rahul",
    status: "Available",
    capacity: "12 Ton",
  },
  {
    id: "TRK-102",
    type: "Trailer",
    driver: "Amit",
    status: "On Trip",
    capacity: "18 Ton",
  },
  {
    id: "VAN-201",
    type: "Mini Van",
    driver: "Priya",
    status: "Maintenance",
    capacity: "3 Ton",
  },
];

export default function Vehicles() {
  return (
    <div className="space-y-6">

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Vehicles</h1>
          <p className="text-gray-500">
            Fleet inventory and availability
          </p>
        </div>

        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
          <Plus size={18}/>
          Add Vehicle
        </button>
      </div>

      <div className="bg-white rounded-xl shadow p-4 flex items-center gap-3">
        <Search size={18}/>
        <input
          className="w-full outline-none"
          placeholder="Search vehicle..."
        />
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="text-left p-4">ID</th>

              <th className="text-left p-4">Type</th>

              <th className="text-left p-4">Driver</th>

              <th className="text-left p-4">Capacity</th>

              <th className="text-left p-4">Status</th>

            </tr>

          </thead>

          <tbody>

            {vehicles.map((v)=>(
              <tr key={v.id} className="border-t">

                <td className="p-4">{v.id}</td>

                <td className="p-4">{v.type}</td>

                <td className="p-4">{v.driver}</td>

                <td className="p-4">{v.capacity}</td>

                <td className="p-4">

                  <span
                    className={`px-3 py-1 rounded-full text-sm
                    ${
                      v.status==="Available"
                      ?"bg-green-100 text-green-700"
                      :v.status==="On Trip"
                      ?"bg-blue-100 text-blue-700"
                      :"bg-orange-100 text-orange-700"
                    }`}
                  >
                    {v.status}
                  </span>

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}