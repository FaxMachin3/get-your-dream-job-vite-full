import { tagsOptions } from '../constants';
import { IJob } from '../types/common-types';

const generateJobData = () => {
  const companyName: any = [
    'Paytm',
    'Bolt',
    'Intuit',
    'Amazon',
    'Netflix',
    'Google',
    'Apple',
    'Microsoft',
    'Uber',
    'Atlassian',
    'Rippling',
    'Rubrik',
    'Reliance',
    'Cred',
    'Coinbase',
    'Plum'
  ];
  const title: any = [
    'FrontEnd Engineer - II',
    'FrontEnd Engineer - III',
    'Backend Engineer - II',
    'Backend Engineer - III',
    'QA Engineer - II',
    'QA Engineer - III',
    'Devops Engineer - II',
    'Devops Engineer - III',
    'Data Scientist - II',
    'Data Scientist - III',
    'Support Engineer - II',
    'Support Engineer - III',
    'Staff Engineer - II',
    'Staff Engineer - III',
    'CEO',
    'CFO',
    'CTO'
  ];
  const location: any = [
    'Ranchi',
    'Bengaluru',
    'Mumbai',
    'New York',
    'Pune',
    'Estonia',
    'Singapore',
    'Delhi',
    'Hyderabad',
    'Poland',
    'Warsaw',
    'Pakistan',
    'China',
    'Remote'
  ];
  // year month day
  const createdAt: any = [
    [2, 7, 2023],
    [3, 6, 2022],
    [21, 7, 2021],
    [9, 8, 2021],
    [11, 7, 2021],
    [2, 7, 2121],
    [2, 8, 2021],
    [21, 7, 2022],
    [16, 5, 2021],
    [17, 4, 2020],
    [23, 4, 2024],
    [10, 12, 2024],
    [15, 1, 2022],
    [19, 2, 2024],
    [27, 7, 2019]
  ];
  const createdBy: any = [
    '63d2adaacc9c4711f72a7b39',
    '63ce8b825a0c0a82615b5a06',
    '63cab0ad53d8efecf543c784'
  ];
  const contact: any = [9360602123, 'janedoe@gmail.com', 4660602123];

  const getRandomNumber = (max: number, min: number = 0): number => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const data: Partial<IJob>[] = [];

  for (let index = 1; index <= 3000; index++) {
    const createdByIndex = getRandomNumber(createdBy.length - 1);
    data.push({
      // _id: `J-${10000 + index}`,
      companyName: companyName[getRandomNumber(companyName.length - 1)],
      title: title[getRandomNumber(title.length - 1)],
      contact: contact[createdByIndex],
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Elit pellentesque habitant morbi tristique senectus et netus. Tristique et egestas quis ipsum suspendisse. In vitae turpis massa sed elementum tempus egestas. Sed faucibus turpis in eu mi bibendum neque egestas. Mattis enim ut tellus elementum sagittis vitae et leo duis. Rhoncus est pellentesque elit ullamcorper dignissim. Faucibus ornare suspendisse sed nisi lacus sed viverra tellus. Vel pharetra vel turpis nunc eget lorem dolor. Ipsum nunc aliquet bibendum enim facilisis. Cursus vitae congue mauris rhoncus. Volutpat maecenas volutpat blandit aliquam. Elit duis tristique sollicitudin nibh sit amet commodo nulla.',
      requirement: '',
      location: location[getRandomNumber(location.length - 1)],
      createdAt: new Date(
        createdAt[getRandomNumber(createdAt.length - 1)].reverse()
      ),
      createdBy: createdBy[createdByIndex],
      salaryRange: {
        min: getRandomNumber(7000000, 500000),
        max: getRandomNumber(7000001, 9999999)
      },
      tags: tagsOptions.slice(
        getRandomNumber(tagsOptions.length - 1),
        getRandomNumber(
          tagsOptions.length - 1,
          Math.floor((tagsOptions.length - 1) / 2)
        )
      ),
      applicants: []
    });
  }

  return data;
};

const jobListing: Partial<IJob>[] = generateJobData();

// export default jobListing;
