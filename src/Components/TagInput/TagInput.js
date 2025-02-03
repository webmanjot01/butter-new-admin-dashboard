import React, { useEffect, useState } from "react";

const TagInput = ({ value, setEditedRestaurant }) => {
  const [tags, setTags] = useState([]);
  const [input, setInput] = useState("");

  // Handle input change
  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  // Handle adding tags
  const handleKeyDown = (event) => {
    if (event.key === "Enter" && input.trim() !== "") {
      event.preventDefault();
      setTags((prevTags) => [...prevTags, input.trim()]);
      setEditedRestaurant((prev) => ({
        ...prev,
        hashtags: [...tags, input.trim()],
      }));
      setInput(""); // Clear the input after adding the tag
    }
  };

  // Handle removing tags
  const handleTagRemove = (index) => {
    setTags(tags.filter((_, i) => i !== index));
    setEditedRestaurant((prev) => ({
      ...prev,
      hashtags: tags.filter((_, i) => i !== index),
    }));
  };

  useEffect(() => {
    if (value) {
      setTags(value);
    }
  }, [value]);

  return (
    <div className="row w-100">
      <div>
        <input
          type="text"
          value={input}
          className="form-control w-100"
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Press Enter to add a tag"
        />
      </div>

      <div style={{ marginTop: "10px" }}>
        {tags.map((tag, index) => (
          <span
            key={index}
            style={{
              display: "inline-block",
              backgroundColor: "#e0e0e0",
              padding: "5px 10px",
              margin: "5px",
              borderRadius: "20px",
            }}
          >
            {tag}
            <button
              onClick={() => handleTagRemove(index)}
              role="button"
              style={{
                marginLeft: "10px",
                border: "none",
                background: "transparent",
                cursor: "pointer",
              }}
            >
              &#10005;
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};

export default TagInput;
