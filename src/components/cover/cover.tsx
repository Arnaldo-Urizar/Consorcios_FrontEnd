import React from "react";
import { Link } from "react-router-dom";
import styles from "./cover.module.css";

interface CoverProps {
  title: string;
  highlight: string;
  description: string;
  linkTo: string;
  linkText: string;
  imageUrl: string;
  imageAlt: string;
}

const Cover: React.FC<CoverProps> = ({
  title,
  highlight,
  description,
  linkTo,
  linkText,
  imageUrl,
  imageAlt,
}) => {
  return (
    <div className={styles.cover}>
      <main>
        <div className={styles.content}>
          <h2>
            {title} <span>{highlight}</span>
          </h2>
          <p>{description}</p>
          <Link to={linkTo}>{linkText}</Link>
        </div>
        <div className={styles.imagen}>
          <picture>
            <img src={imageUrl} alt={imageAlt} />
          </picture>
        </div>
      </main>
    </div>
  );
};

export default Cover;
