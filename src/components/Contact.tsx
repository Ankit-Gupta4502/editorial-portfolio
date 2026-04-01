import { motion } from "motion/react";
import { useState, FormEvent } from "react";
import Section from "./Section";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setStatus("error");
    }
  };

  return (
    <Section id="contact" title="Get in Touch">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
        <div className="flex flex-col justify-between">
          <div className="flex flex-col gap-8">
            <h3 className="text-4xl md:text-6xl font-bold tracking-tighter leading-none">
              HAVE A PROJECT <br /> IN MIND?
            </h3>
            <p className="text-xl text-neutral-500 leading-relaxed max-w-md">
              I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
            </p>
          </div>
          <div className="flex flex-col gap-4 mt-12">
            <span className="text-sm font-mono text-neutral-400 uppercase tracking-widest">Email</span>
            <a href="mailto:aryangupta2224@gmail.com" className="text-2xl font-bold hover:text-neutral-500 transition-colors">
              aryangupta2224@gmail.com
            </a>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-12">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-mono text-neutral-400 uppercase tracking-widest">Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="bg-transparent border-b border-neutral-200 py-4 focus:border-neutral-900 outline-none transition-colors text-xl"
              placeholder="Your Name"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-mono text-neutral-400 uppercase tracking-widest">Email</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="bg-transparent border-b border-neutral-200 py-4 focus:border-neutral-900 outline-none transition-colors text-xl"
              placeholder="Your Email"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-mono text-neutral-400 uppercase tracking-widest">Message</label>
            <textarea
              required
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="bg-transparent border-b border-neutral-200 py-4 focus:border-neutral-900 outline-none transition-colors text-xl resize-none"
              placeholder="Your Message"
            />
          </div>
          <button
            type="submit"
            disabled={status === "loading"}
            className="group relative h-16 w-full md:w-48 bg-neutral-900 text-white font-bold uppercase tracking-widest text-sm overflow-hidden disabled:opacity-50"
          >
            <span className="relative z-10">
              {status === "loading" ? "Sending..." : "Send Message"}
            </span>
            <motion.div
              className="absolute inset-0 bg-neutral-700"
              initial={{ x: "-100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </button>
          {status === "success" && (
            <p className="text-green-600 font-medium">Message sent successfully!</p>
          )}
          {status === "error" && (
            <p className="text-red-600 font-medium">Failed to send message. Please try again.</p>
          )}
        </form>
      </div>
    </Section>
  );
}
