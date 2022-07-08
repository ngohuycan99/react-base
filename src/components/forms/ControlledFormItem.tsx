import { PropsWithChildren, useMemo } from 'react'
import {
  Controller,
  ControllerProps,
  ControllerRenderProps,
  useFormContext,
} from 'react-hook-form'
import { Form, FormItemProps } from 'antd'
import { LabelTooltipType } from 'antd/lib/form/FormItemLabel'
import styled from 'styled-components'
import tw from 'twin.macro'

type Props = PropsWithChildren<
  {
    name: string
    label?: string
    formItemProps?: FormItemProps
    render: (
      props: Pick<ControllerRenderProps, 'value' | 'onChange' | 'onBlur'>
    ) => React.ReactNode
  } & Omit<ControllerProps, 'render'>
>

const getTooltip = (tooltipProps: LabelTooltipType) => {
  switch (typeof tooltipProps) {
    case 'object':
      return {
        ...tooltipProps,
      }
    case 'string':
      return { title: tooltipProps }
    default:
      return tooltipProps
  }
}

export const ControlledFormItem: React.FC<Props> = ({
  name,
  label,
  formItemProps = {},
  render,
  ...controllerProps
}) => {
  const { control } = useFormContext()

  const tooltip = useMemo(() => {
    const tooltipProps = formItemProps.tooltip
    return getTooltip(tooltipProps)
  }, [formItemProps.tooltip])

  return (
    <Controller
      control={control}
      name={name}
      {...controllerProps}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error },
      }) => (
        <FormItem
          //   label={
          //     label ? (
          //       <FormItemLabel label={label} required={formItemProps.required} />
          //     ) : undefined
          //   }
          {...formItemProps}
          // @ts-ignore
          tooltip={tooltip}
          validateStatus={error ? 'error' : 'validating'}
          help={error?.message}
        >
          {render({ value, onChange, onBlur })}
        </FormItem>
      )}
    />
  )
}

const FormItem = styled(Form.Item)`
  ${tw`font-semibold mb-4`}

  .ant-form-item-control-input {
    min-height: 24px;
  }

  .ant-form-item-label {
    padding-bottom: 0.25rem;
    ${tw`text-gray-900`}
  }

  .ant-form-item-label {
    > label {
      height: auto;
    }
  }

  .ant-form-item-required:before {
    display: none !important;
  }

  .ant-form-item-tooltip {
    padding-left: 0.25rem !important;
  }

  .ant-form-item-extra {
    padding-top: 4px;
    font-size: 12px;
    font-weight: 400;
  }
`
