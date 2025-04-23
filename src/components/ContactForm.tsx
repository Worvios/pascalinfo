import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FiMail, FiUser, FiMessageSquare, FiSend } from "react-icons/fi";
import emailjs from "@emailjs/browser";
import { useTranslation } from "react-i18next";

const ContactForm = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    try {
      await emailjs.send(
        "service_hx411ig", // Replace with your EmailJS service ID
        "template_4fls68f", // Replace with your EmailJS template ID
        formData,
        "_UctoYFHrnLllowxl" // Replace with your EmailJS public key
      );

      setStatus("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setStatus("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="relative">
          <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder={t("forms.contact.name")}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            className="pl-10 rounded-full"
          />
        </div>
        <div className="relative">
          <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="email"
            placeholder={t("forms.contact.email")}
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
            className="pl-10 rounded-full"
          />
        </div>
        <div className="relative">
          <FiMessageSquare className="absolute left-3 top-4 h-5 w-5 text-muted-foreground" />
          <Textarea
            placeholder={t("forms.contact.message")}
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
            required
            className="pl-10 rounded-xl min-h-[150px]"
          />
        </div>
      </div>
      <Button
        type="submit"
        className="w-full rounded-full bg-gradient-to-r from-primary to-secondary hover:opacity-90"
        disabled={loading}
      >
        {loading ? (
          <span className="loading loading-spinner"></span>
        ) : (
          <>
            <FiSend className="h-5 w-5 mr-2" />
            {t("forms.contact.send")}
          </>
        )}
      </Button>
      {status && (
        <p
          className={`text-sm text-center ${
            status.includes("success") ? "text-green-500" : "text-red-500"
          }`}
        >
          {status === "Message sent successfully!"
            ? t("forms.contact.success")
            : t("forms.contact.error")}
        </p>
      )}
    </form>
  );
};

export default ContactForm;
