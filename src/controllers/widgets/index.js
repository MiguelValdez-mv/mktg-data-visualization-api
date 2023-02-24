import { Widget } from "@/db/models/Widget";
import { runWidgetReport } from "@/utils/runWidgetReport";

export const createWidget = async (req, res) => {
  const {
    panelId,
    selector,
    metricName,
    chartType,
    dimensionName,
    timespan,
    title,
    filters,
    layout,
  } = req.body;

  const widget = await Widget.create({
    panelId,
    selector,
    metricName,
    chartType,
    dimensionName,
    timespan,
    title,
    filters,
    layout,
  });

  res.status(200).send(widget);
};

export const getWidgetsByPanelId = async (req, res) => {
  const { id } = req.params;

  let widgets = (await Widget.find({ panelId: id })).map((widget) => {
    const getWidgetReport = async () => {
      const report = await runWidgetReport(widget);
      return { ...widget.toObject(), report };
    };

    return getWidgetReport();
  });

  widgets = await Promise.all(widgets);

  res.status(200).send(widgets);
};
