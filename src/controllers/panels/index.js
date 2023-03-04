import { Business } from "@/db/models/Business";
import { Panel } from "@/db/models/Panel";
import { User } from "@/db/models/User";
import { isAdminUser, isOwnerUser } from "@/utils/checkUserRole";

export const createPanel = async (req, res) => {
  const { name, description, businessId } = req.body;

  const panel = await Panel.create({
    name,
    description,
    businessId,
  });

  res.status(200).send(panel);
};

export const getPanelById = async (req, res) => {
  const { id } = req.params;

  const panel = await Panel.findById(id);

  if (!panel) {
    res.status(404).send({ message: "Panel not found" });
    return;
  }

  res.status(200).send(panel);
};

export const updatePanelById = async (req, res) => {
  const { id } = req.params;

  const { name, description, businessId } = req.body;

  const updatedPanel = await Panel.findByIdAndUpdate(
    id,
    {
      name,
      description,
      businessId,
    },
    { new: true }
  );

  res.status(200).send(updatedPanel);
};

export const deletePanelById = async (req, res) => {
  const { id } = req.params;

  const panel = await Panel.findById(id);

  if (!panel) {
    res.status(404).send({ message: "Panel not found" });
    return;
  }

  const result = await Panel.deleteOne({ _id: id });

  res.status(200).send(result);
};

export const getPanelsByUserId = async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id);

  if (!user) {
    res.status(404).send({ message: "User not found" });
    return;
  }

  let queryParams;
  if (isAdminUser(user)) {
    queryParams = {};
  } else {
    const businessIds = (
      await Business.find({
        [isOwnerUser(user) ? "ownerId" : "employeeIds"]: id,
      })
    ).map((business) => business._id);

    queryParams = {
      businessId: { $in: businessIds },
    };
  }

  const panels = await Panel.find(queryParams);

  res.status(200).send(panels);
};
