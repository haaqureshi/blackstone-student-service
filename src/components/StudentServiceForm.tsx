import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, FormProvider } from "react-hook-form"
import { z } from "zod"
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faUser, 
  faPhone, 
  faEnvelope, 
  faGraduationCap, 
  faQuestionCircle 
} from '@fortawesome/free-solid-svg-icons'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import '../lib/fontawesome'

const formSchema = z.object({
  studentName: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  phone: z.string().min(10, {
    message: "Please enter a valid phone number.",
  }),
  bsolEmail: z.string().email({
    message: "Please enter a valid Blackstone email.",
  }),
  program: z.string({
    required_error: "Please select your program.",
  }),
  inquiryType: z.string({
    required_error: "Please select an inquiry type.",
  }),
  complaintType: z.string().optional(),
  academicIssueType: z.string().optional(),
  inquiryDetails: z.string().min(10, {
    message: "Please provide more details about your inquiry.",
  }),
})

type FormValues = z.infer<typeof formSchema>

export default function StudentServicesForm() {
  const methods = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      studentName: "",
      phone: "",
      bsolEmail: "",
      program: "",
      inquiryType: "",
      complaintType: "",
      academicIssueType: "",
      inquiryDetails: "",
    },
    mode: "onChange"
  })

  const inquiryType = methods.watch("inquiryType")

  function onSubmit(values: FormValues) {
    console.log(values)
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto p-4 space-y-6"
    >
      <div className="flex items-center">
        <h1 className="text-2xl font-semibold">Student Services</h1>
      </div>
      
      <p className="text-muted-foreground">
        Please log your student service request using this form. Please note that we will try our best to resolved your request in 48 hours.
      </p>

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            name="studentName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <FontAwesomeIcon icon={faUser} className="mr-2" />
                  Student Name*
                </FormLabel>
                <FormDescription>
                  Please state your official name.
                </FormDescription>
                <FormControl>
                  <Input placeholder="Full name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <FontAwesomeIcon icon={faPhone} className="mr-2" />
                  Phone*
                </FormLabel>
                <FormDescription>
                  Best phone number to reach you.
                </FormDescription>
                <FormControl>
                  <Input placeholder="(212) 123 4567" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="bsolEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                  Bsol Email*
                </FormLabel>
                <FormDescription>
                  Your Blackstone email. Please note that most inquiries will be responded through email.
                </FormDescription>
                <FormControl>
                  <Input placeholder="your.email@blackstone.edu" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="program"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <FontAwesomeIcon icon={faGraduationCap} className="mr-2" />
                  Program*
                </FormLabel>
                <FormDescription>
                  Select your study program.
                </FormDescription>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your program" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="acca">ACCA</SelectItem>
                    <SelectItem value="btc">BTC</SelectItem>
                    <SelectItem value="foundation">Foundation</SelectItem>
                    <SelectItem value="llb">LLB</SelectItem>
                    <SelectItem value="llm">LLM</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="inquiryType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <FontAwesomeIcon icon={faQuestionCircle} className="mr-2" />
                  Inquiry Type*
                </FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select the best possible description for your inquiry" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="general">General</SelectItem>
                    <SelectItem value="feedback">Feedback</SelectItem>
                    <SelectItem value="fee-payment">Fee Payment</SelectItem>
                    <SelectItem value="complaint">Complaint</SelectItem>
                    <SelectItem value="testimonial">Testimonial</SelectItem>
                    <SelectItem value="academic">Academic Issue</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {inquiryType === "complaint" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <FormField
                name="complaintType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Complaint Type</FormLabel>
                    <FormDescription>
                      If You have selected Complaint please select the most relevant complain type from the list.
                    </FormDescription>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select complaint type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="not-applicable">Not Applicable</SelectItem>
                        <SelectItem value="teacher-conduct">Teacher Conduct Issue</SelectItem>
                        <SelectItem value="staff-conduct">Staff Conduct Issue</SelectItem>
                        <SelectItem value="cleanliness">Cleanliness & Hygiene Issue</SelectItem>
                        <SelectItem value="utilities">Utilities Issue, Electricity or Wifi etc</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>
          )}

          {inquiryType === "academic" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <FormField
                name="academicIssueType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Academic Issue Type</FormLabel>
                    <FormDescription>
                      If You have selected Academic issue please select the most relevant complain type from the list.
                    </FormDescription>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select academic issue type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="not-applicable">Not Applicable</SelectItem>
                        <SelectItem value="module-registration">Module Registration</SelectItem>
                        <SelectItem value="exam-entry">Exam Entry</SelectItem>
                        <SelectItem value="bar-application">Bar Application Update</SelectItem>
                        <SelectItem value="llm-bursary">LLM Bursary</SelectItem>
                        <SelectItem value="result-issue">Result Issue</SelectItem>
                        <SelectItem value="athe-certificate">ATHE Certificate Issue</SelectItem>
                        <SelectItem value="fee-payment">Fee Payment Issue</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>
          )}

          <FormField
            name="inquiryDetails"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Inquiry Details*</FormLabel>
                <FormDescription>
                  Add a detailed description for your inquiry. Please make sure to provide all possible details.
                </FormDescription>
                <FormControl>
                  <Textarea
                    placeholder="Type your message here."
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end">
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </FormProvider>
    </motion.div>
  )
}