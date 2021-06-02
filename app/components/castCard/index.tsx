import { CastType } from "../../types";
import styles from "../../styles/cast-card.css";
import getImagePath from "../../utils/getImagePath";
import * as React from "react";

export default function CastCard({ cast }: { cast: CastType }) {
  const [url, set] = React.useState(getImagePath(cast.profile_path))

  return (
    <li className="cast-card">
      <img src={url} alt={cast.name} onError={() => set('/so-user-circle.png')} />
      <div className="footer">
        <p data-heading>{cast.name}</p>
        <p>{cast.character}</p>
      </div>
    </li>
  );
}
CastCard.styles = styles;
