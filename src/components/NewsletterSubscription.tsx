import React, { useState, useCallback } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FiCheckCircle, FiXCircle, FiMail, FiSend } from "react-icons/fi";

interface NewsletterProps {
  title?: string;
  description?: string;
  buttonText?: string;
  placeholder?: string;
  className?: string;
}

const NewsletterSubscription = ({
  title = "Subscribe to Our Newsletter",
  description = "Stay updated with our latest news and updates!",
  buttonText = "Subscribe",
  placeholder = "Your email address",
  className = "",
}: NewsletterProps) => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!emailRegex.test(email)) {
        setStatus("Please enter a valid email address");
        return;
      }

      setLoading(true);
      setStatus("");

      try {
        const response = await fetch("/api/subscribe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });

        const data = await response.json();

        if (response.ok) {
          setStatus("Success! You are now subscribed to our newsletter.");
          setEmail("");
        } else {
          setStatus(data.message || "Subscription failed. Please try again.");
        }
      } catch (error) {
        setStatus("Something went wrong. Please try again later.");
        console.error("Subscription error:", error);
      } finally {
        setLoading(false);
      }
    },
    [email]
  );

  return (
    <div className={`${className}`}>
      <div className="text-center space-y-2 mb-4">
        <h3 className="text-lg font-semibold flex items-center gap-2 justify-center">
          <FiMail className="text-primary" />
          {title}
        </h3>
        {description && (
          <p className="text-muted-foreground text-sm">{description}</p>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-2">
        <div className="flex gap-2">
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={placeholder}
            className="rounded-full bg-muted/10 flex-1"
            disabled={loading}
          />
          <Button
            type="submit"
            className="rounded-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 gap-2"
            disabled={loading}
          >
            {loading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              <FiSend className="text-lg" />
            )}
            {buttonText}
          </Button>
        </div>

        {status && (
          <Alert
            variant={status.includes("Success") ? "default" : "destructive"}
            className="animate-fade-in text-sm p-2"
          >
            {status.includes("Success") ? (
              <FiCheckCircle className="h-4 w-4" />
            ) : (
              <FiXCircle className="h-4 w-4" />
            )}
            <AlertDescription>{status}</AlertDescription>
          </Alert>
        )}
      </form>
    </div>
  );
};

export default React.memo(NewsletterSubscription);
