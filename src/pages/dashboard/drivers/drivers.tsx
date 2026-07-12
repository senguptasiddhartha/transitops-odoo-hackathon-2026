import { useMemo, useState } from "react";
import {
  AlertTriangle,
  Pencil,
  Search,
  ShieldAlert,
  Trash2,
  X,
} from "lucide-react";

type DriverStatus = "Available" | "On Trip" | "Suspended" | "Off Duty";

type Driver = {
  id: number;
  name: string;
  phone: string;
  license: string;
  category: string;
  expiry: string;
  score: number;
  status: DriverStatus;
};

type DriverForm = {
  name: string;
  phone: string;
  license: string;
  category: string;
  expiry: string;
  score: string;
  status: DriverStatus;
};

const initialDrivers: Driver[] = [
  {
    id: 1,
    name: "Arjun Sharma",
    phone: "+91 98765 41025",
    license: "DL-0420110012345",
    category: "HMV",
    expiry: "2027-02-15",
    score: 92,
    status: "On Trip",
  },
  {
    id: 2,
    name: "Priya Das",
    phone: "+91 94350 61772",
    license: "AS-0120220044122",
    category: "Transport Vehicle",
    expiry: "2026-07-28",
    score: 98,
    status: "Available",
  },
  {
    id: 3,
    name: "Rahul Verma",
    phone: "+91 98101 20129",
    license: "UP-3220190000213",
    category: "HMV",
    expiry: "2026-10-10",
    score: 45,
    status: "Suspended",
  },
  {
    id: 4,
    name: "Vikram Singh",
    phone: "+91 98919 20192",
    license: "HR-2620200011029",
    category: "HMV",
    expiry: "2026-11-20",
    score: 95,
    status: "Available",
  },
  {
    id: 5,
    name: "Rohan Mehta",
    phone: "+91 98201 40143",
    license: "MH-1220180088391",
    category: "Transport Vehicle",
    expiry: "2026-06-30",
    score: 88,
    status: "Off Duty",
  },
  {
    id: 6,
    name: "Ananya Roy",
    phone: "+91 98300 50112",
    license: "WB-0120210099211",
    category: "LMV Commercial",
    expiry: "2027-08-01",
    score: 72,
    status: "Available",
  },
];

const emptyForm: DriverForm = {
  name: "",
  phone: "",
  license: "",
  category: "HMV",
  expiry: "",
  score: "100",
  status: "Available",
};

function getDaysUntilExpiry(expiry: string) {
  const today = new Date();
  const expiryDate = new Date(`${expiry}T00:00:00`);

  today.setHours(0, 0, 0, 0);

  return Math.ceil(
    (expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );
}

function getScoreClass(score: number) {
  if (score >= 90) {
    return "text-emerald-600";
  }

  if (score >= 70) {
    return "text-amber-600";
  }

  return "text-red-600";
}

function getStatusClass(status: DriverStatus) {
  if (status === "Available") {
    return "border-emerald-200 bg-emerald-50 text-emerald-700";
  }

  if (status === "On Trip") {
    return "border-blue-200 bg-blue-50 text-blue-700";
  }

  if (status === "Suspended") {
    return "border-red-200 bg-red-50 text-red-700";
  }

  return "border-slate-200 bg-slate-100 text-slate-600";
}

export default function Drivers() {
  const [drivers, setDrivers] = useState<Driver[]>(initialDrivers);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [licenseFilter, setLicenseFilter] = useState("All License Types");
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<DriverForm>(emptyForm);

  const filteredDrivers = useMemo(() => {
    const query = search.trim().toLowerCase();

    return drivers.filter((driver) => {
      const matchesSearch =
        driver.name.toLowerCase().includes(query) ||
        driver.phone.toLowerCase().includes(query) ||
        driver.license.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All Statuses" || driver.status === statusFilter;

      const matchesLicense =
        licenseFilter === "All License Types" ||
        driver.category === licenseFilter;

      return matchesSearch && matchesStatus && matchesLicense;
    });
  }, [drivers, search, statusFilter, licenseFilter]);

  const hasCriticalExpiry = drivers.some(
    (driver) => getDaysUntilExpiry(driver.expiry) <= 30
  );

  function openNewDriver() {
    setEditingId(null);
    setForm(emptyForm);
    setShowModal(true);
  }

  function openEditDriver(driver: Driver) {
    setEditingId(driver.id);

    setForm({
      name: driver.name,
      phone: driver.phone,
      license: driver.license,
      category: driver.category,
      expiry: driver.expiry,
      score: String(driver.score),
      status: driver.status,
    });

    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
    setEditingId(null);
    setForm(emptyForm);
  }

  function saveDriver() {
    if (
      !form.name.trim() ||
      !form.phone.trim() ||
      !form.license.trim() ||
      !form.expiry
    ) {
      return;
    }

    const score = Math.min(100, Math.max(0, Number(form.score) || 0));

    if (editingId !== null) {
      setDrivers((current) =>
        current.map((driver) =>
          driver.id === editingId
            ? {
                ...driver,
                name: form.name.trim(),
                phone: form.phone.trim(),
                license: form.license.trim(),
                category: form.category,
                expiry: form.expiry,
                score,
                status: form.status,
              }
            : driver
        )
      );
    } else {
      const driver: Driver = {
        id: Date.now(),
        name: form.name.trim(),
        phone: form.phone.trim(),
        license: form.license.trim(),
        category: form.category,
        expiry: form.expiry,
        score,
        status: form.status,
      };

      setDrivers((current) => [driver, ...current]);
    }

    closeModal();
  }

  function deleteDriver(id: number) {
    setDrivers((current) => current.filter((driver) => driver.id !== id));
  }

  return (
    <div className="min-h-full bg-slate-100 px-5 py-6 text-slate-950">
      <div className="mx-auto max-w-[1450px]">
        <div className="flex flex-col gap-4 border-b border-slate-300 pb-5 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Driver Management
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Monitor driver safety performance, duty status, and commercial
              driving licences.
            </p>
          </div>

          <button
            type="button"
            onClick={openNewDriver}
            className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-md active:translate-y-0"
          >
            Add Driver
          </button>
        </div>

        {hasCriticalExpiry && (
          <div className="mt-6 flex gap-4 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-red-700 shadow-sm transition-shadow duration-200 hover:shadow-md">
            <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-red-500" />

            <div>
              <p className="text-sm font-semibold">
                Critical Licence Expirations Detected
              </p>

              <p className="mt-1 text-sm leading-6 text-red-600">
                Some active drivers have commercial driving licences that are
                expired or expiring within 30 days. Drivers with expired
                licences are blocked from trip assignments.
              </p>
            </div>
          </div>
        )}

        <div className="mt-6 grid gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-shadow duration-200 hover:shadow-md lg:grid-cols-[1fr_190px_225px]">
          <div className="flex items-center gap-3 rounded-lg border border-slate-300 bg-white px-4 transition-all duration-200 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">
            <Search className="h-5 w-5 text-slate-400" />

            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by name, licence, contact..."
              className="h-11 w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            className="h-11 cursor-pointer rounded-lg border border-slate-300 bg-white px-4 text-sm text-slate-700 outline-none transition-all duration-200 hover:border-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option>All Statuses</option>
            <option>Available</option>
            <option>On Trip</option>
            <option>Suspended</option>
            <option>Off Duty</option>
          </select>

          <select
            value={licenseFilter}
            onChange={(event) => setLicenseFilter(event.target.value)}
            className="h-11 cursor-pointer rounded-lg border border-slate-300 bg-white px-4 text-sm text-slate-700 outline-none transition-all duration-200 hover:border-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option>All License Types</option>
            <option>HMV</option>
            <option>Transport Vehicle</option>
            <option>LMV Commercial</option>
          </select>
        </div>

        <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-shadow duration-200 hover:shadow-md">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1050px] border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                  <th className="px-5 py-4">Name</th>
                  <th className="px-5 py-4">Contact Details</th>
                  <th className="px-5 py-4">Licence Details</th>
                  <th className="px-5 py-4">Licence Expiry</th>
                  <th className="px-5 py-4">Safety Score</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4 text-right">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredDrivers.map((driver) => {
                  const daysUntilExpiry = getDaysUntilExpiry(driver.expiry);

                  return (
                    <tr
                      key={driver.id}
                      className="border-b border-slate-200 transition-colors duration-200 last:border-b-0 hover:bg-slate-50"
                    >
                      <td className="px-5 py-5 text-sm font-semibold text-slate-900">
                        {driver.name}
                      </td>

                      <td className="px-5 py-5 text-sm text-slate-600">
                        {driver.phone}
                      </td>

                      <td className="px-5 py-5">
                        <p className="text-sm font-semibold text-slate-800">
                          {driver.license}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          {driver.category}
                        </p>
                      </td>

                      <td className="px-5 py-5">
                        <p className="text-sm text-slate-700">
                          {driver.expiry}
                        </p>

                        {daysUntilExpiry < 0 ? (
                          <span className="mt-2 inline-flex items-center gap-1 rounded-md bg-red-100 px-2 py-1 text-[11px] font-semibold text-red-700">
                            <AlertTriangle className="h-3 w-3" />
                            Expired
                          </span>
                        ) : daysUntilExpiry <= 30 ? (
                          <span className="mt-2 inline-flex items-center gap-1 rounded-md bg-amber-100 px-2 py-1 text-[11px] font-semibold text-amber-700">
                            <AlertTriangle className="h-3 w-3" />
                            Expires in {daysUntilExpiry} days
                          </span>
                        ) : (
                          <p className="mt-1 text-xs text-slate-400">Valid</p>
                        )}
                      </td>

                      <td className="px-5 py-5">
                        <span
                          className={`text-base font-bold ${getScoreClass(
                            driver.score
                          )}`}
                        >
                          {driver.score}
                        </span>

                        <span className="ml-1 text-xs text-slate-500">/100</span>
                      </td>

                      <td className="px-5 py-5">
                        <span
                          className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium ${getStatusClass(
                            driver.status
                          )}`}
                        >
                          {driver.status}
                        </span>
                      </td>

                      <td className="px-5 py-5">
                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => openEditDriver(driver)}
                            className="rounded-lg p-2 text-slate-400 transition-all duration-200 hover:bg-blue-50 hover:text-blue-600"
                            aria-label="Edit driver"
                          >
                            <Pencil className="h-4 w-4" />
                          </button>

                          <button
                            type="button"
                            onClick={() => deleteDriver(driver.id)}
                            className="rounded-lg p-2 text-slate-400 transition-all duration-200 hover:bg-red-50 hover:text-red-600"
                            aria-label="Delete driver"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredDrivers.length === 0 && (
            <div className="px-6 py-16 text-center text-sm text-slate-500">
              No drivers found.
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4 backdrop-blur-[2px]">
          <div className="w-full max-w-[510px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  {editingId === null ? "Register New Driver" : "Edit Driver"}
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Enter driver and commercial licence information.
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                className="rounded-lg p-2 text-slate-400 transition-all duration-200 hover:bg-slate-100 hover:text-slate-700"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="max-h-[70vh] overflow-y-auto px-6 py-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold text-slate-600">
                    Full Name
                  </span>

                  <input
                    value={form.name}
                    onChange={(event) =>
                      setForm({ ...form, name: event.target.value })
                    }
                    placeholder="e.g., Arjun Sharma"
                    className="h-10 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 hover:border-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </label>

                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold text-slate-600">
                    Contact Phone
                  </span>

                  <input
                    value={form.phone}
                    onChange={(event) =>
                      setForm({ ...form, phone: event.target.value })
                    }
                    placeholder="e.g., +91 98765 43210"
                    className="h-10 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 hover:border-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </label>

                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold text-slate-600">
                    Driving Licence Number
                  </span>

                  <input
                    value={form.license}
                    onChange={(event) =>
                      setForm({ ...form, license: event.target.value })
                    }
                    placeholder="e.g., AS-0120220012345"
                    className="h-10 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 hover:border-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </label>

                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold text-slate-600">
                    Licence Category
                  </span>

                  <select
                    value={form.category}
                    onChange={(event) =>
                      setForm({ ...form, category: event.target.value })
                    }
                    className="h-10 w-full cursor-pointer rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none transition-all duration-200 hover:border-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  >
                    <option value="HMV">HMV - Heavy Motor Vehicle</option>
                    <option value="Transport Vehicle">
                      Transport Vehicle
                    </option>
                    <option value="LMV Commercial">
                      LMV - Commercial
                    </option>
                  </select>
                </label>

                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold text-slate-600">
                    Licence Expiry Date
                  </span>

                  <input
                    type="date"
                    value={form.expiry}
                    onChange={(event) =>
                      setForm({ ...form, expiry: event.target.value })
                    }
                    className="h-10 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none transition-all duration-200 hover:border-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </label>

                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold text-slate-600">
                    Safety Performance Score
                  </span>

                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={form.score}
                    onChange={(event) =>
                      setForm({ ...form, score: event.target.value })
                    }
                    className="h-10 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none transition-all duration-200 hover:border-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </label>
              </div>

              <label className="mt-4 block">
                <span className="mb-1.5 block text-xs font-semibold text-slate-600">
                  Operational Shift Status
                </span>

                <select
                  value={form.status}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      status: event.target.value as DriverStatus,
                    })
                  }
                  className="h-10 w-full cursor-pointer rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none transition-all duration-200 hover:border-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="Available">Available</option>
                  <option value="On Trip">On Trip</option>
                  <option value="Suspended">Suspended</option>
                  <option value="Off Duty">Off Duty</option>
                </select>
              </label>

              <div className="mt-6 border-t border-slate-200 pt-5">
                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition-all duration-200 hover:bg-slate-50 hover:shadow-sm"
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    onClick={saveDriver}
                    className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-md active:translate-y-0"
                  >
                    {editingId === null ? "Register Driver" : "Save Driver"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}