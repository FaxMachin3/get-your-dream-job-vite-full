import SkeletonBlock from './skeleton-block';

import './styles.scss';

interface CustomSkeletonProps {
  heights: { large: string; medium: string; small: string };
  totalSkeletons?: number;
}

const CustomSkeleton: React.FC<CustomSkeletonProps> = ({
  heights,
  totalSkeletons = 10
}) => {
  const skeletons = new Array(totalSkeletons).fill(-1);

  return (
    <div className="custom-skeleton-container">
      {skeletons.map((_value, index) => (
        <SkeletonBlock key={index} heights={heights} />
      ))}
    </div>
  );
};

export default CustomSkeleton;
