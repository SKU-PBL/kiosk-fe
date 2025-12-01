import React from "react";

const TagButton: React.FC<{ tag: string; onClick: () => void }> = ({ tag, onClick }) => (
  <button className="tag" onClick={onClick}>
    {tag}
  </button>
);

export default TagButton;
