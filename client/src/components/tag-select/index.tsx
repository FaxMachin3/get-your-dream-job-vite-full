import { Select, Typography } from 'antd';
import React from 'react';
import { tagsOptions } from '../../constants';

import './styles.scss';

interface TagSelectProps {
  onTagChange: (value: string[]) => void;
  defaultValue?: string[];
}

const TagSelect: React.FC<TagSelectProps> = ({
  onTagChange,
  defaultValue = []
}) => {
  return (
    <label>
      <Typography.Paragraph>Tags</Typography.Paragraph>
      <Select
        showSearch
        showArrow
        className="search-input"
        defaultValue={defaultValue}
        mode="multiple"
        allowClear
        style={{ width: '100%' }}
        size="large"
        placeholder="e.g. css or typescript"
        onChange={onTagChange}
      >
        {tagsOptions.map((tag) => (
          <Select.Option key={tag}>{tag}</Select.Option>
        ))}
      </Select>
    </label>
  );
};

export default TagSelect;
