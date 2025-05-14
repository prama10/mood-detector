import React from 'react';
import moodEmojis from '../utils/moodEmojis';

const EmojiParade = ({ mood }) => {
  const emojis = moodEmojis[mood] || moodEmojis.default;

  return (
    <div className="emoji-parade">
      {emojis.map((emoji, index) => (
        <span
          key={index}
          className="emoji"
          title="Click to copy"
          onClick={() => {
            navigator.clipboard.writeText(emoji);
            alert(`Copied ${emoji} to clipboard!`);
          }}
        >
          {emoji}
        </span>
      ))}
    </div>
  );
};

export default EmojiParade;
