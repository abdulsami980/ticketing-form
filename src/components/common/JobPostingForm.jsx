import { Input } from "@/components/ui/input";
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
import { Spinner } from "../ui/shadcn-io/spinner";

// 🔹 Schema for validation
const formSchema = z.object({
  company_name: z
    .string()
    .min(2, { message: "Company name must be at least 2 characters." }),
  company_description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters." }),
  notification_email: z
    .string()
    .email({ message: "Please enter a valid email." }),
  job_title: z
    .string()
    .min(2, { message: "Job title must be at least 2 characters." }),
  job_requirements: z
    .string()
    .min(5, { message: "Requirements must be at least 5 characters." }),
});

export function JobPostingForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      company_name: "",
      company_description: "",
      notification_email: "",
      job_title: "",
      job_requirements: "",
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
      const baseUrl = import.meta.env.DEV
        ? "/n8n/webhook/company-form"
        : "https://75adf1d9ca7f.ngrok-free.app/webhook/company-form";

      const url = `${baseUrl}?${params.toString()}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "ngrok-skip-browser-warning": "1",
        },
      });

      if (!response.ok) throw new Error(`Request failed: ${response.status}`);

      toast.success("Job Posting Submitted!");

      // 🔹 Reset form fields
      form.reset();

      // 🔹 Navigate back to main page
      window.history.pushState({}, "", "/");
      window.dispatchEvent(new PopStateEvent("popstate"));
    } catch (error) {
      toast.error(`Error sending data: ${error.message}`);
    }
  };

  return (
    <>
      <h4 className="text-2xl font-bold bg-gradient-to-l from-[#5227FF] via-[#FF9FFC] to-[#B19EEF] bg-clip-text text-transparent mb-4">
        Share Job Requirements
      </h4>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Company Name */}
          <FormField
            control={form.control}
            name="company_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Name</FormLabel>
                <FormControl>
                  <Input placeholder="OpenAI Inc." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Company Description */}
          <FormField
            control={form.control}
            name="company_description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe your company briefly..."
                    className="max-h-[200px] overflow-y-auto"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Notification Email */}
          <FormField
            control={form.control}
            name="notification_email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notification Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="hr@company.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Job Title */}
          <FormField
            control={form.control}
            name="job_title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Title</FormLabel>
                <FormControl>
                  <Input placeholder="Software Engineer" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Job Requirements */}
          <FormField
            control={form.control}
            name="job_requirements"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Requirements</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="List required skills, qualifications..."
                    className="max-h-[200px] overflow-y-auto"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Submit */}{" "}
          <div className="flex gap-2 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                window.history.pushState({}, "", "/");
                window.dispatchEvent(new PopStateEvent("popstate"));
              }}
              className="cursor-pointer text-white ml-2"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="cursor-pointer bg-gradient-to-r from-[#6A0DAD] via-[#8E5DFF] to-[#C084FC] hover:scale-105 hover:shadow-lg text-white"
            >
              {form.formState.isSubmitting && (
                <Spinner key="loading" variant="default" />
              )}
              {form.formState.isSubmitting
                ? "Submitting..."
                : "Submit Job Posting"}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
