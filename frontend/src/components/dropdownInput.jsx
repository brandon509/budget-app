export default function DropdownInput({ name, state, onChange, options }) {
  return (
    <div className="input-parent">
      <h5 className={state ? "input-label" : "hidden"}>
        {name[0].toUpperCase() + name.slice(1)}
      </h5>
      <select
        name={name}
        onChange={onChange}
        className={state ? "select" : "select placeholder"}
        value={state}
      >
        <option value="">{name[0].toUpperCase() + name.slice(1)}</option>
        {options &&
          options.map((x) => (
            <option key={x._id} value={x._id}>
              {x.name}
            </option>
          ))}
      </select>
    </div>
  )
}
