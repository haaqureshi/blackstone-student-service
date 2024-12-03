import * as React from "react"
import { useFormContext, Controller, FieldValues, Path } from "react-hook-form"
import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"

const Form = React.forwardRef<HTMLFormElement, React.FormHTMLAttributes<HTMLFormElement>>(
  ({ className, ...props }, ref) => {
    return (
      <form
        ref={ref}
        className={cn("space-y-8", className)}
        {...props}
      />
    )
  }
)
Form.displayName = "Form"

const FormItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("space-y-2", className)} {...props} />
    )
  }
)
FormItem.displayName = "FormItem"

const FormLabel = React.forwardRef<
  React.ElementRef<typeof Label>,
  React.ComponentPropsWithoutRef<typeof Label>
>(({ className, ...props }, ref) => {
  return <Label ref={ref} className={cn("", className)} {...props} />
})
FormLabel.displayName = "FormLabel"

const FormControl = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ ...props }, ref) => {
  return <div ref={ref} {...props} />
})
FormControl.displayName = "FormControl"

const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
})
FormDescription.displayName = "FormDescription"

const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { formState: { errors } } = useFormContext()
  const error = Object.values(errors)[0]
  const body = props.children || (error?.message as string)

  if (!body) {
    return null
  }

  return (
    <p
      ref={ref}
      className={cn("text-sm font-medium text-destructive", className)}
      {...props}
    >
      {body}
    </p>
  )
})
FormMessage.displayName = "FormMessage"

interface FormFieldProps<TFieldValues extends FieldValues = FieldValues> {
  name: Path<TFieldValues>
  render: (props: { field: any }) => React.ReactElement
}

function FormField<TFieldValues extends FieldValues = FieldValues>({ 
  name,
  render,
  ...props 
}: FormFieldProps<TFieldValues>) {
  const { control } = useFormContext<TFieldValues>()
  
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => render({ field, ...props })}
    />
  )
}

export {
  useFormContext,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
}
