import * as React from "react";
import Select from "react-select";

const Filters = ({ filters }) => (
  <ul
    style={{
      display: `grid`,
      gridGap: `1rem`,
      maxWidth: 600,
      margin: `auto`,
      listStyle: `none`,
    }}
  >
    {filters.map((filter) => (
      <li key={filter.label}>
        <span>
          <strong>{filter.label}</strong>
          {!!filter.onSelectAll && (
            <button onClick={filter.onSelectAll}>Select All</button>
          )}
        </span>

        {filter.type === `Select` ? (
          <Select
            options={filter.options}
            selected={filter.selected}
            onChange={filter.onChange}
          />
        ) : filter.type === `date` ? (
          <input
            type={filter.type}
            value={filter.selected}
            onChange={filter.onChange}
          />
        ) : filter.type === `checkboxGroup` ? (
          <div
            style={{ display: `grid`, gridTemplateColumns: `repeat(2, 1fr)` }}
          >
            {filter.options.map((opt) => (
              <label key={opt.value} htmlFor={opt.value}>
                <input
                  type="checkbox"
                  id={opt.value}
                  value={opt.value}
                  checked={
                    !!filter.selected.find(
                      (selected) => selected.value === opt.value
                    )
                  }
                  onChange={filter.onChange}
                />
                {opt.label}
              </label>
            ))}
          </div>
        ) : (
          <p style={{ color: `red` }}>Unsupported filter type</p>
        )}
      </li>
    ))}
  </ul>
);

export default Filters;
