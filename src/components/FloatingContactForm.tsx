import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { MessageSquarePlus } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import { useTranslation } from "react-i18next";

const FloatingContactButton = () => {
  const { t } = useTranslation();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            size="lg"
            className="rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 bg-gradient-to-r from-primary to-secondary"
          >
            <MessageSquarePlus className="h-6 w-6 mr-2" />
            {t("floatingContactButton.title")}
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl p-8">
          <DialogTitle className="text-2xl font-bold text-center mb-2">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {t("floatingContactButton.button")}
            </span>
          </DialogTitle>
          <div className="space-y-6">
            <p className="text-muted-foreground text-center">
              {t("floatingContactButton.description")}
            </p>
            <ContactForm />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FloatingContactButton;
