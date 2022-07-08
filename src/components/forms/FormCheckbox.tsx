import { ControllerProps } from 'react-hook-form'
import { Checkbox, CheckboxProps, FormItemProps } from 'antd'
import { ControlledFormItem } from './ControlledFormItem'

export type Props = {
  name: string
  label?: string
  description?: string
  formItemProps?: FormItemProps
  checkboxProps?: CheckboxProps
} & Omit<ControllerProps, 'render'>

const FormCheckbox: React.FC<Props> = ({
  label,
  description,
  checkboxProps,
  ...rest
}) => {
  return (
    <ControlledFormItem
      {...rest}
      render={({ value, onChange, onBlur }) => (
        <div className="flex flex-col gap-1">
          <Checkbox
            {...{
              checked: value,
              onChange: e => onChange(+e.target.checked),
              onBlur,
            }}
            {...checkboxProps}
          >
            <span className="font-normal">{label}</span>
          </Checkbox>
          {description}
        </div>
      )}
    />
  )
}

export default FormCheckbox
