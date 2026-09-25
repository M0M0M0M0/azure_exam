export default function Input({ label, as: Tag = 'input', children, ...rest }) {
  return (
    <label className="input">
      <span className="input__label">{label}</span>
      <Tag className="input__control" {...rest}>
        {children}
      </Tag>
    </label>
  )
}
