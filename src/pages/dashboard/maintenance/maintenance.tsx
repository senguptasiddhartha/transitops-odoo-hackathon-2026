import { useMemo, useState } from "react";
import {
  Pencil,
  Plus,
  Search,
  Trash2,
  X,
} from "lucide-react";

type WorkStatus = "Open" | "Closed";

type MaintenanceRecord = {
  id: number;
  registration: string;
  model: string;
  repair: string;
  notes: string;
  serviceDate: string;
  repairCost: number;
  status: WorkStatus;
};

type MaintenanceForm = {
  equipment: string;
  repair: string;
  serviceDate: string;
  repairCost: string;
  notes: string;
  status: WorkStatus;
};

const equipmentOptions = [
  {
    registration: "CA-889-XTR",
    model: "Freightliner Cascadia",
  },
  {
    registration: "FL-112-MTR",
    model: "Mercedes-Benz Sprinter",
  },
  {
    registration: "IL-309-BOX",
    model: "Isuzu NPR-HD",
  },
  {
    registration: "NY-442-VAN",
    model: "Ford F-550 Super Duty",
  },
  {
    registration: "TX-551-CDL",
    model: "Volvo FH16",
  },
  {
    registration: "NV-771-RET",
    model: "Kenworth T680",
  },
];

const initialRecords: MaintenanceRecord[] = [
  {
    id: 1,
    registration: "NY-442-VAN",
    model: "Ford F-550 Super Duty",
    repair: "Brake pads replacement and engine diagnostics",
    notes:
      "Vehicle pulled to the side during brake tests. Replaced front pads and flushed brake fluid.",
    serviceDate: "2026-07-09",
    repairCost: 1250,
    status: "Open",
  },
  {
    id: 2,
    registration: "TX-551-CDL",
    model: "Volvo FH16",
    repair: "Scheduled oil change and filter renewal",
    notes:
      "Routine maintenance at 120k km. Replaced oil filter and cabin filter.",
    serviceDate: "2026-06-15",
    repairCost: 280,
    status: "Closed",
  },
  {
    id: 3,
    registration: "NV-771-RET",
    model: "Kenworth T680",
    repair: "Complete transmission rebuild",
    notes:
      "Severe gear grinding in high ranges. Transmission fully rebuilt and tested.",
    serviceDate: "2026-04-10",
    repairCost: 4800,
    status: "Closed",
  },
];

const emptyForm: MaintenanceForm = {
  equipment: "",
  repair: "",
  serviceDate: "",
  repairCost: "",
  notes: "",
  status: "Open",
};

export default function Maintenance() {
  const [records, setRecords] =
    useState<MaintenanceRecord[]>(initialRecords);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [form, setForm] =
    useState<MaintenanceForm>(emptyForm);

  const filteredRecords = useMemo(() => {
    const searchValue = search.toLowerCase().trim();

    return records.filter((record) => {
      const matchesSearch =
        record.registration.toLowerCase().includes(searchValue) ||
        record.model.toLowerCase().includes(searchValue) ||
        record.repair.toLowerCase().includes(searchValue) ||
        record.notes.toLowerCase().includes(searchValue);

      const matchesStatus =
        statusFilter === "All" ||
        record.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [records, search, statusFilter]);

  function updateForm(
    field: keyof MaintenanceForm,
    value: string
  ) {
    setForm((currentForm) => ({
      ...currentForm,
      [field]: value,
    }));
  }

  function openNewRecordForm() {
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(true);
  }

  function closeForm() {
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(false);
  }

  function saveRecord(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const selectedEquipment = equipmentOptions.find(
      (equipment) =>
        equipment.registration === form.equipment
    );

    if (
      !selectedEquipment ||
      !form.repair.trim() ||
      !form.serviceDate ||
      !form.repairCost
    ) {
      return;
    }

    if (editingId !== null) {
      setRecords((currentRecords) =>
        currentRecords.map((record) =>
          record.id === editingId
            ? {
                ...record,
                registration:
                  selectedEquipment.registration,
                model: selectedEquipment.model,
                repair: form.repair.trim(),
                serviceDate: form.serviceDate,
                repairCost: Number(form.repairCost),
                notes: form.notes.trim(),
                status: form.status,
              }
            : record
        )
      );
    } else {
      const newRecord: MaintenanceRecord = {
        id: Date.now(),
        registration: selectedEquipment.registration,
        model: selectedEquipment.model,
        repair: form.repair.trim(),
        serviceDate: form.serviceDate,
        repairCost: Number(form.repairCost),
        notes: form.notes.trim(),
        status: form.status,
      };

      setRecords((currentRecords) => [
        newRecord,
        ...currentRecords,
      ]);
    }

    closeForm();
  }

  function editRecord(record: MaintenanceRecord) {
    setEditingId(record.id);

    setForm({
      equipment: record.registration,
      repair: record.repair,
      serviceDate: record.serviceDate,
      repairCost: String(record.repairCost),
      notes: record.notes,
      status: record.status,
    });

    setShowForm(true);
  }

  function closeRecord(id: number) {
    setRecords((currentRecords) =>
      currentRecords.map((record) =>
        record.id === id
          ? {
              ...record,
              status: "Closed",
            }
          : record
      )
    );
  }

  function deleteRecord(id: number) {
    setRecords((currentRecords) =>
      currentRecords.filter(
        (record) => record.id !== id
      )
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Maintenance
          </h1>

          <p className="mt-2 text-slate-500">
            Manage workshop schedules and vehicle service records.
          </p>
        </div>

        <button
          type="button"
          onClick={openNewRecordForm}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700"
        >
          <Plus size={19} />
          Record Maintenance
        </button>
      </div>

      <div className="rounded-2xl bg-slate-900 p-4 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row">
          <div className="relative flex-1">
            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search logs by vehicle, repair description, notes..."
              className="w-full rounded-xl border border-slate-700 bg-slate-800 py-3 pl-12 pr-4 text-white outline-none placeholder:text-slate-400 focus:border-blue-500"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(event.target.value)
            }
            className="min-w-56 rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-blue-500"
          >
            <option value="All">
              All Job Statuses
            </option>

            <option value="Open">
              Open
            </option>

            <option value="Closed">
              Closed
            </option>
          </select>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl bg-slate-900 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-b border-slate-700 text-xs uppercase text-blue-300">
              <tr>
                <th className="px-5 py-5">
                  Vehicle Equipment
                </th>

                <th className="px-5 py-5">
                  Repair Description and Logs
                </th>

                <th className="px-5 py-5">
                  Service Date
                </th>

                <th className="px-5 py-5">
                  Repair Cost
                </th>

                <th className="px-5 py-5">
                  Work Status
                </th>

                <th className="px-5 py-5 text-right">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-800">
              {filteredRecords.map((record) => (
                <tr
                  key={record.id}
                  className="transition hover:bg-slate-800/60"
                >
                  <td className="px-5 py-5 align-top">
                    <p className="font-mono text-sm font-semibold text-white">
                      {record.registration}
                    </p>

                    <p className="mt-1 text-sm text-slate-300">
                      {record.model}
                    </p>
                  </td>

                  <td className="max-w-md px-5 py-5 align-top">
                    <p className="font-semibold text-white">
                      {record.repair}
                    </p>

                    <p className="mt-2 text-sm italic leading-5 text-slate-400">
                      {record.notes}
                    </p>
                  </td>

                  <td className="px-5 py-5 align-top font-mono text-sm text-slate-200">
                    {record.serviceDate}
                  </td>

                  <td className="px-5 py-5 align-top font-mono font-semibold text-white">
                    $
                    {record.repairCost.toLocaleString()}
                  </td>

                  <td className="px-5 py-5 align-top">
                    {record.status === "Open" ? (
                      <div className="flex items-center gap-3">
                        <span className="rounded-full border border-orange-700 bg-orange-950/50 px-4 py-2 text-xs font-medium text-orange-400">
                          Open In Shop
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            closeRecord(record.id)
                          }
                          className="text-xs font-medium text-teal-400 hover:text-teal-300"
                        >
                          Mark Closed
                        </button>
                      </div>
                    ) : (
                      <span className="rounded-full border border-emerald-800 bg-emerald-950/50 px-4 py-2 text-xs font-medium text-emerald-400">
                        Closed
                      </span>
                    )}
                  </td>

                  <td className="px-5 py-5 align-top">
                    <div className="flex justify-end gap-4">
                      <button
                        type="button"
                        onClick={() =>
                          editRecord(record)
                        }
                        className="text-slate-400 transition hover:text-blue-400"
                      >
                        <Pencil size={17} />
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          deleteRecord(record.id)
                        }
                        className="text-slate-500 transition hover:text-red-400"
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredRecords.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-16 text-center text-slate-400"
                  >
                    No maintenance records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 p-5 backdrop-blur-sm">
          <div className="flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-700 px-6 py-5">
              <h2 className="text-xl font-bold text-white">
                {editingId !== null
                  ? "Edit Maintenance Record"
                  : "Record New Maintenance"}
              </h2>

              <button
                type="button"
                onClick={closeForm}
                className="text-slate-400 transition hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <form
              onSubmit={saveRecord}
              className="overflow-y-auto px-6 py-6"
            >
              <div className="space-y-5">
                <label className="block">
                  <span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Select Equipment
                  </span>

                  <select
                    value={form.equipment}
                    onChange={(event) =>
                      updateForm(
                        "equipment",
                        event.target.value
                      )
                    }
                    required
                    className="w-full rounded-lg border border-slate-600 bg-slate-800 px-4 py-3 text-sm text-white outline-none focus:border-teal-400"
                  >
                    <option value="">
                      Choose Equipment
                    </option>

                    {equipmentOptions.map(
                      (equipment) => (
                        <option
                          key={equipment.registration}
                          value={equipment.registration}
                        >
                          {equipment.registration} |{" "}
                          {equipment.model}
                        </option>
                      )
                    )}
                  </select>

                  <p className="mt-2 text-xs text-slate-500">
                    Selecting an Open status will withdraw this vehicle from the active duty pool.
                  </p>
                </label>

                <label className="block">
                  <span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Type / Description of Work
                  </span>

                  <input
                    type="text"
                    value={form.repair}
                    onChange={(event) =>
                      updateForm(
                        "repair",
                        event.target.value
                      )
                    }
                    placeholder="e.g. Oil change, brake rotor renewal, tire rotation"
                    required
                    className="w-full rounded-lg border border-slate-600 bg-slate-800 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-teal-400"
                  />
                </label>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Service Date
                    </span>

                    <input
                      type="date"
                      value={form.serviceDate}
                      onChange={(event) =>
                        updateForm(
                          "serviceDate",
                          event.target.value
                        )
                      }
                      required
                      className="w-full rounded-lg border border-slate-600 bg-slate-800 px-4 py-3 text-sm text-white outline-none focus:border-teal-400"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Service Cost (USD)
                    </span>

                    <input
                      type="number"
                      min="0"
                      value={form.repairCost}
                      onChange={(event) =>
                        updateForm(
                          "repairCost",
                          event.target.value
                        )
                      }
                      placeholder="500"
                      required
                      className="w-full rounded-lg border border-slate-600 bg-slate-800 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-teal-400"
                    />
                  </label>
                </div>

                <label className="block">
                  <span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Mechanic Notes / Parts Replaced
                  </span>

                  <textarea
                    value={form.notes}
                    onChange={(event) =>
                      updateForm(
                        "notes",
                        event.target.value
                      )
                    }
                    rows={4}
                    placeholder="Input detailed diagnostic reports, parts suppliers, or warning lights flagged..."
                    className="w-full resize-none rounded-lg border border-slate-600 bg-slate-800 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-teal-400"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Service Status
                  </span>

                  <select
                    value={form.status}
                    onChange={(event) =>
                      updateForm(
                        "status",
                        event.target.value
                      )
                    }
                    className="w-full rounded-lg border border-slate-600 bg-slate-800 px-4 py-3 text-sm text-white outline-none focus:border-teal-400"
                  >
                    <option value="Open">
                      Open (In-shop, vehicle decommissioned)
                    </option>

                    <option value="Closed">
                      Closed (Service completed)
                    </option>
                  </select>
                </label>
              </div>

              <div className="mt-6 flex justify-end gap-3 border-t border-slate-700 pt-5">
                <button
                  type="button"
                  onClick={closeForm}
                  className="rounded-lg bg-slate-800 px-5 py-3 text-sm font-semibold text-slate-300 transition hover:bg-slate-700"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-lg bg-teal-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-teal-400"
                >
                  {editingId !== null
                    ? "Save Changes"
                    : "Log Maintenance"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}