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
import { cn } from "@/lib/utils";

interface AppointmentDialogProps {
  dir?: "ltr" | "rtl";
}

const AppointmentDialog: React.FC<AppointmentDialogProps> = ({
  dir = "ltr",
}) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const isRtl = dir === "rtl";

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
        <Button
          className="w-full rounded-full bg-gradient-to-r from-primary to-primary/80 hover:opacity-90 transition-all duration-300"
          variant="default"
        >
          <Calendar className={cn("h-4 w-4", isRtl ? "ml-2" : "mr-2")} />
          {t("appointment.scheduleButton")}
        </Button>
      </DialogTrigger>
      <DialogContent
        className={cn(
          "max-w-sm p-5 rounded-2xl bg-background/95 backdrop-blur-xl border border-primary/10",
          isRtl ? "text-right" : "text-left"
        )}
        dir={dir}
      >
        <DialogTitle
          className={cn(
            "text-lg font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60",
            isRtl ? "text-right" : "text-center"
          )}
        >
          {t("appointment.title")}
        </DialogTitle>
        <div className="space-y-3">
          <p
            className={cn(
              "text-xs text-muted-foreground",
              isRtl ? "text-right" : "text-center"
            )}
          >
            {t("appointment.description")}
          </p>
          <Button
            onClick={openFormInPopup}
            className={cn(
              "w-full rounded-full bg-gradient-to-r from-primary to-primary/80 hover:opacity-90 transition-all duration-300",
              isRtl ? "flex-row-reverse" : "flex-row"
            )}
          >
            <ExternalLink className={cn("h-4 w-4", isRtl ? "ml-2" : "mr-2")} />
            {t("appointment.accessForm")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentDialog;
