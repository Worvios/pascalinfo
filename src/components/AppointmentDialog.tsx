import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { Calendar, ExternalLink } from "lucide-react";
import { useTranslation } from "react-i18next";

const AppointmentDialog = () => {
  const { t } = useTranslation();

  const [isOpen, setIsOpen] = useState(false);

  const openFormInPopup = () => {
    const width = 600;
    const height = 800;
    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;

    window.open(
      "https://forms.gle/s4SpBYoR5NycTCTv7",
      "Appointment Form",
      `width=${width},height=${height},left=${left},top=${top},scrollbars=yes`
    );
    setIsOpen(false); // Close the dialog after opening the form
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="mt-4 w-full" variant="secondary">
          <Calendar className="h-5 w-5 mr-2" />
          {t("contact.cta.button")}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md p-6">
        <DialogTitle className="text-xl font-bold text-center mb-2">
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {t("contact.cta.button")}
          </span>
        </DialogTitle>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground text-center">
            Choisissez une date et une heure pour visiter notre centre
          </p>
          <Button
            onClick={openFormInPopup}
            className="w-full rounded-full bg-gradient-to-r from-primary to-secondary hover:opacity-90"
          >
            <ExternalLink className="h-5 w-5 mr-2" />
            Accéder au Formulaire
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentDialog;
