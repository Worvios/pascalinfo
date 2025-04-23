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
      t("appointment.formTitle"),
      `width=${width},height=${height},left=${left},top=${top},scrollbars=yes`
    );
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="mt-4 w-full" variant="secondary">
          <Calendar className="h-5 w-5 mr-2" />
          {t("appointment.scheduleButton")}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md p-6">
        <DialogTitle className="text-xl font-bold text-center mb-2">
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {t("appointment.title")}
          </span>
        </DialogTitle>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground text-center">
            {t("appointment.description")}
          </p>
          <Button
            onClick={openFormInPopup}
            className="w-full rounded-full bg-gradient-to-r from-primary to-secondary hover:opacity-90"
          >
            <ExternalLink className="h-5 w-5 mr-2" />
            {t("appointment.accessForm")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentDialog;
