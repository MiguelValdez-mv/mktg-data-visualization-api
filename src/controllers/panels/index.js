import { Panel } from "@/db/models/Panel";

export const createPanel = async (req, res) => {
  const { name, description, businessId } = req.body;

  const panel = await Panel.create({
    name,
    description,
    businessId,
  });

  res.status(200).send(panel);
};
