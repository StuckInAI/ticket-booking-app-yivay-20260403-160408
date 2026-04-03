'use client';

interface SearchFiltersProps {
  maxPrice: number;
  setMaxPrice: (v: number) => void;
  stopsFilter: number[];
  setStopsFilter: (v: number[]) => void;
  sortBy: 'price' | 'duration' | 'departure';
  setSortBy: (v: 'price' | 'duration' | 'departure') => void;
}

export default function SearchFilters({
  maxPrice,
  setMaxPrice,
  stopsFilter,
  setStopsFilter,
}: SearchFiltersProps) {
  const toggleStop = (stop: number) => {
    if (stopsFilter.includes(stop)) {
      setStopsFilter(stopsFilter.filter((s) => s !== stop));
    } else {
      setStopsFilter([...stopsFilter, stop]);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-5 sticky top-20">
      <h3 className="font-bold text-gray-800 mb-5 text-lg">Filters</h3>

      {/* Price Range */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-700 mb-3">Max Price</h4>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-500">$0</span>
          <span className="text-sm font-semibold text-blue-600">${maxPrice}</span>
        </div>
        <input
          type="range"
          min={100}
          max={1000}
          step={50}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-blue-600"
        />
      </div>

      {/* Stops */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-700 mb-3">Stops</h4>
        <div className="space-y-2">
          {[
            { label: 'Direct', value: 0 },
            { label: '1 Stop', value: 1 },
            { label: '2+ Stops', value: 2 },
          ].map(({ label, value }) => (
            <label key={value} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={stopsFilter.includes(value)}
                onChange={() => toggleStop(value)}
                className="w-4 h-4 accent-blue-600"
              />
              <span className="text-gray-700">{label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Airlines */}
      <div>
        <h4 className="font-semibold text-gray-700 mb-3">Airlines</h4>
        <div className="space-y-2">
          {['SkyWings Airlines', 'Global Air', 'Pacific Express', 'Atlantic Airways'].map((airline) => (
            <label key={airline} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                defaultChecked
                className="w-4 h-4 accent-blue-600"
              />
              <span className="text-gray-700 text-sm">{airline}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
