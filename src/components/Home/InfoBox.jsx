import { AlertCircle } from "lucide-react";

const InfoBox = () => {
  return (
    <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg border-1 mb-5">
      <AlertCircle className="h-4 w-4 text-muted-foreground" />
      <p className="text-sm text-muted-foreground">
        Your report will be reviewed by the appropriate department. You may be
        contacted for additional information.
      </p>
    </div>
  );
};

export default InfoBox;
