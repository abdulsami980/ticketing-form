import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Textarea } from "@/components/ui/textarea";

import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";

import { toast } from "sonner";

import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form/Form";

import { Button } from "../ui/button/button";

const formSchema = z.object({
  full_name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters." }),
  email_address: z
    .string()
    .or(z.literal(""))
    .refine((val) => val === "" || val.includes("@"), {
      message: "Please enter a valid email.",
    }),
  phone_number: z.string().optional().or(z.literal("")),
  department: z.string().optional().or(z.literal("")),
  request_type: z.string().optional().or(z.literal("")),
  message: z
    .string()
    .min(5, { message: "Message must be at least 5 characters." }),
  status: z.string().optional().or(z.literal("")),
  priority: z.string().optional().or(z.literal("")),
  summary: z.string().optional().or(z.literal("")),
});

export function ContactForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      full_name: "",
      email_address: "",
      message: "",
      phone_number: "",
      department: "",
      request_type: "",
      status: "",
      priority: "",
      summary: "",
    },
  });

  const onSubmit = async (data) => {
    const pad2 = (n) => String(n).padStart(2, "0");
    const now = new Date();
    const timestamp = `${pad2(now.getDate())}/${pad2(
      now.getMonth() + 1
    )}/${now.getFullYear()} ${pad2(now.getHours())}:${pad2(
      now.getMinutes()
    )}:${pad2(now.getSeconds())}`;

    const params = new URLSearchParams();
    Object.entries(data || {}).forEach(([key, value]) => {
      params.append(key, value ?? "");
    });
    params.append("timestamp", timestamp);
    params.append("_ts", String(Date.now()));

    try {
      // Use proxy in dev, direct URL in prod
      const baseUrl = import.meta.env.DEV
        ? "/n8n/webhook/React-Contact-Form"
        : "https://7af7d8dc9fe5.ngrok-free.app/webhook/React-Contact-Form";

      const url = `${baseUrl}?${params.toString()}`;
      const response = await fetch(url, { method: "GET" });

      if (!response.ok) throw new Error(`Request failed: ${response.status}`);

      toast.success("Data sent successfully to n8n");
    } catch (error) {
      toast.error(`Error sending data: ${error.message}`);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Name */}

        <FormField
          control={form.control}
          name="full_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email */}
        <FormField
          control={form.control}
          name="email_address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="you@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Phone */}
        <FormField
          control={form.control}
          name="phone_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input type="tel" placeholder="+92 300 1234567" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Department */}
        <FormField
          control={form.control}
          name="department"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Department</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="IT / Technical Support">
                      IT / Technical Support
                    </SelectItem>
                    <SelectItem value="HR">HR</SelectItem>
                    <SelectItem value="Finance & Accounts">
                      Finance & Accounts
                    </SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="Sales">Sales</SelectItem>
                    <SelectItem value="Customer Support">
                      Customer Support
                    </SelectItem>
                    <SelectItem value="Legal">Legal</SelectItem>
                    <SelectItem value="Admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Request Type */}
        <FormField
          control={form.control}
          name="request_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Request Type</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a request type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="New Request / Inquiry">
                      New Request / Inquiry
                    </SelectItem>
                    <SelectItem value="Access Request">
                      Access Request
                    </SelectItem>
                    <SelectItem value="Technical Issue / Bug Report">
                      Technical Issue / Bug Report
                    </SelectItem>
                    <SelectItem value="Feedback / Suggestion">
                      Feedback / Suggestion
                    </SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Message */}
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea placeholder="Type your message..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="cursor-pointer">
          Send Message
        </Button>
      </form>
    </Form>
  );
}
