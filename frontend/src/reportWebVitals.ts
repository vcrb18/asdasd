import { type ReportHandler } from "web-vitals";

const reportWebVitals = async (onPerfEntry?: ReportHandler): Promise<void> => {
  if (onPerfEntry != null && onPerfEntry instanceof Function) {
    try {
      const webVitals = await import("web-vitals");
      webVitals.getCLS(onPerfEntry);
      webVitals.getFID(onPerfEntry);
      webVitals.getFCP(onPerfEntry);
      webVitals.getLCP(onPerfEntry);
      webVitals.getTTFB(onPerfEntry);
    } catch (e) {
      console.error("Error al importar web-vitals", e);
    }
  }
};

export default reportWebVitals;
