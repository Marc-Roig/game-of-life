import presets from "../presets";
import React, { useRef } from "react";

const PresetLoader = ({ handleSelect }) => {
  const presetRef = useRef<HTMLSelectElement>(null);

  const _handleSelect = () => {
    if (presetRef.current.value) {
      handleSelect(presets[presetRef.current.value]);
    }
  };

  return (
    <>
      <select ref={presetRef}>
        <option value="">Select Preset</option>
        {Object.entries(presets).map(([key, value]) => (
          <option key={key} value={key}>
            {key}
          </option>
        ))}
      </select>
      <button onClick={_handleSelect}>Load Preset</button>
    </>
  );
};

export default PresetLoader;
