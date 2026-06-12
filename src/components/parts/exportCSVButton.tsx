import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button.tsx";
import { Download, Loader2 } from "lucide-react";
import type { NotificationType } from "@/lib/types.tsx";

export const ExportCsvButton = <T extends Record<string, any>>({
  fetchData,
  columns,
  filename,
  setNotification,
}: {
  fetchData: () => Promise< T[]>;
  columns: { key: keyof T; label: string }[];
  filename: string;
  setNotification: (notification: NotificationType) => void;
}) => {
  const { t } = useTranslation();
  const [isExporting, setIsExporting] = useState(false);
  const handleExportCsv = async () => {
    setIsExporting(true);
    try {
      const data = await fetchData();

      if (!data || !data.length) return;

      const headers = columns.map(c => `"${c.label}"`).join(";");
      const rows = data.map(item =>
        columns.map(c => `"${String(item[c.key] ?? "").replace(/"/g, '""')}"`).join(";")
      );

      const blob = new Blob(["\uFEFF" + [headers, ...rows].join("\n")], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = filename.endsWith(".csv") ? filename : `${filename}.csv`;
      link.click();
      URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error("Error during CSV export :", error);
      setNotification({visible: 'visible', variant: "destructive", title: t("app.error"), body: t("app.errorFetchingCSV")})
    } finally {
      setIsExporting(false);
    }
  };
  return (
    <Button variant="outline" size="lg" disabled={isExporting} onClick={handleExportCsv}>
      {isExporting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />}
      {isExporting ? `${t('app.exporting')}... ` : t('app.exportToCsv')}
    </Button>
  );
};
;
