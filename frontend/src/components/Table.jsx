import { Edit2, Trash2 } from 'lucide-react';

export default function Table({ columns, data, onEdit, onDelete }) {
  return (
    <div className="bg-white border border-slate-200 rounded overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50">
            {columns.map((col) => (
              <th
                key={col}
                className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wide"
              >
                {col}
              </th>
            ))}
            <th className="px-6 py-3 text-center text-xs font-semibold text-slate-700 uppercase tracking-wide">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length + 1} className="px-6 py-8 text-center text-slate-500 text-sm">
                No data available
              </td>
            </tr>
          ) : (
            data.map((row, idx) => (
              <tr
                key={row.id}
                className={`border-b border-slate-200 transition-colors hover:bg-slate-50 ${
                  idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'
                }`}
              >
                {columns.map((col) => (
                  <td key={col} className="px-6 py-4 text-sm text-slate-900">
                    {row[col]}
                  </td>
                ))}
                <td className="px-6 py-4 text-center flex gap-3 justify-center">
                  <button
                    onClick={() => onEdit(row.id)}
                    className="text-slate-400 hover:text-blue-600 transition-colors p-1"
                    title="Edit"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => onDelete(row.id)}
                    className="text-slate-400 hover:text-red-600 transition-colors p-1"
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
