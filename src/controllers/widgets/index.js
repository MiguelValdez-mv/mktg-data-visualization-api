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

export const manageWidgets = async (req, res) => {
  const { save, update, remove } = req.body;

  const promises = [];

  promises.push(
    ...save.map(
      ({
        panelId,
        selector,
        metricName,
        chartType,
        dimensionName,
        timespan,
        title,
        filters,
        layout,
      }) =>
        Widget.create({
          panelId,
          selector,
          metricName,
          chartType,
          dimensionName,
          timespan,
          title,
          filters,
          layout,
        })
    )
  );

  promises.push(
    ...update.map(
      ({
        _id,
        selector,
        metricName,
        chartType,
        dimensionName,
        timespan,
        title,
        filters,
        layout,
      }) =>
        Widget.findByIdAndUpdate(_id, {
          selector,
          metricName,
          chartType,
          dimensionName,
          timespan,
          title,
          filters,
          layout,
        })
    )
  );

  promises.push(
    Widget.deleteMany({ _id: { $in: remove.map(({ _id }) => _id) } })
  );

  const result = await Promise.all(promises);

  res.status(200).send(result);
};
