import React from 'react';
import { Card, Empty, Skeleton, Tag, Typography } from 'antd';
import { AxiosResponse } from 'axios';

interface GithubRepoProps {
  isFetchingRepos: boolean;
  isRepoFetchingError: boolean;
  gitHubRepos: AxiosResponse<any, any> | undefined;
}

const GithubRepos: React.FC<GithubRepoProps> = ({
  isFetchingRepos,
  isRepoFetchingError,
  gitHubRepos
}) => {
  if (isFetchingRepos) {
    return <Skeleton active />;
  }

  if (isRepoFetchingError || !gitHubRepos || gitHubRepos.data?.length === 0) {
    return (
      <div key="no-repo" className="no-repo">
        <Empty description="No GitHub profile/ repo found." />
      </div>
    );
  }

  return (
    <div>
      {gitHubRepos.data.map((repo: any) => (
        <Card
          type="inner"
          key={repo.id}
          className="git-card"
          hoverable
          onClick={() => window.open(repo.html_url)}
          bordered={false}
        >
          <div className="left">
            <Typography.Link title={repo.name} className="link" strong ellipsis>
              {repo.name}
            </Typography.Link>
            {repo.description ? (
              <Typography.Paragraph className="repo-description">
                {repo.description}
              </Typography.Paragraph>
            ) : null}
          </div>
          <div className="right">
            <Typography.Paragraph>
              <Tag title={`Stars: ${repo.stargazers_count}`}>
                Stars: {repo.stargazers_count}
              </Tag>
            </Typography.Paragraph>
            <Typography.Paragraph>
              <Tag title={`Watchers: ${repo.watchers_count}`}>
                Watchers: {repo.watchers_count}
              </Tag>
            </Typography.Paragraph>
            <Typography.Paragraph>
              <Tag title={`Forks: ${repo.forks_count}`}>
                Forks: {repo.forks_count}
              </Tag>
            </Typography.Paragraph>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default GithubRepos;
