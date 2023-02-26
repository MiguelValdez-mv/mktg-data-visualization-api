import { Widget } from "@/db/models/Widget";
import { runReport } from "@/utils/runReport";

export const getWidgetsByPanelId = async (req, res) => {
  const { id } = req.params;

  const widgets = await Promise.all(
    (
      await Widget.find({ panelId: id })
    ).map((widget) => {
      const runReportByWidget = async () => {
        const { selector, metricName, dimensionName, timespan, filters } =
          widget;

        const report = await runReport({
          selector,
          metricName,
          dimensionName,
          timespan,
          filters,
        });

        return { ...widget.toObject(), report };
      };

      return runReportByWidget();
    })
  );

  res.status(200).send(widgets);
};
