import { USER_ROLES } from "@/constants";

export const isAdminUser = (user) => user.role === USER_ROLES.ADMIN;

export const isOwnerUser = (user) => user.role === USER_ROLES.OWNER;

export const isEmployeeUser = (user) => user.role === USER_ROLES.EMPLOYEE;
