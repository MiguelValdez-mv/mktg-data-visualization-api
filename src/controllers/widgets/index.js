import { Widget } from "@/db/models/Widget";

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
  } = req.body;

  const defaultLayout = {
    x: 0,
    y: 0,
    w: 4,
    h: 4,
  };

  const widget = await Widget.create({
    panelId,
    selector,
    metricName,
    chartType,
    dimensionName,
    timespan,
    title,
    filters,
    layout: defaultLayout,
  });

  res.status(200).send(widget);
};
