import * as React from "react";
import styles from "../../styles/pill.css";

export default function Pill({ children }: { children: React.ReactNode }) {
  return <span className="pill">{children}</span>;
}
Pill.styles = styles;
