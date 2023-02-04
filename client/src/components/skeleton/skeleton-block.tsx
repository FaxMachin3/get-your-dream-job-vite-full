import { Card, Skeleton } from 'antd';
import React from 'react';

interface SkeletonBlockProps {
  heights: { large: string; medium: string; small: string };
}

const SkeletonBlock: React.FC<SkeletonBlockProps> = ({ heights }) => {
  const style = {
    '--height-large': heights.large,
    '--height-medium': heights.medium,
    '--height-small': heights.small
  } as React.CSSProperties;

  return (
    <Card className="custom-skeleton-card" bordered={false}>
      <Skeleton.Button
        block
        active
        className="custom-skeleton-block"
        style={style}
      />
    </Card>
  );
};

export default SkeletonBlock;
