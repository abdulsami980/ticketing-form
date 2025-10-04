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
import { supabase } from "@/supabase-client";
import { useEffect, useState } from "react";
import { Spinner } from "../ui/shadcn-io/spinner";

// ✅ Schema
const formSchema = z.object({
  full_name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters." }),
  email_address: z.string().email("Please enter a valid email."),
  phone_number: z.string().optional().or(z.literal("")),
  job_title: z.string().min(1, { message: "Please select a job title." }),
  cv: z
    .any()
    .refine((file) => file instanceof File && file.type === "application/pdf", {
      message: "Please upload a valid PDF file.",
    }),
  motivation: z
    .string()
    .min(10, { message: "Please provide at least 10 characters." }),
});

export function JobApplicationForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      full_name: "",
      email_address: "",
      phone_number: "",
      job_title: "",
      motivation: "",
    },
  });

  // ✅ Store job titles
  const [jobTitles, setJobTitles] = useState([]);

  const fetchJobTitles = async () => {
    const { data, error } = await supabase
      .from("Company")
      .select("job_title")
      .order("created_at", { ascending: true });

    if (error) {
      toast.error("Error fetching job titles");
      return;
    }
    setJobTitles(data || []);
    console.log("data", data);
  };

  const onSubmit = async (data) => {
    const pad2 = (n) => String(n).padStart(2, "0");
    const now = new Date();
    const timestamp = `${pad2(now.getDate())}/${pad2(
      now.getMonth() + 1
    )}/${now.getFullYear()} ${pad2(now.getHours())}:${pad2(
      now.getMinutes()
    )}:${pad2(now.getSeconds())}`;

    const formData = new FormData();
    Object.entries(data || {}).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });
    formData.append("timestamp", timestamp);
    formData.append("_ts", String(Date.now()));

    try {
      const baseUrl = import.meta.env.DEV
        ? "/n8n/webhook/candidate-form"
        : "https://48654b02da74.ngrok-free.app/webhook/candidate-form";

      const response = await fetch(baseUrl, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error(`Request failed: ${response.status}`);
      toast.success("Application submitted successfully!");

      // 🔹 Reset form fields
      form.reset();

      // 🔹 Navigate back to main page
      window.history.pushState({}, "", "/");
      window.dispatchEvent(new PopStateEvent("popstate"));
    } catch (error) {
      toast.error(`Error sending data: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchJobTitles();
  }, []);

  return (
    <>
      <h4 className="text-2xl font-bold bg-gradient-to-l from-[#5227FF] via-[#FF9FFC] to-[#B19EEF] bg-clip-text text-transparent mb-4">
        Apply For a Job
      </h4>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Full Name */}
          <FormField
            control={form.control}
            name="full_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
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
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Phone Number */}
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

          {/* Job Title - now dynamic */}
          <FormField
            control={form.control}
            name="job_title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Title</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a job" />
                    </SelectTrigger>
                    <SelectContent>
                      {jobTitles.map((job) => (
                        <SelectItem value={job.job_title}>
                          {job.job_title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* CV Upload */}
          <FormField
            control={form.control}
            name="cv"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Upload CV (PDF)</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => field.onChange(e.target.files[0])}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Motivation */}
          <FormField
            control={form.control}
            name="motivation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Tell us why you’re applying and why you’d be a good fit?
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Type your motivation here..."
                    className="max-h-[300px] overflow-y-auto"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
                : "Submit Application"}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
