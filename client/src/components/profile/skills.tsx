import React from 'react';
import { Tag, Typography } from 'antd';
import { IUser } from '../../types/common-types';

interface SkillsProps {
  currentUserProfile: Partial<IUser>;
}

const Skills: React.FC<SkillsProps> = ({ currentUserProfile }) => {
  if (currentUserProfile.userDetails?.skills?.length === 0) {
    return null;
  }

  return (
    <Typography.Paragraph>
      {currentUserProfile.userDetails?.skills?.map((skill) => (
        <Tag title={skill} key={skill}>
          {skill}
        </Tag>
      ))}
    </Typography.Paragraph>
  );
};

export default Skills;
