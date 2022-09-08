import { Select, Tag } from 'antd';
import React from 'react';

const TagRender = (props) => {
  const { label, value, closable, onClose } = props;
console.log('label, value, closable, onClose', label, value, closable, onClose)
  const onPreventMouseDown = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <Tag
      color={value}
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      style={{
        marginRight: 3,
      }}
    >
      {label}
    </Tag>
  );
};

export default TagRender;