import React from "react";

export type RoutePath = string;
export interface RouteType {
  path: RoutePath;
  component: React.FC;
}
