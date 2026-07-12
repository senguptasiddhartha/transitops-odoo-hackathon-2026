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
    registration: "AS 01 NC 4821",
    model: "Tata 407 Gold SFC",
  },
  {
    registration: "DL 01 GC 8892",
    model: "BharatBenz 3528C",
  },
  {
    registration: "MH 12 RT 1124",
    model: "Mahindra Bolero Pik Up",
  },
  {
    registration: "KA 01 AB 4421",
    model: "Ashok Leyland Dost+",
  },
  {
    registration: "WB 23 E 5510",
    model: "Volvo FM 420",
  },
  {
    registration: "RJ 14 GT 7718",
    model: "Tata Signa 5530.S",
  },
];

const initialRecords: MaintenanceRecord[] = [
  {
    id: 1,
    registration: "KA 01 AB 4421",
    model: "Ashok Leyland Dost+",
    repair: "Brake pad replacement and engine diagnostics",
    notes:
      "Vehicle showed reduced braking response during inspection. Front brake pads replaced and brake fluid checked.",
    serviceDate: "2026-07-09",
    repairCost: 18500,
    status: "Open",
  },
  {
    id: 2,
    registration: "WB 23 E 5510",
    model: "Volvo FM 420",
    repair: "Scheduled oil change and filter replacement",
    notes:
      "Routine maintenance completed at scheduled mileage. Engine oil, oil filter, and cabin filter replaced.",
    serviceDate: "2026-06-15",
    repairCost: 8200,
    status: "Closed",
  },
  {
    id: 3,
    registration: "RJ 14 GT 7718",
    model: "Tata Signa 5530.S",
    repair: "Transmission system overhaul",
    notes:
      "Gear shifting irregularities reported on long-haul routes. Transmission assembly inspected, repaired, and road tested.",
    serviceDate: "2026-04-10",
    repairCost: 68500,
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

function formatCurrency(value: number) {
  return value.toLocaleString("en-IN");
}

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
    <div className="min-h-full bg-slate-100 px-5 py-6 text-slate-950">
      <div className="mx-auto max-w-[1450px]">
        <div className="flex flex-col gap-4 border-b border-slate-300 pb-5 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Maintenance
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Manage workshop schedules and maintain vehicle service records.
            </p>
          </div>

          <button
            type="button"
            onClick={openNewRecordForm}
            className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-md active:translate-y-0"
          >
            <Plus size={18} />
            Record Maintenance
          </button>
        </div>

        <div className="mt-6 grid gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-shadow duration-200 hover:shadow-md lg:grid-cols-[1fr_225px]">
          <div className="relative">
            <Search
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search by vehicle, registration, repair, or notes..."
              className="h-11 w-full rounded-lg border border-slate-300 bg-white pl-12 pr-4 text-sm text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 hover:border-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(event.target.value)
            }
            className="h-11 cursor-pointer rounded-lg border border-slate-300 bg-white px-4 text-sm text-slate-700 outline-none transition-all duration-200 hover:border-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
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

        <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-shadow duration-200 hover:shadow-md">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="border-b border-slate-200 bg-slate-50">
                <tr className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  <th className="px-5 py-4">
                    Vehicle Equipment
                  </th>

                  <th className="px-5 py-4">
                    Repair Description & Logs
                  </th>

                  <th className="px-5 py-4">
                    Service Date
                  </th>

                  <th className="px-5 py-4">
                    Repair Cost
                  </th>

                  <th className="px-5 py-4">
                    Work Status
                  </th>

                  <th className="px-5 py-4 text-right">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-200">
                {filteredRecords.map((record) => (
                  <tr
                    key={record.id}
                    className="transition-colors duration-200 hover:bg-slate-50"
                  >
                    <td className="px-5 py-5 align-top">
                      <p className="text-sm font-semibold text-slate-900">
                        {record.registration}
                      </p>

                      <p className="mt-1 text-sm text-slate-500">
                        {record.model}
                      </p>
                    </td>

                    <td className="max-w-md px-5 py-5 align-top">
                      <p className="text-sm font-semibold text-slate-900">
                        {record.repair}
                      </p>

                      <p className="mt-2 text-sm leading-5 text-slate-500">
                        {record.notes}
                      </p>
                    </td>

                    <td className="px-5 py-5 align-top text-sm text-slate-600">
                      {record.serviceDate}
                    </td>

                    <td className="px-5 py-5 align-top">
                      <p className="text-sm font-semibold text-slate-900">
                        ₹{formatCurrency(record.repairCost)}
                      </p>
                    </td>

                    <td className="px-5 py-5 align-top">
                      {record.status === "Open" ? (
                        <div className="flex flex-col items-start gap-2">
                          <span className="inline-flex rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
                            Open · In Workshop
                          </span>

                          <button
                            type="button"
                            onClick={() =>
                              closeRecord(record.id)
                            }
                            className="text-xs font-semibold text-blue-600 transition-colors duration-200 hover:text-blue-800 hover:underline"
                          >
                            Mark Closed
                          </button>
                        </div>
                      ) : (
                        <span className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                          Closed
                        </span>
                      )}
                    </td>

                    <td className="px-5 py-5 align-top">
                      <div className="flex justify-end gap-1">
                        <button
                          type="button"
                          onClick={() =>
                            editRecord(record)
                          }
                          className="rounded-lg p-2 text-slate-400 transition-all duration-200 hover:bg-blue-50 hover:text-blue-600"
                          aria-label="Edit maintenance record"
                        >
                          <Pencil size={17} />
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            deleteRecord(record.id)
                          }
                          className="rounded-lg p-2 text-slate-400 transition-all duration-200 hover:bg-red-50 hover:text-red-600"
                          aria-label="Delete maintenance record"
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
                      className="px-6 py-16 text-center text-sm text-slate-500"
                    >
                      No maintenance records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4 backdrop-blur-[2px]">
          <div className="flex max-h-[90vh] w-full max-w-[560px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  {editingId !== null
                    ? "Edit Maintenance Record"
                    : "Record New Maintenance"}
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Update workshop and service information for the selected vehicle.
                </p>
              </div>

              <button
                type="button"
                onClick={closeForm}
                className="rounded-lg p-2 text-slate-400 transition-all duration-200 hover:bg-slate-100 hover:text-slate-700"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>

            <form
              onSubmit={saveRecord}
              className="overflow-y-auto px-6 py-6"
            >
              <div className="space-y-5">
                <FormField label="Select Equipment">
                  <select
                    value={form.equipment}
                    onChange={(event) =>
                      updateForm(
                        "equipment",
                        event.target.value
                      )
                    }
                    required
                    className={inputClass}
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
                    An open maintenance record indicates that the vehicle is
                    currently unavailable for active trips.
                  </p>
                </FormField>

                <FormField label="Type / Description of Work">
                  <input
                    type="text"
                    value={form.repair}
                    onChange={(event) =>
                      updateForm(
                        "repair",
                        event.target.value
                      )
                    }
                    placeholder="e.g. Oil change, brake replacement, tyre rotation"
                    required
                    className={inputClass}
                  />
                </FormField>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <FormField label="Service Date">
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
                      className={inputClass}
                    />
                  </FormField>

                  <FormField label="Service Cost (INR)">
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
                      placeholder="5000"
                      required
                      className={inputClass}
                    />
                  </FormField>
                </div>

                <FormField label="Mechanic Notes / Parts Replaced">
                  <textarea
                    value={form.notes}
                    onChange={(event) =>
                      updateForm(
                        "notes",
                        event.target.value
                      )
                    }
                    rows={4}
                    placeholder="Enter diagnostic details, parts replaced, or workshop observations..."
                    className={`${inputClass} h-auto resize-none py-3`}
                  />
                </FormField>

                <FormField label="Service Status">
                  <select
                    value={form.status}
                    onChange={(event) =>
                      updateForm(
                        "status",
                        event.target.value
                      )
                    }
                    className={inputClass}
                  >
                    <option value="Open">
                      Open — Vehicle in workshop
                    </option>

                    <option value="Closed">
                      Closed — Service completed
                    </option>
                  </select>
                </FormField>
              </div>

              <div className="mt-6 flex justify-end gap-3 border-t border-slate-200 pt-5">
                <button
                  type="button"
                  onClick={closeForm}
                  className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition-all duration-200 hover:bg-slate-50 hover:shadow-sm"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-md active:translate-y-0"
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

function FormField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold text-slate-600">
        {label}
      </span>

      {children}
    </label>
  );
}

const inputClass =
  "h-10 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 hover:border-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100";